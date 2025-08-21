// Real Blockchain Integration System
// Liên kết trực tiếp với smart contract như các web crypto thực tế

console.log('🔗 Real Blockchain Integration System loaded');

class RealBlockchainIntegration {
    constructor() {
        // PPO Contract Configuration - BSC Testnet
        this.ppoContract = {
            address: '0xD962765700AC0F62dd627c2da0D6947Ed230dBB6',
            symbol: 'PPO',
            name: 'PPO Token',
            decimals: 18,
            chainId: 97, // BSC Testnet
            rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            explorerUrl: 'https://testnet.bscscan.com',
            networkName: 'BSC Testnet'
        };

        // Web3 and contract instances
        this.web3 = null;
        this.ppoContractInstance = null;
        this.provider = null;
        this.isConnected = false;
        this.currentAccount = null;
        this.networkId = null;
        this.balanceCache = new Map();
        this.balanceCacheTimeout = 30000; // 30 seconds

        // PPO Token ABI (ERC-20 standard)
        this.ppoABI = [
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
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{"name": "", "type": "uint256"}],
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
            },
            {
                "constant": true,
                "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
                "name": "allowance",
                "outputs": [{"name": "", "type": "uint256"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
                "name": "transfer",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
                "name": "approve",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
                "name": "transferFrom",
                "outputs": [{"name": "", "type": "bool"}],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing Real Blockchain Integration...');
            
            // Check if Web3 is available
            if (typeof Web3 === 'undefined') {
                console.error('❌ Web3 is not loaded. Please include web3.js library.');
                this.showNotification('Web3 library not found. Please refresh the page.', 'error');
                return;
            }

            // Setup event listeners
            this.setupEventListeners();
            
            // Check for existing connection
            await this.checkExistingConnection();
            
            // Add testnet support
            await this.setupTestnetSupport();
            
            console.log('✅ Real Blockchain Integration initialized');
        } catch (error) {
            console.error('❌ Error initializing Real Blockchain Integration:', error);
        }
    }

    setupEventListeners() {
        // Listen for wallet connection changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });

            window.ethereum.on('chainChanged', (chainId) => {
                this.handleChainChanged(chainId);
            });

            window.ethereum.on('disconnect', () => {
                this.handleDisconnect();
            });
        }
    }

    async checkExistingConnection() {
        try {
            if (window.ethereum && window.ethereum.selectedAddress) {
                console.log('🔍 Found existing wallet connection');
                await this.connectWallet();
            }
        } catch (error) {
            console.warn('⚠️ Error checking existing connection:', error);
        }
    }

