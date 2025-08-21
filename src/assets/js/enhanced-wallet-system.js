// Enhanced Wallet System - COINPAYOT NFT
// Hệ thống kết nối wallet nâng cao với nhiều cách connect

console.log('🔗 Enhanced Wallet System loaded');

class EnhancedWalletSystem {
    constructor() {
        // Configuration
        this.config = {
            ppoContract: {
                address: '0xD962765700AC0F62dd627c2da0D6947Ed230dBB6',
                symbol: 'PPO',
                name: 'PPO Token',
                decimals: 18,
                chainId: 97
            },
            supportedWallets: {
                metamask: {
                    name: 'MetaMask',
                    icon: '🦊',
                    description: 'Most popular Ethereum wallet',
                    supported: true,
                    priority: 1
                },
                walletconnect: {
                    name: 'WalletConnect',
                    icon: '🔗',
                    description: 'Connect any wallet via QR code',
                    supported: true,
                    priority: 2
                },
                trustwallet: {
                    name: 'Trust Wallet',
                    icon: '🛡️',
                    description: 'Binance\'s official wallet',
                    supported: true,
                    priority: 3
                },
                binance: {
                    name: 'Binance Wallet',
                    icon: '💰',
                    description: 'Binance exchange wallet',
                    supported: true,
                    priority: 4
                },
                coinbase: {
                    name: 'Coinbase Wallet',
                    icon: '🪙',
                    description: 'Coinbase exchange wallet',
                    supported: true,
                    priority: 5
                },
                tokenpocket: {
                    name: 'TokenPocket',
                    icon: '📱',
                    description: 'Multi-chain mobile wallet',
                    supported: true,
                    priority: 6
                },
                safepal: {
                    name: 'SafePal',
                    icon: '🛡️',
                    description: 'Hardware wallet support',
                    supported: true,
                    priority: 7
                }
            }
        };

        // State
        this.web3 = null;
        this.provider = null;
        this.account = null;
        this.chainId = null;
        this.isConnected = false;
        this.balance = '0';
        this.currentWallet = null;
        this.connectionId = null;

        // Initialize
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Enhanced Wallet System...');
        
        try {
            // Setup global functions first
            this.setupGlobalFunctions();
            
            // Check for existing connection
            await this.checkExistingConnection();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initial UI update
            this.updateUI();
            
            // Setup cross-page synchronization
            this.setupCrossPageSync();
            
            console.log('✅ Enhanced Wallet System initialized');
            
        } catch (error) {
            console.error('❌ Error initializing Enhanced Wallet System:', error);
        }
    }

