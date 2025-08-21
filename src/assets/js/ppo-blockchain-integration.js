// PPO Blockchain Integration System
// Integrates with PPO contract on BSC Testnet
// Handles Add to Wallet, contract interactions, and wallet management

console.log('🔗 PPO Blockchain Integration System loaded');

class PPOBlockchainIntegration {
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
            },
            {
                "anonymous": false,
                "inputs": [
                    {"indexed": true, "name": "owner", "type": "address"},
                    {"indexed": true, "name": "spender", "type": "address"},
                    {"indexed": false, "name": "value", "type": "uint256"}
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {"indexed": true, "name": "from", "type": "address"},
                    {"indexed": true, "name": "to", "type": "address"},
                    {"indexed": false, "name": "value", "type": "uint256"}
                ],
                "name": "Transfer",
                "type": "event"
            }
        ];

        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing PPO Blockchain Integration...');
            
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
            
            console.log('✅ PPO Blockchain Integration initialized');
        } catch (error) {
            console.error('❌ Error initializing PPO Blockchain Integration:', error);
        }
    }

    setupEventListeners() {
        // Add to Wallet button
        const addToWalletBtn = document.getElementById('addToWalletBtn');
        if (addToWalletBtn) {
            addToWalletBtn.addEventListener('click', () => this.addToWallet());
        }

        // Connect Wallet button
        const connectWalletBtn = document.getElementById('connectWalletBtn');
        if (connectWalletBtn) {
            connectWalletBtn.addEventListener('click', () => this.connectWallet());
        }

        // Network switch button
        const switchNetworkBtn = document.getElementById('switchNetworkBtn');
        if (switchNetworkBtn) {
            switchNetworkBtn.addEventListener('click', () => this.switchToBSC());
        }

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
            
            // Add BSC Testnet to MetaMask if not exists
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
                this.showNotification('Please install MetaMask to use this feature!', 'error');
                window.open('https://metamask.io/download/', '_blank');
                return;
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                this.showNotification('No accounts found. Please connect your wallet.', 'error');
                return;
            }

            // Initialize Web3
            this.provider = window.ethereum;
            this.web3 = new Web3(this.provider);
            this.currentAccount = accounts[0];
            this.networkId = await this.web3.eth.net.getId();

            console.log('📱 Connected account:', this.currentAccount);
            console.log('🌐 Network ID:', this.networkId);

            // Check if we're on the correct network
            if (this.networkId !== this.ppoContract.chainId) {
                console.log('⚠️ Wrong network detected. Current:', this.networkId, 'Expected:', this.ppoContract.chainId);
                this.showNetworkSwitchPrompt();
            } else {
                // Initialize contract
                await this.initializeContract();
                this.isConnected = true;
                this.updateUI();
                this.showNotification('Wallet connected successfully!', 'success');
            }

        } catch (error) {
            console.error('❌ Error connecting wallet:', error);
            if (error.code === 4001) {
                this.showNotification('User rejected wallet connection.', 'error');
            } else {
                this.showNotification('Failed to connect wallet. Please try again.', 'error');
            }
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
            
            // Load user balance
            await this.loadUserBalance();
            
        } catch (error) {
            console.error('❌ Error initializing contract:', error);
            this.showNotification('Failed to connect to PPO contract. Please check your network.', 'error');
        }
    }

    async loadUserBalance() {
        try {
            if (!this.ppoContractInstance || !this.currentAccount) return;

            const balance = await this.ppoContractInstance.methods.balanceOf(this.currentAccount).call();
            const decimals = await this.ppoContractInstance.methods.decimals().call();
            
            const formattedBalance = this.web3.utils.fromWei(balance, 'ether');
            
            console.log('💰 PPO Balance:', formattedBalance);
            
            // Update UI
            this.updateBalanceDisplay(formattedBalance);
            
            // Store in localStorage for other components
            localStorage.setItem('ppoBalance', formattedBalance);
            localStorage.setItem('ppoContractAddress', this.ppoContract.address);
            
        } catch (error) {
            console.error('❌ Error loading balance:', error);
        }
    }

    async addToWallet() {
        try {
            console.log('➕ Adding PPO to wallet...');

            if (!window.ethereum) {
                this.showNotification('Please install MetaMask to add tokens to wallet!', 'error');
                return;
            }

            // Check if wallet is connected
            if (!this.isConnected) {
                await this.connectWallet();
                return;
            }

            // Check if we're on the correct network
            if (this.networkId !== this.ppoContract.chainId) {
                this.showNotification('Please switch to BSC Testnet first!', 'error');
                await this.switchToBSC();
                return;
            }

            // Add token to wallet
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: this.ppoContract.address,
                        symbol: this.ppoContract.symbol,
                        decimals: this.ppoContract.decimals,
                        image: 'https://your-domain.com/ppo-token-icon.png' // Optional: Add your token icon
                    }
                }
            });

            if (wasAdded) {
                this.showNotification('PPO token added to wallet successfully!', 'success');
                console.log('✅ PPO token added to wallet');
            } else {
                this.showNotification('Failed to add PPO token to wallet.', 'error');
            }

        } catch (error) {
            console.error('❌ Error adding token to wallet:', error);
            this.showNotification('Failed to add token to wallet. Please try again.', 'error');
        }
    }

    async switchToBSC() {
        try {
            console.log('🔄 Switching to BSC Testnet...');

            // Check if MetaMask is available
            if (!window.ethereum) {
                this.showNotification('MetaMask is not installed. Please install MetaMask first!', 'error');
                return;
            }

            // Try to switch to BSC Testnet
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }], // 97 in hex
            });

            console.log('✅ Switched to BSC Testnet');
            this.showNotification('Switched to BSC Testnet successfully!', 'success');

            // Reconnect after network switch
            setTimeout(() => {
                this.connectWallet();
            }, 1000);

        } catch (switchError) {
            console.log('Switch error:', switchError);
            
            // This error code indicates that the chain has not been added to MetaMask
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
                    this.showNotification('BSC Testnet added to MetaMask!', 'success');
                    
                } catch (addError) {
                    console.error('❌ Error adding BSC Testnet:', addError);
                    this.showNotification('Failed to add BSC Testnet to MetaMask.', 'error');
                }
            } else {
                console.error('❌ Error switching to BSC Testnet:', switchError);
                this.showNotification('Failed to switch to BSC Testnet.', 'error');
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

            // Convert amount to wei
            const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether');

            // Estimate gas
            const gasEstimate = await this.ppoContractInstance.methods
                .transfer(toAddress, amountInWei)
                .estimateGas({ from: this.currentAccount });

            // Send transaction
            const result = await this.ppoContractInstance.methods
                .transfer(toAddress, amountInWei)
                .send({
                    from: this.currentAccount,
                    gas: Math.floor(gasEstimate * 1.2) // Add 20% buffer
                });

            console.log('✅ Transfer successful:', result.transactionHash);
            this.showNotification('PPO transfer completed successfully!', 'success');

            // Reload balance
            await this.loadUserBalance();

            return result.transactionHash;

        } catch (error) {
            console.error('❌ Error transferring PPO:', error);
            this.showNotification('Failed to transfer PPO. Please try again.', 'error');
            return false;
        }
    }

    async approvePPO(spenderAddress, amount) {
        try {
            if (!this.isConnected || !this.ppoContractInstance) {
                this.showNotification('Please connect your wallet first!', 'error');
                return false;
            }

            console.log(`✅ Approving ${amount} PPO for ${spenderAddress}...`);

            const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether');

            const result = await this.ppoContractInstance.methods
                .approve(spenderAddress, amountInWei)
                .send({ from: this.currentAccount });

            console.log('✅ Approval successful:', result.transactionHash);
            this.showNotification('PPO approval completed successfully!', 'success');

            return result.transactionHash;

        } catch (error) {
            console.error('❌ Error approving PPO:', error);
            this.showNotification('Failed to approve PPO. Please try again.', 'error');
            return false;
        }
    }

    async getPPOBalance(address = null) {
        try {
            if (!this.ppoContractInstance) return '0';

            const targetAddress = address || this.currentAccount;
            if (!targetAddress) return '0';

            const balance = await this.ppoContractInstance.methods.balanceOf(targetAddress).call();
            return this.web3.utils.fromWei(balance, 'ether');

        } catch (error) {
            console.error('❌ Error getting PPO balance:', error);
            return '0';
        }
    }
    
    async getBNBBalance(address = null) {
        try {
            if (!this.isConnected) {
                throw new Error('Wallet not connected');
            }
            
            const targetAddress = address || this.currentAccount;
            const balance = await this.web3.eth.getBalance(targetAddress);
            
            return this.web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('❌ Error getting BNB balance:', error);
            throw error;
        }
    }
    
    async transferBNB(toAddress, amount) {
        try {
            if (!this.isConnected) {
                throw new Error('Wallet not connected');
            }
            
            const amountWei = this.web3.utils.toWei(amount.toString(), 'ether');
            
            const transaction = {
                from: this.currentAccount,
                to: toAddress,
                value: amountWei,
                gas: 21000
            };
            
            const gasEstimate = await this.web3.eth.estimateGas(transaction);
            transaction.gas = gasEstimate;
            
            const result = await this.web3.eth.sendTransaction(transaction);
            
            return {
                success: true,
                hash: result.transactionHash,
                blockNumber: result.blockNumber
            };
        } catch (error) {
            console.error('❌ Error transferring BNB:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    async addPPOToWallet(userId, amount) {
        try {
            // This is a simulation for demo purposes
            // In a real implementation, this would interact with the PPO contract
            console.log(`💰 Adding ${amount} PPO to wallet for user ${userId}`);
            
            // Simulate adding PPO to user's wallet
            // In production, this would be handled by the smart contract
            return {
                success: true,
                amount: amount,
                userId: userId,
                timestamp: new Date()
            };
        } catch (error) {
            console.error('❌ Error adding PPO to wallet:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected wallet
            this.handleDisconnect();
        } else if (accounts[0] !== this.currentAccount) {
            // User switched accounts
            this.currentAccount = accounts[0];
            this.updateUI();
            this.loadUserBalance();
            this.showNotification('Account changed successfully!', 'success');
        }
    }

    handleChainChanged(chainId) {
        console.log('🔄 Chain changed to:', chainId);
        
        // Reload page to ensure everything works correctly
        window.location.reload();
    }

    handleDisconnect() {
        console.log('🔌 Wallet disconnected');
        this.isConnected = false;
        this.currentAccount = null;
        this.web3 = null;
        this.ppoContractInstance = null;
        this.updateUI();
        this.showNotification('Wallet disconnected.', 'info');
    }

    showNetworkSwitchPrompt() {
        const message = `Please switch to ${this.ppoContract.networkName} to use PPO features.`;
        this.showNotification(message, 'warning');
        
        // Show network switch button
        const switchBtn = document.getElementById('switchNetworkBtn');
        if (switchBtn) {
            switchBtn.style.display = 'inline-block';
        }
    }

    updateUI() {
        // Update connect wallet button
        const connectBtn = document.getElementById('connectWalletBtn');
        if (connectBtn) {
            if (this.isConnected) {
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

        // Update network status
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
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Public methods for other components
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
const ppoBlockchain = new PPOBlockchainIntegration();

// Make it globally available
window.PPOBlockchain = ppoBlockchain;
window.PPOBlockchainIntegration = PPOBlockchainIntegration;

// Expose addToWallet function globally
window.addToWallet = async () => {
    if (ppoBlockchain) {
        return await ppoBlockchain.addToWallet();
    } else {
        console.error('❌ PPO Blockchain not available');
        return false;
    }
};

// Expose connectWallet function globally
window.connectWallet = async () => {
    if (ppoBlockchain) {
        return await ppoBlockchain.connectWallet();
    } else {
        console.error('❌ PPO Blockchain not available');
        return false;
    }
};

// Expose switchToBSC function globally
window.switchToBSC = async () => {
    if (ppoBlockchain) {
        return await ppoBlockchain.switchToBSC();
    } else {
        console.error('❌ PPO Blockchain not available');
        return false;
    }
};

console.log('🎯 PPO Blockchain Integration ready!');
