// Modern Wallet System - COINPAYOT NFT
// Hệ thống kết nối wallet và quản lý token hiện đại

console.log('🔗 Modern Wallet System loaded');

class ModernWalletSystem {
    constructor() {
        // Configuration
        this.config = {
            ppoContract: {
                address: '0xD962765700AC0F62dd627c2da0D6947Ed230dBB6',
                symbol: 'PPO',
                name: 'PPO Token',
                decimals: 18,
                chainId: 97, // BSC Testnet
                rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                explorerUrl: 'https://testnet.bscscan.com',
                networkName: 'BSC Testnet'
            },
            supportedChains: {
                97: {
                    name: 'BSC Testnet',
                    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                    explorerUrl: 'https://testnet.bscscan.com',
                    nativeCurrency: {
                        name: 'tBNB',
                        symbol: 'tBNB',
                        decimals: 18
                    }
                },
                56: {
                    name: 'BSC Mainnet',
                    rpcUrl: 'https://bsc-dataseed.binance.org/',
                    explorerUrl: 'https://bscscan.com',
                    nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18
                    }
                }
            }
        };

        // State
        this.web3 = null;
        this.provider = null;
        this.contract = null;
        this.account = null;
        this.chainId = null;
        this.isConnected = false;
        this.balance = '0';
        this.balanceCache = new Map();
        this.balanceCacheTimeout = 30000; // 30 seconds

        // UI Elements
        this.ui = {
            connectBtn: null,
            addTokenBtn: null,
            balanceDisplay: null,
            accountDisplay: null,
            networkDisplay: null
        };

        // Event listeners
        this.events = new Map();

