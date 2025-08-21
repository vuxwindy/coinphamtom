// Advanced Wallet System
(function() {
  'use strict';

  // Global variables
  let isInitialized = false;
  let currentWallet = null;
  let currentAccount = null;
  let currentChain = null;
  let walletModal = null;
  let connectionStatus = 'disconnected';

  // Wallet configurations
  const walletConfigs = {
    metamask: {
      name: 'MetaMask',
      icon: 'fab fa-ethereum',
      color: '#f6851b',
      installUrl: 'https://metamask.io/download/'
    },
    coinbase: {
      name: 'Coinbase Wallet',
      icon: 'fas fa-wallet',
      color: '#0052ff',
      installUrl: 'https://wallet.coinbase.com/'
    },
    trust: {
      name: 'Trust Wallet',
      icon: 'fas fa-shield-alt',
      color: '#3375bb',
      installUrl: 'https://trustwallet.com/'
    }
  };

  // Initialize the system
  function initialize() {
    if (isInitialized) return;
    
    setupEventListeners();
    setupGlobalFunctions();
    loadSavedConnection();
    
    isInitialized = true;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Listen for wallet connection events
    window.addEventListener('wallet-connected', handleWalletConnected);
    window.addEventListener('wallet-disconnected', handleWalletDisconnected);
    
    // Listen for chain changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }
  }

  // Setup global functions
  function setupGlobalFunctions() {
    window.connectWallet = connectWallet;
    window.addToWallet = addToWallet;
    window.disconnectWallet = disconnectWallet;
    window.switchWallet = switchWallet;
  }

  // Load saved connection
  function loadSavedConnection() {
    try {
      const saved = localStorage.getItem('walletConnection');
      if (saved) {
        const connection = JSON.parse(saved);
        if (connection.wallet && connection.account) {
          currentWallet = connection.wallet;
          currentAccount = connection.account;
          currentChain = connection.chain;
          connectionStatus = 'connected';
          updateUI();
        }
      }
    } catch (error) {
      // Handle error silently
    }
  }

  // Check for MetaMask connection
  function checkMetaMaskConnection() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      return true;
    }
    return false;
  }

  // Global functions
  function connectWallet() {
    showWalletSelectionModal();
  }

  function addToWallet() {
    if (!currentWallet) {
      alert('Please connect a wallet first');
      return;
    }
    addPPOTokenToWallet();
  }

  function disconnectWallet() {
    currentWallet = null;
    currentAccount = null;
    currentChain = null;
    connectionStatus = 'disconnected';
    localStorage.removeItem('walletConnection');
    updateUI();
  }

  function switchWallet() {
    showWalletSelectionModal();
  }

  // Show wallet selection modal
  function showWalletSelectionModal() {
    if (walletModal) {
      walletModal.style.display = 'flex';
      return;
    }

    createWalletModal();
  }

  // Create wallet selection modal
  function createWalletModal() {
    walletModal = document.createElement('div');
    walletModal.className = 'wallet-modal-overlay';
    walletModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(4px);
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'wallet-modal';
    modalContent.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 0;
      max-width: 450px;
      width: 90%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 24px 0 24px;
      border-bottom: 1px solid #f3f4f6;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Connect Wallet';
    title.style.cssText = `
      margin: 0;
      color: #1f2937;
      font-size: 20px;
      font-weight: 600;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #9ca3af;
      padding: 8px;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeBtn.onclick = () => walletModal.style.display = 'none';
    
    header.appendChild(title);
    header.appendChild(closeBtn);

    // Wallet list
    const walletList = document.createElement('div');
    walletList.style.cssText = `
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    Object.entries(walletConfigs).forEach(([key, config]) => {
      const walletBtn = document.createElement('button');
      walletBtn.style.cssText = `
        width: 100%;
        background: white;
        border: 2px solid #f3f4f6;
        padding: 16px;
        border-radius: 12px;
        cursor: pointer;
        text-align: left;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: all 0.3s ease;
        border-color: ${config.color};
      `;
      
      walletBtn.innerHTML = `
        <div style="width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; background: linear-gradient(135deg, ${config.color}, ${config.color}dd);">
          <i class="${config.icon}"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px;">${config.name}</div>
          <div style="font-size: 12px; color: #6b7280;">Click to connect</div>
        </div>
        <div style="color: #9ca3af; font-size: 14px;">
          <i class="fas fa-chevron-right"></i>
        </div>
      `;
      
      walletBtn.onclick = () => connectToWallet(key);
      walletList.appendChild(walletBtn);
    });

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: 20px 24px 24px 24px;
      border-top: 1px solid #f3f4f6;
      text-align: center;
    `;
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
      background: #f3f4f6;
      color: #374151;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    `;
    cancelBtn.onclick = () => walletModal.style.display = 'none';
    
    footer.appendChild(cancelBtn);

    // Assemble modal
    modalContent.appendChild(header);
    modalContent.appendChild(walletList);
    modalContent.appendChild(footer);
    walletModal.appendChild(modalContent);
    
    // Close on overlay click
    walletModal.onclick = (e) => {
      if (e.target === walletModal) {
        walletModal.style.display = 'none';
      }
    };

    document.body.appendChild(walletModal);
  }

  // Connect to specific wallet
  async function connectToWallet(walletType) {
    try {
      if (walletType === 'metamask') {
        await connectMetaMask();
      } else if (walletType === 'coinbase') {
        await connectCoinbaseWallet();
      } else if (walletType === 'trust') {
        await connectTrustWallet();
      }
      
      if (walletModal) {
        walletModal.style.display = 'none';
      }
    } catch (error) {
      alert(`Failed to connect to ${walletConfigs[walletType].name}: ${error.message}`);
    }
  }

  // Connect to MetaMask
  async function connectMetaMask() {
    if (!window.ethereum) {
      window.open(walletConfigs.metamask.installUrl, '_blank');
      throw new Error('MetaMask not installed');
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      currentWallet = 'metamask';
      currentAccount = accounts[0];
      currentChain = parseInt(chainId, 16);
      connectionStatus = 'connected';
      
      saveConnection();
      updateUI();
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('wallet-connected', {
        detail: { wallet: 'metamask', account: currentAccount, chain: currentChain }
      }));
    } catch (error) {
      throw new Error('Failed to connect to MetaMask');
    }
  }

  // Connect to Coinbase Wallet
  async function connectCoinbaseWallet() {
    if (!window.ethereum) {
      window.open(walletConfigs.coinbase.installUrl, '_blank');
      throw new Error('Coinbase Wallet not installed');
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      currentWallet = 'coinbase';
      currentAccount = accounts[0];
      currentChain = parseInt(chainId, 16);
      connectionStatus = 'connected';
      
      saveConnection();
      updateUI();
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('wallet-connected', {
        detail: { wallet: 'coinbase', account: currentAccount, chain: currentChain }
      }));
    } catch (error) {
      throw new Error('Failed to connect to Coinbase Wallet');
    }
  }

  // Connect to Trust Wallet
  async function connectTrustWallet() {
    if (!window.ethereum) {
      window.open(walletConfigs.trust.installUrl, '_blank');
      throw new Error('Trust Wallet not installed');
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      currentWallet = 'trust';
      currentAccount = accounts[0];
      currentChain = parseInt(chainId, 16);
      connectionStatus = 'connected';
      
      saveConnection();
      updateUI();
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('wallet-connected', {
        detail: { wallet: 'trust', account: currentAccount, chain: currentChain }
      }));
    } catch (error) {
      throw new Error('Failed to connect to Trust Wallet');
    }
  }

  // Add PPO token to wallet
  async function addPPOTokenToWallet() {
    if (!window.ethereum) {
      alert('No wallet detected');
      return;
    }

    const tokenAddress = '0x1234567890123456789012345678901234567890'; // Replace with actual PPO token address
    const tokenSymbol = 'PPO';
    const tokenDecimals = 18;
    const tokenImage = 'https://your-domain.com/ppo-token.png'; // Replace with actual token image

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      alert('Failed to add PPO token to wallet');
    }
  }

  // Switch network
  async function switchNetwork(chainId) {
    if (!window.ethereum) {
      alert('No wallet detected');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Ethereum',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://mainnet.infura.io/v3/YOUR-PROJECT-ID'],
              blockExplorerUrls: ['https://etherscan.io']
            }],
          });
        } catch (addError) {
          alert('Failed to add network');
        }
      } else {
        alert('Failed to switch network');
      }
    }
  }

  // Save connection to localStorage
  function saveConnection() {
    const connection = {
      wallet: currentWallet,
      account: currentAccount,
      chain: currentChain,
      timestamp: Date.now()
    };
    localStorage.setItem('walletConnection', JSON.stringify(connection));
  }

  // Update UI
  function updateUI() {
    // Update wallet buttons
    const walletButtons = document.querySelectorAll('.connect-wallet-btn, .wallet-connect-btn');
    walletButtons.forEach(btn => {
      if (connectionStatus === 'connected') {
        btn.textContent = `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
        btn.style.background = '#10b981';
      } else {
        btn.textContent = 'Connect Wallet';
        btn.style.background = '';
      }
    });

    // Update wallet status displays
    const statusDisplays = document.querySelectorAll('.wallet-status');
    statusDisplays.forEach(display => {
      if (connectionStatus === 'connected') {
        display.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="${walletConfigs[currentWallet].icon}" style="color: ${walletConfigs[currentWallet].color};"></i>
            <span>${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}</span>
          </div>
        `;
      } else {
        display.innerHTML = '<span>Not Connected</span>';
      }
    });
  }

  // Event handlers
  function handleWalletConnected(event) {
    const { wallet, account, chain } = event.detail;
    currentWallet = wallet;
    currentAccount = account;
    currentChain = chain;
    connectionStatus = 'connected';
    saveConnection();
    updateUI();
  }

  function handleWalletDisconnected(event) {
    currentWallet = null;
    currentAccount = null;
    currentChain = null;
    connectionStatus = 'disconnected';
    localStorage.removeItem('walletConnection');
    updateUI();
  }

  function handleChainChanged(chainId) {
    currentChain = parseInt(chainId, 16);
    saveConnection();
    updateUI();
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      handleDisconnect();
    } else {
      currentAccount = accounts[0];
      saveConnection();
      updateUI();
    }
  }

  function handleDisconnect() {
    currentWallet = null;
    currentAccount = null;
    currentChain = null;
    connectionStatus = 'disconnected';
    localStorage.removeItem('walletConnection');
    updateUI();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