    async setupTestnetSupport() {
        try {
            console.log('🔧 Setting up BSC Testnet support...');
            
            if (window.ethereum) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                console.log('Current chain ID:', chainId);
                
                if (chainId !== '0x61') { // BSC Testnet chain ID
                    console.log('⚠️ Not on BSC Testnet, current chain:', chainId);
                    this.showNotification('Please switch to BSC Testnet for full functionality', 'warning');
                }
            }
        } catch (error) {
            console.warn('⚠️ Error setting up testnet support:', error);
        }
    }

    async connectWallet() {
        try {
            console.log('🔗 Connecting wallet...');

            if (!window.ethereum) {
                this.showNotification('❌ Vui lòng cài đặt MetaMask trước!', 'error');
                window.open('https://metamask.io/download/', '_blank');
                return false;
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                this.showNotification('❌ Không tìm thấy tài khoản. Vui lòng kết nối wallet.', 'error');
                return false;
            }

            // Initialize Web3
            this.provider = window.ethereum;
            this.web3 = new Web3(this.provider);
            this.currentAccount = accounts[0];
            this.networkId = await this.web3.eth.net.getId();

            console.log('📱 Connected account:', this.currentAccount);
            console.log('🌐 Network ID:', this.networkId);

            // Always connect first, then check network
            this.isConnected = true;
            this.updateUI();
            this.showNotification('✅ Wallet đã kết nối thành công!', 'success');

            // Check if we're on the correct network
            if (this.networkId === this.ppoContract.chainId) {
                console.log('✅ Correct network detected, initializing contract...');
                // Initialize contract
                await this.initializeContract();
                
                // Load real balance from blockchain
                await this.loadRealBalance();
            } else {
                console.log('⚠️ Wrong network detected. Current:', this.networkId, 'Expected:', this.ppoContract.chainId);
                this.showNotification('⚠️ Vui lòng chuyển sang BSC Testnet để sử dụng đầy đủ tính năng PPO', 'warning');
            }

            return true; // Always return true if wallet is connected

        } catch (error) {
            console.error('❌ Error connecting wallet:', error);
            if (error.code === 4001) {
                this.showNotification('❌ Người dùng từ chối kết nối wallet.', 'error');
            } else {
                this.showNotification('❌ Không thể kết nối wallet. Vui lòng thử lại.', 'error');
            }
            return false;
        }
    }

    async initializeContract() {
        try {
            console.log('📄 Initializing PPO contract...');
            
            this.ppoContractInstance = new this.web3.eth.Contract(
                this.ppoABI,
                this.ppoContract.address
            );

            // Verify contract
            const name = await this.ppoContractInstance.methods.name().call();
            const symbol = await this.ppoContractInstance.methods.symbol().call();
            
            console.log('✅ Contract verified:', { name, symbol });
            
        } catch (error) {
            console.error('❌ Error initializing contract:', error);
            this.showNotification('Failed to connect to PPO contract. Please check your network.', 'error');
        }
    }

    async loadRealBalance() {
        try {
            if (!this.ppoContractInstance || !this.currentAccount) return;

            console.log('💰 Loading real balance from blockchain...');
            
            const balance = await this.ppoContractInstance.methods.balanceOf(this.currentAccount).call();
            const formattedBalance = this.web3.utils.fromWei(balance, 'ether');
            
            console.log('💰 Real PPO Balance from blockchain:', formattedBalance);
            
            // Update UI with real balance
            this.updateBalanceDisplay(formattedBalance);
            
            // Store in localStorage for other components
            localStorage.setItem('ppoBalance', formattedBalance);
            localStorage.setItem('ppoContractAddress', this.ppoContract.address);
            
            // Cache the balance
            this.balanceCache.set(this.currentAccount, {
                balance: formattedBalance,
                timestamp: Date.now()
            });
            
        } catch (error) {
            console.error('❌ Error loading real balance:', error);
        }
    }

    async getRealBalance(address = null) {
        try {
            if (!this.ppoContractInstance) return '0';

            const targetAddress = address || this.currentAccount;
            if (!targetAddress) return '0';

            // Check cache first
            const cached = this.balanceCache.get(targetAddress);
            if (cached && (Date.now() - cached.timestamp) < this.balanceCacheTimeout) {
                console.log('💰 Using cached balance:', cached.balance);
                return cached.balance;
            }

            console.log('💰 Fetching fresh balance from blockchain...');
            const balance = await this.ppoContractInstance.methods.balanceOf(targetAddress).call();
            const formattedBalance = this.web3.utils.fromWei(balance, 'ether');
            
            // Update cache
            this.balanceCache.set(targetAddress, {
                balance: formattedBalance,
                timestamp: Date.now()
            });
            
            return formattedBalance;

        } catch (error) {
            console.error('❌ Error getting real balance:', error);
            return '0';
        }
    }

    async addToWallet() {
        try {
            console.log('➕ Adding PPO to wallet...');

            // Step 1: Check if MetaMask is installed
            if (!window.ethereum) {
                this.showNotification('❌ Vui lòng cài đặt MetaMask trước!', 'error');
                window.open('https://metamask.io/download/', '_blank');
                return false;
            }

            // Step 2: Check if wallet is connected
            if (!this.isConnected) {
                console.log('🔗 Wallet chưa kết nối, đang kết nối...');
                this.showNotification('🔗 Đang kết nối wallet...', 'info');
                
                const connected = await this.connectWallet();
                if (!connected) {
                    this.showNotification('❌ Không thể kết nối wallet. Vui lòng thử lại!', 'error');
                    return false;
                }
            }

            // Step 3: Check if we're on the correct network
            if (this.networkId !== this.ppoContract.chainId) {
                console.log('🔄 Sai network, đang chuyển sang BSC Testnet...');
                this.showNotification('🔄 Đang chuyển sang BSC Testnet...', 'info');
                
                const switched = await this.switchToBSC();
                if (!switched) {
                    this.showNotification('❌ Không thể chuyển network. Vui lòng thử lại!', 'error');
                    return false;
                }
            }

            // Step 4: Now we can add token to wallet
            console.log('✅ Wallet đã kết nối và network đúng, đang thêm PPO token...');
            this.showNotification('➕ Đang thêm PPO token vào wallet...', 'info');

            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: this.ppoContract.address,
                        symbol: this.ppoContract.symbol,
                        decimals: this.ppoContract.decimals,
                        image: 'https://your-domain.com/ppo-token-icon.png'
                    }
                }
            });

            if (wasAdded) {
                this.showNotification('✅ PPO token đã được thêm vào wallet thành công!', 'success');
                console.log('✅ PPO token added to wallet');
                
                // Refresh balance after adding to wallet
                setTimeout(() => {
                    this.loadRealBalance();
                }, 1000);
                
                return true;
            } else {
                this.showNotification('❌ Không thể thêm PPO token vào wallet.', 'error');
                return false;
            }

        } catch (error) {
            console.error('❌ Error adding token to wallet:', error);
            this.showNotification('❌ Lỗi khi thêm token: ' + error.message, 'error');
            return false;
        }
    }

    async switchToBSC() {
        try {
            console.log('🔄 Switching to BSC Testnet...');

            if (!window.ethereum) {
                this.showNotification('❌ MetaMask chưa được cài đặt!', 'error');
                return false;
            }

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }], // 97 in hex
            });

            console.log('✅ Switched to BSC Testnet');
            this.showNotification('✅ Đã chuyển sang BSC Testnet thành công!', 'success');
            return true;

        } catch (switchError) {
            console.log('Switch error:', switchError);
            
            if (switchError.code === 4902) {
                try {
                    console.log('🔄 Adding BSC Testnet to MetaMask...');
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x61',
                            chainName: 'BSC Testnet',
                            nativeCurrency: {
                                name: 'tBNB',
                                symbol: 'tBNB',
                                decimals: 18
                            },
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                            blockExplorerUrls: ['https://testnet.bscscan.com/']
                        }]
                    });
                    
                    console.log('✅ BSC Testnet added to MetaMask');
                    this.showNotification('✅ BSC Testnet đã được thêm vào MetaMask!', 'success');
                    return true;
                    
                } catch (addError) {
                    console.error('❌ Error adding BSC Testnet:', addError);
                    this.showNotification('❌ Không thể thêm BSC Testnet vào MetaMask.', 'error');
                    return false;
                }
            } else {
                console.error('❌ Error switching to BSC Testnet:', switchError);
                this.showNotification('❌ Không thể chuyển sang BSC Testnet.', 'error');
                return false;
            }
        }
    }

    async transferPPO(toAddress, amount) {
        try {
            if (!this.isConnected || !this.ppoContractInstance) {
                this.showNotification('Please connect your wallet first!', 'error');
                return false;
            }

            console.log(`💸 Transferring ${amount} PPO to ${toAddress}...`);

            const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether');

            const gasEstimate = await this.ppoContractInstance.methods
                .transfer(toAddress, amountInWei)
                .estimateGas({ from: this.currentAccount });

            const result = await this.ppoContractInstance.methods
                .transfer(toAddress, amountInWei)
                .send({
                    from: this.currentAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });

            console.log('✅ Transfer successful:', result.transactionHash);
            this.showNotification('PPO transfer completed successfully!', 'success');

            // Refresh balance after transfer
            setTimeout(() => {
                this.loadRealBalance();
            }, 2000);

            return result.transactionHash;

        } catch (error) {
            console.error('❌ Error transferring PPO:', error);
            this.showNotification('Failed to transfer PPO. Please try again.', 'error');
            return false;
        }
    }

    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            this.handleDisconnect();
        } else if (accounts[0] !== this.currentAccount) {
            this.currentAccount = accounts[0];
            this.updateUI();
            this.loadRealBalance();
            this.showNotification('Account changed successfully!', 'success');
        }
    }

    handleChainChanged(chainId) {
        console.log('🔄 Chain changed to:', chainId);
        window.location.reload();
    }

    handleDisconnect() {
        try {
            console.log('🔌 Wallet disconnected');
            
            // Reset all connection states
            this.isConnected = false;
            this.currentAccount = null;
            this.web3 = null;
            this.ppoContractInstance = null;
            this.networkId = null;
            
            // Clear cache
            this.balanceCache.clear();
            
            // Clear localStorage
            localStorage.removeItem('ppoBalance');
            localStorage.removeItem('ppoContractAddress');
            localStorage.removeItem('userId');
            localStorage.removeItem('userData');
            localStorage.removeItem('referralCode');
            
            // Clear sessionStorage
            sessionStorage.clear();
            
            // Update UI
            this.updateUI();
            this.showNotification('✅ Wallet đã ngắt kết nối thành công!', 'info');
            
        } catch (error) {
            console.error('❌ Error during disconnect:', error);
        }
    }

    async disconnectWallet() {
        try {
            console.log('🔌 Disconnecting wallet...');
            
            // Call handleDisconnect to clean up
            this.handleDisconnect();
            
            // If MetaMask is available, try to disconnect
            if (window.ethereum && window.ethereum.removeAllListeners) {
                window.ethereum.removeAllListeners();
            }
            
            return true;
            
        } catch (error) {
            console.error('❌ Error disconnecting wallet:', error);
            return false;
        }
    }

    showNetworkSwitchPrompt() {
        const message = `Please switch to ${this.ppoContract.networkName} to use PPO features.`;
        this.showNotification(message, 'warning');
    }

    updateUI() {
        // Update connect wallet button
        const connectBtn = document.getElementById('connectWalletBtn');
        if (connectBtn) {
            if (this.isConnected && this.currentAccount) {
                const shortAddress = `${this.currentAccount.substring(0, 6)}...${this.currentAccount.substring(38)}`;
                connectBtn.textContent = shortAddress;
                connectBtn.classList.add('connected');
            } else {
                connectBtn.textContent = 'Connect Wallet';
                connectBtn.classList.remove('connected');
            }
        }

        // Update add to wallet button
        const addBtn = document.getElementById('addToWalletBtn');
        if (addBtn) {
            addBtn.style.display = this.isConnected ? 'inline-block' : 'none';
        }

        // Update balance display
        if (!this.isConnected) {
            const balanceElements = document.querySelectorAll('.ppo-balance, .wallet-balance');
            balanceElements.forEach(element => {
                element.textContent = '0.00 PPO';
            });
        }

        this.updateNetworkStatus();
    }

    updateBalanceDisplay(balance) {
        // Update balance in various places
        const balanceElements = document.querySelectorAll('.ppo-balance, .wallet-balance');
        balanceElements.forEach(element => {
            element.textContent = `${parseFloat(balance).toFixed(2)} PPO`;
        });

        // Update in swap system if available
        if (window.PPOSwapSystem && window.PPOSwapSystem.instance) {
            window.PPOSwapSystem.instance.ppoBalance = parseFloat(balance);
            window.PPOSwapSystem.instance.updateUI();
        }
    }

    updateNetworkStatus() {
        const networkStatus = document.getElementById('networkStatus');
        if (networkStatus) {
            if (this.isConnected) {
                if (this.networkId === this.ppoContract.chainId) {
                    networkStatus.textContent = `Connected to ${this.ppoContract.networkName}`;
                    networkStatus.className = 'network-status connected';
                } else {
                    networkStatus.textContent = `Wrong network. Please switch to ${this.ppoContract.networkName}`;
                    networkStatus.className = 'network-status warning';
                }
            } else {
                networkStatus.textContent = 'Wallet not connected';
                networkStatus.className = 'network-status disconnected';
            }
        }
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

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Public methods
    getContractAddress() {
        return this.ppoContract.address;
    }

    getContractInstance() {
        return this.ppoContractInstance;
    }

    getWeb3() {
        return this.web3;
    }

    isWalletConnected() {
        return this.isConnected;
    }

    getCurrentAccount() {
        return this.currentAccount;
    }

    getNetworkInfo() {
        return {
            chainId: this.networkId,
            networkName: this.ppoContract.networkName,
            isCorrectNetwork: this.networkId === this.ppoContract.chainId
        };
    }
}

// Initialize the system
const realBlockchain = new RealBlockchainIntegration();

// Make it globally available
window.RealBlockchain = realBlockchain;
window.RealBlockchainIntegration = RealBlockchainIntegration;

// Expose functions globally
window.addToWallet = async () => {
    if (realBlockchain) {
        const result = await realBlockchain.addToWallet();
        console.log('🔄 addToWallet result:', result);
        return result;
    } else {
        console.error('❌ Real Blockchain not available');
        return false;
    }
};

window.connectWallet = async () => {
    if (realBlockchain) {
        return await realBlockchain.connectWallet();
    } else {
        console.error('❌ Real Blockchain not available');
        return false;
    }
};

window.disconnectWallet = async () => {
    if (realBlockchain) {
        return await realBlockchain.disconnectWallet();
    } else {
        console.error('❌ Real Blockchain not available');
        return false;
    }
};

window.switchToBSC = async () => {
    if (realBlockchain) {
        return await realBlockchain.switchToBSC();
    } else {
        console.error('❌ Real Blockchain not available');
        return false;
    }
};

console.log('🎯 Real Blockchain Integration ready!');