    async checkExistingConnection() {
        // Check localStorage for existing connection
        const savedConnection = localStorage.getItem('walletConnection');
        if (savedConnection) {
            try {
                const connection = JSON.parse(savedConnection);
                if (connection.account && connection.wallet) {
                    console.log('✅ Found saved connection:', connection);
                    this.currentWallet = connection.wallet;
                    this.account = connection.account;
                    this.chainId = connection.chainId;
                    this.isConnected = true;
                    
                    // Try to reconnect
                    await this.reconnectWallet();
                }
            } catch (error) {
                console.log('❌ Error parsing saved connection');
                localStorage.removeItem('walletConnection');
            }
        }

        // Check for MetaMask connection
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    console.log('✅ Found MetaMask connection');
                    await this.handleAccountsChanged(accounts);
                }
            } catch (error) {
                console.log('❌ No MetaMask connection found');
            }
        }
    }

    setupGlobalFunctions() {
        // Global connect function - giữ nguyên UI hiện tại
        window.connectWallet = async () => {
            console.log('🔗 connectWallet called');
            return await this.connectWithCurrentUI();
        };

        // Global add token function
        window.addToWallet = async () => {
            console.log('➕ addToWallet called');
            return await this.addToken();
        };

        // Global disconnect function
        window.disconnectWallet = async () => {
            console.log('🔌 disconnectWallet called');
            return await this.disconnect();
        };

        // Global switch wallet function
        window.switchWallet = async () => {
            console.log('🔄 switchWallet called');
            return await this.showWalletModal();
        };

        console.log('✅ Global functions setup complete');
    }

    setupEventListeners() {
        // MetaMask events
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
            window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));
            window.ethereum.on('disconnect', this.handleDisconnect.bind(this));
        }

        // Storage events for cross-page sync
        window.addEventListener('storage', this.handleStorageChange.bind(this));
        
        // Custom events
        document.addEventListener('wallet:connect', this.handleWalletConnect.bind(this));
        document.addEventListener('wallet:disconnect', this.handleWalletDisconnect.bind(this));
    }

    setupCrossPageSync() {
        // Broadcast connection status to other tabs
        if (this.isConnected) {
            this.broadcastConnectionStatus();
        }
    }

    // Giữ nguyên UI hiện tại - chỉ connect MetaMask
    async connectWithCurrentUI() {
        console.log('🔗 Connecting with current UI...');
        
        // Thử connect MetaMask trước
        if (window.ethereum) {
            return await this.connectMetaMask();
        }
        
        // Nếu không có MetaMask, hiện modal chọn ví
        return await this.showWalletModal();
    }

    async showWalletModal() {
        console.log('🎯 Showing wallet selection modal...');
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'wallet-modal';
        modal.innerHTML = `
            <div class="wallet-modal-content">
                <div class="wallet-modal-header">
                    <h3 class="wallet-modal-title">Connect Wallet</h3>
                    <p class="wallet-modal-subtitle">Choose your preferred wallet to connect</p>
                </div>
                <div class="wallet-modal-body">
                    ${Object.entries(this.config.supportedWallets)
                        .sort(([,a], [,b]) => a.priority - b.priority)
                        .map(([key, wallet]) => `
                            <div class="wallet-option" data-wallet="${key}">
                                <div class="wallet-option-icon">${wallet.icon}</div>
                                <div class="wallet-option-info">
                                    <div class="wallet-option-name">${wallet.name}</div>
                                    <div class="wallet-option-description">${wallet.description}</div>
                                </div>
                            </div>
                        `).join('')}
                </div>
                <div class="wallet-modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.wallet-modal').remove()">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.classList.add('show');

        // Add click handlers
        const walletOptions = modal.querySelectorAll('.wallet-option');
        walletOptions.forEach(option => {
            option.addEventListener('click', async () => {
                const walletType = option.dataset.wallet;
                modal.remove();
                await this.connectToWallet(walletType);
            });
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    async connectToWallet(walletType) {
        console.log(`🔗 Connecting to ${walletType}...`);
        
        try {
            switch (walletType) {
                case 'metamask':
                    return await this.connectMetaMask();
                case 'walletconnect':
                    return await this.connectWalletConnect();
                case 'trustwallet':
                    return await this.connectTrustWallet();
                case 'binance':
                    return await this.connectBinanceWallet();
                case 'coinbase':
                    return await this.connectCoinbaseWallet();
                case 'tokenpocket':
                    return await this.connectTokenPocket();
                case 'safepal':
                    return await this.connectSafePal();
                default:
                    this.showNotification('❌ Unsupported wallet type', 'error');
                    return false;
            }
        } catch (error) {
            console.error(`❌ Error connecting to ${walletType}:`, error);
            this.showNotification(`❌ Failed to connect to ${walletType}`, 'error');
            return false;
        }
    }

    async connectMetaMask() {
        if (!window.ethereum) {
            this.showNotification('❌ MetaMask not found! Please install MetaMask first.', 'error');
            window.open('https://metamask.io/download/', '_blank');
            return false;
        }

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                this.showNotification('❌ No accounts found. Please connect your wallet.', 'error');
                return false;
            }

            this.web3 = new Web3(window.ethereum);
            this.provider = window.ethereum;
            this.account = accounts[0];
            this.chainId = await this.web3.eth.net.getId();
            this.isConnected = true;
            this.currentWallet = 'metamask';

            await this.saveConnection();
            this.updateUI();
            this.showNotification('✅ MetaMask connected successfully!', 'success');
            this.broadcastConnectionStatus();

            return true;

        } catch (error) {
            console.error('❌ Error connecting MetaMask:', error);
            if (error.code === 4001) {
                this.showNotification('❌ User rejected connection request.', 'error');
            } else {
                this.showNotification('❌ Failed to connect MetaMask. Please try again.', 'error');
            }
            return false;
        }
    }

    async connectWalletConnect() {
        // WalletConnect implementation
        this.showNotification('🔄 WalletConnect coming soon!', 'info');
        return false;
    }

    async connectTrustWallet() {
        // Trust Wallet implementation
        this.showNotification('🔄 Trust Wallet coming soon!', 'info');
        return false;
    }

    async connectBinanceWallet() {
        // Binance Wallet implementation
        this.showNotification('🔄 Binance Wallet coming soon!', 'info');
        return false;
    }

    async connectCoinbaseWallet() {
        // Coinbase Wallet implementation
        this.showNotification('🔄 Coinbase Wallet coming soon!', 'info');
        return false;
    }

    async connectTokenPocket() {
        // TokenPocket implementation
        this.showNotification('🔄 TokenPocket coming soon!', 'info');
        return false;
    }

    async connectSafePal() {
        // SafePal implementation
        this.showNotification('🔄 SafePal coming soon!', 'info');
        return false;
    }

    async reconnectWallet() {
        if (this.currentWallet === 'metamask' && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0 && accounts[0] === this.account) {
                    this.web3 = new Web3(window.ethereum);
                    this.provider = window.ethereum;
                    this.isConnected = true;
                    this.updateUI();
                    console.log('✅ Successfully reconnected to MetaMask');
                    return true;
                }
            } catch (error) {
                console.error('❌ Error reconnecting:', error);
            }
        }
        
        // If reconnection failed, clear connection
        await this.disconnect();
        return false;
    }

    async addToken() {
        console.log('➕ Adding PPO token to wallet...');
        
        try {
            if (!this.isConnected) {
                this.showNotification('❌ Please connect your wallet first!', 'error');
                return false;
            }

            if (this.chainId !== this.config.ppoContract.chainId) {
                this.showNotification('⚠️ Please switch to BSC Testnet first!', 'warning');
                await this.switchNetwork(this.config.ppoContract.chainId);
                return false;
            }

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
            
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + chainId.toString(16) }],
            });

            console.log('✅ Network switched successfully');
            this.showNotification('✅ Switched to BSC Testnet', 'success');
            return true;

        } catch (switchError) {
            console.log('Switch error:', switchError);
            
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x' + chainId.toString(16),
                            chainName: 'BSC Testnet',
                            nativeCurrency: {
                                name: 'tBNB',
                                symbol: 'tBNB',
                                decimals: 18
                            },
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                            blockExplorerUrls: ['https://testnet.bscscan.com']
                        }]
                    });
                    
                    console.log('✅ Network added successfully');
                    this.showNotification('✅ BSC Testnet added to MetaMask!', 'success');
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
            this.provider = null;
            this.balance = '0';
            this.currentWallet = null;
            
            // Clear localStorage
            localStorage.removeItem('walletConnection');
            
            // Update UI
            this.updateUI();
            
            // Show notification
            this.showNotification('✅ Wallet disconnected successfully!', 'info');
            
            // Broadcast disconnection
            this.broadcastConnectionStatus();
            
            return true;
            
        } catch (error) {
            console.error('❌ Error disconnecting wallet:', error);
            return false;
        }
    }

    async saveConnection() {
        const connection = {
            account: this.account,
            chainId: this.chainId,
            wallet: this.currentWallet,
            timestamp: Date.now()
        };
        localStorage.setItem('walletConnection', JSON.stringify(connection));
    }

    broadcastConnectionStatus() {
        const status = {
            isConnected: this.isConnected,
            account: this.account,
            wallet: this.currentWallet,
            timestamp: Date.now()
        };
        localStorage.setItem('walletStatus', JSON.stringify(status));
    }

    // Event handlers
    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            await this.disconnect();
        } else if (accounts[0] !== this.account) {
            this.account = accounts[0];
            await this.saveConnection();
            this.updateUI();
            this.showNotification('✅ Account changed successfully!', 'success');
            this.broadcastConnectionStatus();
        }
    }

    handleChainChanged(chainId) {
        console.log('🔄 Chain changed to:', chainId);
        this.chainId = parseInt(chainId, 16);
        this.updateUI();
        this.showNotification('🌐 Network changed', 'info');
    }

    handleDisconnect() {
        console.log('🔌 Wallet disconnected');
        this.disconnect();
    }

    handleStorageChange(e) {
        if (e.key === 'walletStatus') {
            try {
                const status = JSON.parse(e.newValue);
                if (status && !status.isConnected && this.isConnected) {
                    console.log('🔄 Wallet disconnected in another tab');
                    this.disconnect();
                }
            } catch (error) {
                console.error('❌ Error parsing wallet status:', error);
            }
        }
    }

    handleWalletConnect(event) {
        console.log('🎉 Wallet connected event received:', event.detail);
    }

    handleWalletDisconnect(event) {
        console.log('👋 Wallet disconnected event received:', event.detail);
    }

    // UI Updates - Giữ nguyên UI hiện tại
    updateUI() {
        console.log('🎨 Updating UI...');
        
        // Update all connect wallet buttons
        const connectButtons = document.querySelectorAll('.connect-wallet-btn');
        connectButtons.forEach(btn => {
            if (this.isConnected && this.account) {
                const shortAddress = `${this.account.substring(0, 6)}...${this.account.substring(38)}`;
                btn.textContent = shortAddress;
                btn.classList.add('connected');
                btn.onclick = () => this.disconnect();
            } else {
                btn.textContent = 'Connect Wallet';
                btn.classList.remove('connected');
                btn.onclick = () => this.connectWithCurrentUI();
            }
        });

        // Update all add token buttons
        const addTokenButtons = document.querySelectorAll('#addToWalletBtn, .add-token-btn');
        addTokenButtons.forEach(btn => {
            btn.style.display = this.isConnected ? 'inline-block' : 'none';
            btn.onclick = () => this.addToken();
        });

        // Update balance displays
        if (!this.isConnected) {
            const balanceElements = document.querySelectorAll('.ppo-balance, .wallet-balance');
            balanceElements.forEach(element => {
                element.textContent = '0.00 PPO';
            });
        }
    }

    // Utility methods
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

        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);

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

    getCurrentWallet() {
        return this.currentWallet;
    }

    getWeb3() {
        return this.web3;
    }
}

// Initialize the system
const enhancedWallet = new EnhancedWalletSystem();

// Make it globally available
window.enhancedWallet = enhancedWallet;
window.EnhancedWalletSystem = EnhancedWalletSystem;

console.log('🎯 Enhanced Wallet System ready!');