        this.init();
    }

    async init() {
        console.log('🚀 Initializing Modern Wallet System...');
        
        try {
            // Initialize UI elements
            this.initializeUI();
            
            // Check for existing connection
            await this.checkExistingConnection();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup global functions
            this.setupGlobalFunctions();
            
            console.log('✅ Modern Wallet System initialized');
            
        } catch (error) {
            console.error('❌ Error initializing Modern Wallet System:', error);
        }
    }

    initializeUI() {
        console.log('🎨 Initializing UI elements...');
        
        // Find UI elements
        this.ui.connectBtn = document.querySelector('.connect-wallet-btn');
        this.ui.addTokenBtn = document.getElementById('addToWalletBtn');
        this.ui.balanceDisplay = document.querySelector('.ppo-balance, .wallet-balance');
        this.ui.accountDisplay = document.querySelector('.account-display');
        this.ui.networkDisplay = document.querySelector('.network-display');

        // Create UI elements if they don't exist
        this.createUIElements();
        
        console.log('✅ UI elements initialized');
    }

    createUIElements() {
        // Create wallet status display
        if (!document.getElementById('walletStatus')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'walletStatus';
            statusDiv.className = 'wallet-status d-flex align-items-center gap-2';
            statusDiv.innerHTML = `
                <div class="connection-indicator">
                    <span class="status-dot disconnected"></span>
                </div>
                <div class="wallet-info">
                    <div class="account-address">Not Connected</div>
                    <div class="network-info">No Network</div>
                </div>
                <div class="wallet-actions">
                    <button class="btn btn-sm btn-outline-primary connect-btn" onclick="modernWallet.connect()">
                        <i class="fas fa-wallet me-1"></i>Connect
                    </button>
                    <button class="btn btn-sm btn-success add-token-btn" onclick="modernWallet.addToken()" style="display: none;">
                        <i class="fas fa-plus me-1"></i>Add PPO
                    </button>
                </div>
            `;
            
            // Insert into header
            const header = document.querySelector('.btn-wrap');
            if (header) {
                header.appendChild(statusDiv);
            }
        }

        // Create balance display
        if (!document.getElementById('balanceDisplay')) {
            const balanceDiv = document.createElement('div');
            balanceDiv.id = 'balanceDisplay';
            balanceDiv.className = 'balance-display';
            balanceDiv.innerHTML = `
                <div class="balance-item">
                    <i class="fas fa-coins text-warning"></i>
                    <span class="ppo-balance">0.00 PPO</span>
                </div>
                <div class="balance-item">
                    <i class="fas fa-ethereum text-primary"></i>
                    <span class="bnb-balance">0.00 BNB</span>
                </div>
            `;
            
            // Insert into appropriate location
            const balanceContainer = document.querySelector('.quick-stats') || document.querySelector('.balance-container');
            if (balanceContainer) {
                balanceContainer.appendChild(balanceDiv);
            }
        }
    }

    async checkExistingConnection() {
        console.log('🔍 Checking existing connection...');
        
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    console.log('✅ Found existing connection');
                    await this.handleAccountsChanged(accounts);
                }
            } catch (error) {
                console.log('❌ No existing connection found');
            }
        }
    }

    setupEventListeners() {
        console.log('🎧 Setting up event listeners...');
        
        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
            window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));
            window.ethereum.on('disconnect', this.handleDisconnect.bind(this));
        }

        // Listen for custom events
        document.addEventListener('wallet:connect', this.handleWalletConnect.bind(this));
        document.addEventListener('wallet:disconnect', this.handleWalletDisconnect.bind(this));
        
        console.log('✅ Event listeners setup complete');
    }

    setupGlobalFunctions() {
        console.log('🔗 Setting up global functions...');
        
        // Global connect function
        window.connectWallet = async () => {
            return await this.connect();
        };

        // Global add token function
        window.addToWallet = async () => {
            return await this.addToken();
        };

        // Global disconnect function
        window.disconnectWallet = async () => {
            return await this.disconnect();
        };

        // Global switch network function
        window.switchNetwork = async (chainId) => {
            return await this.switchNetwork(chainId);
        };

        console.log('✅ Global functions setup complete');
    }

    async connect() {
        console.log('🔗 Connecting wallet...');
        
        try {
            // Check if MetaMask is installed
            if (!window.ethereum) {
                this.showNotification('❌ MetaMask not found! Please install MetaMask first.', 'error');
                window.open('https://metamask.io/download/', '_blank');
                return false;
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                this.showNotification('❌ No accounts found. Please connect your wallet.', 'error');
                return false;
            }

            // Initialize Web3
            this.provider = window.ethereum;
            this.web3 = new Web3(this.provider);
            this.account = accounts[0];
            this.chainId = await this.web3.eth.net.getId();

            console.log('📱 Connected account:', this.account);
            console.log('🌐 Network ID:', this.chainId);

            // Update state
            this.isConnected = true;

            // Initialize contract
            await this.initializeContract();

            // Load balance
            await this.loadBalance();

            // Update UI
            this.updateUI();

            // Show success notification
            this.showNotification('✅ Wallet connected successfully!', 'success');

            // Dispatch event
            this.dispatchEvent('wallet:connected', {
                account: this.account,
                chainId: this.chainId,
                networkName: this.getNetworkName(this.chainId)
            });

            return true;

        } catch (error) {
            console.error('❌ Error connecting wallet:', error);
            
            if (error.code === 4001) {
                this.showNotification('❌ User rejected connection request.', 'error');
            } else {
                this.showNotification('❌ Failed to connect wallet. Please try again.', 'error');
            }
            
            return false;
        }
    }

    async initializeContract() {
        try {
            console.log('📄 Initializing PPO contract...');
            
            // PPO Token ABI (ERC-20 standard)
            const ppoABI = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "name",
                    "outputs": [{"name": "", "type": "string"}],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [{"name": "", "type": "string"}],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [{"name": "", "type": "uint8"}],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [{"name": "_owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"name": "balance", "type": "uint256"}],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            
            this.contract = new this.web3.eth.Contract(
                ppoABI,
                this.config.ppoContract.address
            );

            // Verify contract
            const name = await this.contract.methods.name().call();
            const symbol = await this.contract.methods.symbol().call();
            
            console.log('✅ Contract verified:', { name, symbol });
            
        } catch (error) {
            console.error('❌ Error initializing contract:', error);
            this.showNotification('❌ Failed to connect to PPO contract. Please check your network.', 'error');
        }
    }

    async loadBalance() {
        try {
            if (!this.contract || !this.account) return;

            console.log('💰 Loading balance...');
            
            // Load PPO balance
            const ppoBalance = await this.contract.methods.balanceOf(this.account).call();
            const formattedPPOBalance = this.web3.utils.fromWei(ppoBalance, 'ether');
            
            // Load BNB balance
            const bnbBalance = await this.web3.eth.getBalance(this.account);
            const formattedBNBBalance = this.web3.utils.fromWei(bnbBalance, 'ether');
            
            this.balance = formattedPPOBalance;
            
            console.log('💰 Balances loaded:', {
                ppo: formattedPPOBalance,
                bnb: formattedBNBBalance
            });
            
            // Update balance displays
            this.updateBalanceDisplay(formattedPPOBalance, formattedBNBBalance);
            
            // Cache balance
            this.balanceCache.set(this.account, {
                ppo: formattedPPOBalance,
                bnb: formattedBNBBalance,
                timestamp: Date.now()
            });
            
        } catch (error) {
            console.error('❌ Error loading balance:', error);
        }
    }

    async addToken() {
        console.log('➕ Adding PPO token to wallet...');
        
        try {
            // Check if wallet is connected
            if (!this.isConnected) {
                this.showNotification('❌ Please connect your wallet first!', 'error');
                return false;
            }

            // Check if we're on the correct network
            if (this.chainId !== this.config.ppoContract.chainId) {
                this.showNotification('⚠️ Please switch to BSC Testnet first!', 'warning');
                await this.switchNetwork(this.config.ppoContract.chainId);
                return false;
            }

            // Add token to wallet
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: this.config.ppoContract.address,
                        symbol: this.config.ppoContract.symbol,
                        decimals: this.config.ppoContract.decimals,
                        image: 'https://your-domain.com/ppo-token-icon.png'
                    }
                }
            });

            if (wasAdded) {
                this.showNotification('✅ PPO token added to wallet successfully!', 'success');
                console.log('✅ PPO token added to wallet');
                
                // Refresh balance after adding token
                setTimeout(() => {
                    this.loadBalance();
                }, 1000);
                
                return true;
            } else {
                this.showNotification('❌ Failed to add PPO token to wallet.', 'error');
                return false;
            }

        } catch (error) {
            console.error('❌ Error adding token to wallet:', error);
            this.showNotification('❌ Error adding token: ' + error.message, 'error');
            return false;
        }
    }

    async switchNetwork(chainId) {
        try {
            console.log(`🔄 Switching to network: ${chainId}`);
            
            const chainConfig = this.config.supportedChains[chainId];
            if (!chainConfig) {
                this.showNotification('❌ Unsupported network!', 'error');
                return false;
            }

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + chainId.toString(16) }],
            });

            console.log('✅ Network switched successfully');
            this.showNotification(`✅ Switched to ${chainConfig.name}`, 'success');
            return true;

        } catch (switchError) {
            console.log('Switch error:', switchError);
            
            if (switchError.code === 4902) {
                // Network not added, add it
                try {
                    const chainConfig = this.config.supportedChains[chainId];
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x' + chainId.toString(16),
                            chainName: chainConfig.name,
                            nativeCurrency: chainConfig.nativeCurrency,
                            rpcUrls: [chainConfig.rpcUrl],
                            blockExplorerUrls: [chainConfig.explorerUrl]
                        }]
                    });
                    
                    console.log('✅ Network added successfully');
                    this.showNotification(`✅ ${chainConfig.name} added to MetaMask!`, 'success');
                    return true;
                    
                } catch (addError) {
                    console.error('❌ Error adding network:', addError);
                    this.showNotification('❌ Failed to add network to MetaMask.', 'error');
                    return false;
                }
            } else {
                console.error('❌ Error switching network:', switchError);
                this.showNotification('❌ Failed to switch network.', 'error');
                return false;
            }
        }
    }

    async disconnect() {
        console.log('🔌 Disconnecting wallet...');
        
        try {
            // Reset state
            this.isConnected = false;
            this.account = null;
            this.chainId = null;
            this.web3 = null;
            this.contract = null;
            this.balance = '0';
            
            // Clear cache
            this.balanceCache.clear();
            
            // Clear localStorage
            localStorage.removeItem('walletConnected');
            localStorage.removeItem('walletAccount');
            localStorage.removeItem('walletChainId');
            
            // Update UI
            this.updateUI();
            
            // Show notification
            this.showNotification('✅ Wallet disconnected successfully!', 'info');
            
            // Dispatch event
            this.dispatchEvent('wallet:disconnected', {});
            
            return true;
            
        } catch (error) {
            console.error('❌ Error disconnecting wallet:', error);
            return false;
        }
    }

    // Event handlers
    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            await this.disconnect();
        } else if (accounts[0] !== this.account) {
            this.account = accounts[0];
            this.updateUI();
            await this.loadBalance();
            this.showNotification('✅ Account changed successfully!', 'success');
        }
    }

    handleChainChanged(chainId) {
        console.log('🔄 Chain changed to:', chainId);
        this.chainId = parseInt(chainId, 16);
        this.updateUI();
        this.showNotification(`🌐 Network changed to ${this.getNetworkName(this.chainId)}`, 'info');
    }

    handleDisconnect() {
        console.log('🔌 Wallet disconnected');
        this.disconnect();
    }

    handleWalletConnect(event) {
        console.log('🎉 Wallet connected event received:', event.detail);
    }

    handleWalletDisconnect(event) {
        console.log('👋 Wallet disconnected event received:', event.detail);
    }

    // UI Updates
    updateUI() {
        console.log('🎨 Updating UI...');
        
        // Update connect button
        if (this.ui.connectBtn) {
            if (this.isConnected && this.account) {
                const shortAddress = `${this.account.substring(0, 6)}...${this.account.substring(38)}`;
                this.ui.connectBtn.textContent = shortAddress;
                this.ui.connectBtn.classList.add('connected');
                this.ui.connectBtn.onclick = () => this.disconnect();
            } else {
                this.ui.connectBtn.textContent = 'Connect Wallet';
                this.ui.connectBtn.classList.remove('connected');
                this.ui.connectBtn.onclick = () => this.connect();
            }
        }

        // Update add token button
        if (this.ui.addTokenBtn) {
            this.ui.addTokenBtn.style.display = this.isConnected ? 'inline-block' : 'none';
        }

        // Update wallet status
        const statusDot = document.querySelector('.status-dot');
        const accountAddress = document.querySelector('.account-address');
        const networkInfo = document.querySelector('.network-info');
        const connectBtn = document.querySelector('.connect-btn');
        const addTokenBtn = document.querySelector('.add-token-btn');

        if (statusDot) {
            statusDot.className = `status-dot ${this.isConnected ? 'connected' : 'disconnected'}`;
        }

        if (accountAddress) {
            if (this.isConnected && this.account) {
                const shortAddress = `${this.account.substring(0, 6)}...${this.account.substring(38)}`;
                accountAddress.textContent = shortAddress;
            } else {
                accountAddress.textContent = 'Not Connected';
            }
        }

        if (networkInfo) {
            if (this.isConnected) {
                networkInfo.textContent = this.getNetworkName(this.chainId);
            } else {
                networkInfo.textContent = 'No Network';
            }
        }

        if (connectBtn) {
            if (this.isConnected) {
                connectBtn.textContent = 'Disconnect';
                connectBtn.className = 'btn btn-sm btn-outline-danger connect-btn';
                connectBtn.onclick = () => this.disconnect();
            } else {
                connectBtn.textContent = 'Connect';
                connectBtn.className = 'btn btn-sm btn-outline-primary connect-btn';
                connectBtn.onclick = () => this.connect();
            }
        }

        if (addTokenBtn) {
            addTokenBtn.style.display = this.isConnected ? 'inline-block' : 'none';
        }

        // Update balance display
        if (!this.isConnected) {
            this.updateBalanceDisplay('0.00', '0.00');
        }
    }

    updateBalanceDisplay(ppoBalance, bnbBalance) {
        const ppoElements = document.querySelectorAll('.ppo-balance');
        const bnbElements = document.querySelectorAll('.bnb-balance');

        ppoElements.forEach(element => {
            element.textContent = `${parseFloat(ppoBalance).toFixed(2)} PPO`;
        });

        bnbElements.forEach(element => {
            element.textContent = `${parseFloat(bnbBalance).toFixed(4)} BNB`;
        });
    }

    // Utility methods
    getNetworkName(chainId) {
        const chainConfig = this.config.supportedChains[chainId];
        return chainConfig ? chainConfig.name : 'Unknown Network';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }

    dispatchEvent(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    // Public API
    getAccount() {
        return this.account;
    }

    getChainId() {
        return this.chainId;
    }

    getBalance() {
        return this.balance;
    }

    isWalletConnected() {
        return this.isConnected;
    }

    getContract() {
        return this.contract;
    }

    getWeb3() {
        return this.web3;
    }
}

// Initialize the system
const modernWallet = new ModernWalletSystem();

// Make it globally available
window.modernWallet = modernWallet;
window.ModernWalletSystem = ModernWalletSystem;

console.log('🎯 Modern Wallet System ready!');
