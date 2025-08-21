// PPO Swap System - Hệ thống Swap PPO
// Quản lý nạp, rút, mua gói, đầu tư và swap tokens

console.log('💱 PPO Swap System loaded');

class PPOSwapSystem {
    constructor() {
        this.currentUser = null;
        this.ppoBalance = 0;
        this.bnbBalance = 0;
        this.exchangeRate = 0.001; // 1 PPO = 0.001 BNB
        this.slippage = 0.5; // 0.5%
        this.transactions = [];
        
        // Package prices
        this.packages = {
            starter: { ppo: 1000, price: 100, bonus: 0 },
            popular: { ppo: 5000, price: 450, bonus: 10 },
            premium: { ppo: 10000, price: 800, bonus: 20 }
        };
        
        // Investment plans
        this.investmentPlans = {
            staking: { apy: 12, minLock: 1000, lockPeriod: 30 },
            liquidity: { apy: 18, minStake: 500, reward: 'PPO + BNB' }
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Initializing PPO Swap System...');
            
            // Load user data
            await this.loadUserData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load transaction history
            await this.loadTransactionHistory();
            
            console.log('✅ PPO Swap System initialized');
        } catch (error) {
            console.error('❌ Error initializing PPO Swap System:', error);
        }
    }
    
    async loadUserData() {
        try {
            // Get current user
            this.currentUser = this.getCurrentUser();
            if (!this.currentUser) {
                console.log('⚠️ No user logged in');
                return;
            }
            
            // Load balances
            await this.loadBalances();
            
            console.log(`👤 User data loaded for: ${this.currentUser.uid}`);
        } catch (error) {
            console.error('❌ Error loading user data:', error);
        }
    }
    
    getCurrentUser() {
        try {
            // Check for connected wallet
            const connectedWallet = localStorage.getItem('connectedWallet');
            const userUid = localStorage.getItem('userUid');
            
            if (connectedWallet && userUid) {
                return {
                    uid: userUid,
                    walletAddress: connectedWallet,
                    isWalletUser: true
                };
            }
            
            // Check for Firebase user
            if (window.firebase && window.firebase.auth) {
                const firebaseUser = window.firebase.auth().currentUser;
                if (firebaseUser) {
                    return {
                        ...firebaseUser,
                        isWalletUser: false
                    };
                }
            }
            
            return null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }
    
    async loadBalances() {
        try {
            // Check if blockchain integration is available
            if (window.PPOBlockchain && window.PPOBlockchain.isWalletConnected()) {
                // Get PPO balance from blockchain
                const ppoBalance = await window.PPOBlockchain.getPPOBalance();
                this.ppoBalance = parseFloat(ppoBalance) || 0;
                
                        // Get BNB balance from blockchain
        const bnbBalance = await window.PPOBlockchain.getWeb3().eth.getBalance(window.PPOBlockchain.getCurrentAccount());
        this.bnbBalance = parseFloat(window.PPOBlockchain.getWeb3().utils.fromWei(bnbBalance, 'ether')) || 0;
        
        console.log('💰 Balances loaded from blockchain:', { ppo: this.ppoBalance, bnb: this.bnbBalance });
            } else {
                            // Fallback to simulated balances
            this.ppoBalance = parseFloat(localStorage.getItem('ppoBalance')) || 1000;
            this.bnbBalance = parseFloat(localStorage.getItem('bnbBalance')) || 0.5;
            console.log('💰 Using simulated balances:', { ppo: this.ppoBalance, bnb: this.bnbBalance });
            }
            
            // Update UI
            this.updateBalanceDisplay();
            
        } catch (error) {
            console.error('❌ Error loading balances:', error);
            // Fallback to simulated balances
            this.ppoBalance = parseFloat(localStorage.getItem('ppoBalance')) || 1000;
            this.ethBalance = parseFloat(localStorage.getItem('ethBalance')) || 0.5;
            this.updateBalanceDisplay();
        }
    }
    
    setupEventListeners() {
        // From amount input
        const fromAmountInput = document.getElementById('fromAmount');
        if (fromAmountInput) {
            fromAmountInput.addEventListener('input', (e) => {
                this.calculateSwapAmount(e.target.value);
            });
        }
        
        // Slippage options
        const slippageOptions = document.querySelectorAll('.slippage-option');
        slippageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.setSlippage(e.target.dataset.slippage);
            });
        });
    }
    
    calculateSwapAmount(fromAmount) {
        try {
            const amount = parseFloat(fromAmount) || 0;
            const toAmount = amount * this.exchangeRate;
            
            // Apply slippage
            const slippageAmount = toAmount * (this.slippage / 100);
            const finalAmount = toAmount - slippageAmount;
            
            // Update display
            const toAmountInput = document.getElementById('toAmount');
            if (toAmountInput) {
                toAmountInput.value = finalAmount.toFixed(6);
            }
            
            // Update button state
            this.updateSwapButton(amount);
            
        } catch (error) {
            console.error('❌ Error calculating swap amount:', error);
        }
    }
    
    updateSwapButton(fromAmount) {
        const swapButton = document.getElementById('swapButton');
        if (swapButton) {
            const amount = parseFloat(fromAmount) || 0;
            const hasBalance = amount <= this.ppoBalance;
            const isValidAmount = amount > 0;
            
            swapButton.disabled = !hasBalance || !isValidAmount;
            
            if (!hasBalance) {
                swapButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Insufficient Balance';
            } else if (!isValidAmount) {
                swapButton.innerHTML = '<i class="fas fa-exchange-alt"></i> Enter Amount';
            } else {
                swapButton.innerHTML = '<i class="fas fa-exchange-alt"></i> Swap PPO to BNB';
            }
        }
    }
    
    setSlippage(slippage) {
        try {
            this.slippage = parseFloat(slippage);
            
            // Update active slippage option
            const slippageOptions = document.querySelectorAll('.slippage-option');
            slippageOptions.forEach(option => {
                option.classList.remove('active');
                if (option.dataset.slippage === slippage) {
                    option.classList.add('active');
                }
            });
            
            // Update display
            const slippageDisplay = document.getElementById('slippageDisplay');
            if (slippageDisplay) {
                slippageDisplay.textContent = `${this.slippage}%`;
            }
            
            // Recalculate swap amount
            const fromAmount = document.getElementById('fromAmount').value;
            this.calculateSwapAmount(fromAmount);
            
        } catch (error) {
            console.error('❌ Error setting slippage:', error);
        }
    }
    
    async executeSwap() {
        try {
            const fromAmount = parseFloat(document.getElementById('fromAmount').value) || 0;
            const toAmount = parseFloat(document.getElementById('toAmount').value) || 0;
            
            if (fromAmount <= 0 || toAmount <= 0) {
                this.showNotification('Please enter valid amounts', 'error');
                return;
            }
            
            if (fromAmount > this.ppoBalance) {
                this.showNotification('Insufficient PPO balance', 'error');
                return;
            }
            
            // Check if blockchain integration is available
            if (window.PPOBlockchain && window.PPOBlockchain.isWalletConnected()) {
                // Execute blockchain swap
                await this.executeBlockchainSwap(fromAmount, toAmount);
            } else {
                // Execute simulated swap
                await this.executeSimulatedSwap(fromAmount, toAmount);
            }
            
        } catch (error) {
            console.error('❌ Error executing swap:', error);
            this.showNotification('Swap failed. Please try again.', 'error');
        }
    }
    
    async executeBlockchainSwap(fromAmount, toAmount) {
        try {
            this.showNotification('Processing blockchain swap...', 'info');
            
            // For now, we'll simulate the blockchain transaction
            // In a real implementation, you would interact with a DEX contract
            const transaction = {
                id: `swap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'swap',
                fromToken: 'PPO',
                toToken: 'BNB',
                fromAmount: fromAmount,
                toAmount: toAmount,
                exchangeRate: this.exchangeRate,
                slippage: this.slippage,
                status: 'pending',
                timestamp: new Date(),
                userId: this.currentUser?.uid,
                blockchain: true
            };
            
            // Simulate blockchain transaction delay
            setTimeout(async () => {
                            // Update balances
            this.ppoBalance -= fromAmount;
            this.bnbBalance += toAmount;
                
                // Update transaction status
                transaction.status = 'success';
                transaction.txHash = `0x${Math.random().toString(16).substr(2, 64)}`; // Mock transaction hash
                
                // Save transaction
                await this.saveTransaction(transaction);
                
                // Update display
                this.updateBalanceDisplay();
                this.updateTransactionHistory();
                
                // Reset form
                document.getElementById('fromAmount').value = '';
                document.getElementById('toAmount').value = '';
                
                this.showNotification(`Blockchain swap successful! TX: ${transaction.txHash.substring(0, 10)}...`, 'success');
                
            }, 3000);
            
        } catch (error) {
            console.error('❌ Error executing blockchain swap:', error);
            this.showNotification('Blockchain swap failed. Please try again.', 'error');
        }
    }
    
    async executeSimulatedSwap(fromAmount, toAmount) {
        try {
            // Create transaction
            const transaction = {
                id: `swap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'swap',
                fromToken: 'PPO',
                toToken: 'BNB',
                fromAmount: fromAmount,
                toAmount: toAmount,
                exchangeRate: this.exchangeRate,
                slippage: this.slippage,
                status: 'pending',
                timestamp: new Date(),
                userId: this.currentUser?.uid
            };
            
            // Simulate transaction processing
            this.showNotification('Processing swap transaction...', 'info');
            
            // Update balances
            this.ppoBalance -= fromAmount;
            this.bnbBalance += toAmount;
            
            // Update transaction status
            transaction.status = 'success';
            
            // Save transaction
            await this.saveTransaction(transaction);
            
            // Update display
            this.updateBalanceDisplay();
            this.updateTransactionHistory();
            
            // Reset form
            document.getElementById('fromAmount').value = '';
            document.getElementById('toAmount').value = '';
            
            this.showNotification(`Successfully swapped ${fromAmount} PPO for ${toAmount} BNB`, 'success');
            
        } catch (error) {
            console.error('❌ Error executing simulated swap:', error);
            this.showNotification('Swap failed. Please try again.', 'error');
        }
    }
    
    async executeDeposit() {
        try {
            const amount = parseFloat(document.getElementById('depositAmount').value) || 0;
            const method = document.getElementById('depositMethod').value;
            
            if (amount < 100) {
                this.showNotification('Minimum deposit is 100 PPO', 'error');
                return;
            }
            
            // Create transaction
            const transaction = {
                id: `deposit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'deposit',
                amount: amount,
                method: method,
                status: 'pending',
                timestamp: new Date(),
                userId: this.currentUser?.uid
            };
            
            // Simulate deposit processing
            this.showNotification('Processing deposit...', 'info');
            
            // Update balance after processing
            setTimeout(async () => {
                this.ppoBalance += amount;
                transaction.status = 'success';
                
                await this.saveTransaction(transaction);
                this.updateBalanceDisplay();
                this.updateTransactionHistory();
                
                this.showNotification(`Successfully deposited ${amount} PPO`, 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('depositModal'));
                if (modal) modal.hide();
                
            }, 2000);
            
        } catch (error) {
            console.error('❌ Error executing deposit:', error);
            this.showNotification('Deposit failed. Please try again.', 'error');
        }
    }
    
    async executeWithdraw() {
        try {
            const amount = parseFloat(document.getElementById('withdrawAmount').value) || 0;
            const address = document.getElementById('withdrawAddress').value;
            
            if (amount < 50) {
                this.showNotification('Minimum withdrawal is 50 PPO', 'error');
                return;
            }
            
            if (amount > this.ppoBalance) {
                this.showNotification('Insufficient PPO balance', 'error');
                return;
            }
            
            if (!address || address.length < 10) {
                this.showNotification('Please enter a valid wallet address', 'error');
                return;
            }
            
            // Calculate fee
            const fee = 5;
            const totalAmount = amount + fee;
            
            if (totalAmount > this.ppoBalance) {
                this.showNotification(`Insufficient balance. Need ${totalAmount} PPO (${amount} + ${fee} fee)`, 'error');
                return;
            }
            
            // Create transaction
            const transaction = {
                id: `withdraw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'withdraw',
                amount: amount,
                fee: fee,
                address: address,
                status: 'pending',
                timestamp: new Date(),
                userId: this.currentUser?.uid
            };
            
            // Simulate withdrawal processing
            this.showNotification('Processing withdrawal...', 'info');
            
            // Update balance after processing
            setTimeout(async () => {
                this.ppoBalance -= totalAmount;
                transaction.status = 'success';
                
                await this.saveTransaction(transaction);
                this.updateBalanceDisplay();
                this.updateTransactionHistory();
                
                this.showNotification(`Withdrawal initiated. ${amount} PPO will be sent to ${address}`, 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('withdrawModal'));
                if (modal) modal.hide();
                
            }, 3000);
            
        } catch (error) {
            console.error('❌ Error executing withdrawal:', error);
            this.showNotification('Withdrawal failed. Please try again.', 'error');
        }
    }
    
    async buyPackage(packageType) {
        try {
            const packageData = this.packages[packageType];
            if (!packageData) {
                this.showNotification('Invalid package selected', 'error');
                return;
            }
            
            // Calculate total PPO with bonus
            const bonusAmount = packageData.ppo * (packageData.bonus / 100);
            const totalPPO = packageData.ppo + bonusAmount;
            
            // Create transaction
            const transaction = {
                id: `package_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'package_purchase',
                packageType: packageType,
                amount: packageData.ppo,
                bonus: bonusAmount,
                totalPPO: totalPPO,
                price: packageData.price,
                status: 'pending',
                timestamp: new Date(),
                userId: this.currentUser?.uid
            };
            
            // Simulate package purchase
            this.showNotification('Processing package purchase...', 'info');
            
            // Update balance after processing
            setTimeout(async () => {
                this.ppoBalance += totalPPO;
                transaction.status = 'success';
                
                await this.saveTransaction(transaction);
                this.updateBalanceDisplay();
                this.updateTransactionHistory();
                
                this.showNotification(`Successfully purchased ${packageType} package. Received ${totalPPO} PPO`, 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('buyPackageModal'));
                if (modal) modal.hide();
                
            }, 2000);
            
        } catch (error) {
            console.error('❌ Error buying package:', error);
            this.showNotification('Package purchase failed. Please try again.', 'error');
        }
    }
    
    async startStaking() {
        try {
            const plan = this.investmentPlans.staking;
            
            if (this.ppoBalance < plan.minLock) {
                this.showNotification(`Minimum staking amount is ${plan.minLock} PPO`, 'error');
                return;
            }
            
            // Create staking transaction
            const transaction = {
                id: `staking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'staking_start',
                amount: plan.minLock,
                apy: plan.apy,
                lockPeriod: plan.lockPeriod,
                status: 'active',
                timestamp: new Date(),
                userId: this.currentUser?.uid
            };
            
            // Update balance
            this.ppoBalance -= plan.minLock;
            
            await this.saveTransaction(transaction);
            this.updateBalanceDisplay();
            this.updateTransactionHistory();
            
            this.showNotification(`Started staking ${plan.minLock} PPO with ${plan.apy}% APY`, 'success');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('investmentModal'));
            if (modal) modal.hide();
            
        } catch (error) {
            console.error('❌ Error starting staking:', error);
            this.showNotification('Failed to start staking. Please try again.', 'error');
        }
    }
    
    async startLiquidityMining() {
        try {
            const plan = this.investmentPlans.liquidity;
            
            if (this.ppoBalance < plan.minStake) {
                this.showNotification(`Minimum liquidity mining amount is ${plan.minStake} PPO`, 'error');
                return;
            }
            
            // Create liquidity mining transaction
            const transaction = {
                id: `liquidity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'liquidity_mining_start',
                amount: plan.minStake,
                apy: plan.apy,
                reward: plan.reward,
                status: 'active',
                timestamp: new Date(),
                userId: this.currentUser?.uid
            };
            
            // Update balance
            this.ppoBalance -= plan.minStake;
            
            await this.saveTransaction(transaction);
            this.updateBalanceDisplay();
            this.updateTransactionHistory();
            
            this.showNotification(`Started liquidity mining with ${plan.minStake} PPO. APY: ${plan.apy}%`, 'success');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('investmentModal'));
            if (modal) modal.hide();
            
        } catch (error) {
            console.error('❌ Error starting liquidity mining:', error);
            this.showNotification('Failed to start liquidity mining. Please try again.', 'error');
        }
    }
    
    async saveTransaction(transaction) {
        try {
            // Save to Firebase
            if (window.FirebaseService && this.currentUser) {
                await window.FirebaseService.saveTransaction(this.currentUser.uid, transaction);
            }
            
            // Save to localStorage
            const transactions = JSON.parse(localStorage.getItem(`transactions_${this.currentUser?.uid}`) || '[]');
            transactions.unshift(transaction);
            transactions.splice(10); // Keep only last 10 transactions
            localStorage.setItem(`transactions_${this.currentUser?.uid}`, JSON.stringify(transactions));
            
            // Update local array
            this.transactions.unshift(transaction);
            this.transactions.splice(10);
            
        } catch (error) {
            console.error('❌ Error saving transaction:', error);
        }
    }
    
    async loadTransactionHistory() {
        try {
            if (!this.currentUser) return;
            
            // Load from localStorage
            const transactions = JSON.parse(localStorage.getItem(`transactions_${this.currentUser.uid}`) || '[]');
            this.transactions = transactions;
            
            this.updateTransactionHistory();
            
        } catch (error) {
            console.error('❌ Error loading transaction history:', error);
        }
    }
    
    updateTransactionHistory() {
        const transactionList = document.getElementById('transactionList');
        if (!transactionList) return;
        
        if (this.transactions.length === 0) {
            transactionList.innerHTML = '<p class="text-muted text-center">No transactions yet</p>';
            return;
        }
        
        const transactionHTML = this.transactions.map(transaction => {
            const date = new Date(transaction.timestamp).toLocaleDateString();
            const time = new Date(transaction.timestamp).toLocaleTimeString();
            
            let description = '';
            let amount = '';
            
            switch (transaction.type) {
                case 'swap':
                    description = `Swap ${transaction.fromAmount} ${transaction.fromToken} to ${transaction.toAmount} ${transaction.toToken}`;
                    amount = `-${transaction.fromAmount} ${transaction.fromToken}`;
                    break;
                case 'deposit':
                    description = `Deposit ${transaction.amount} PPO`;
                    amount = `+${transaction.amount} PPO`;
                    break;
                case 'withdraw':
                    description = `Withdraw ${transaction.amount} PPO`;
                    amount = `-${transaction.amount} PPO`;
                    break;
                case 'package_purchase':
                    description = `Buy ${transaction.packageType} package`;
                    amount = `+${transaction.totalPPO} PPO`;
                    break;
                case 'staking_start':
                    description = `Start staking ${transaction.amount} PPO`;
                    amount = `-${transaction.amount} PPO`;
                    break;
                case 'liquidity_mining_start':
                    description = `Start liquidity mining ${transaction.amount} PPO`;
                    amount = `-${transaction.amount} PPO`;
                    break;
                default:
                    description = transaction.type;
                    amount = transaction.amount ? `${transaction.amount} PPO` : '';
            }
            
            return `
                <div class="transaction-item">
                    <div>
                        <div class="fw-bold">${description}</div>
                        <small class="text-muted">${date} ${time}</small>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold">${amount}</div>
                        <span class="transaction-status status-${transaction.status}">${transaction.status}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        transactionList.innerHTML = transactionHTML;
    }
    
    updateBalanceDisplay() {
        // Update PPO balance
        const ppoBalanceElement = document.getElementById('ppoBalance');
        if (ppoBalanceElement) {
            ppoBalanceElement.textContent = this.ppoBalance.toFixed(2);
        }
        
        // Update BNB balance
        const bnbBalanceElement = document.getElementById('bnbBalance');
        if (bnbBalanceElement) {
            bnbBalanceElement.textContent = this.bnbBalance.toFixed(4);
        }
    }
    
    // Utility functions
    setMaxAmount(type) {
        if (type === 'from') {
            const fromAmountInput = document.getElementById('fromAmount');
            if (fromAmountInput) {
                fromAmountInput.value = this.ppoBalance.toFixed(2);
                this.calculateSwapAmount(this.ppoBalance);
            }
        }
    }
    
    swapTokens() {
        // This would swap the token selection (PPO ↔ BNB)
        // For now, just recalculate the amount
        const fromAmount = document.getElementById('fromAmount').value;
        this.calculateSwapAmount(fromAmount);
    }
    
    showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`📢 ${message}`);
        }
    }
    
    // Modal functions
    showDepositModal() {
        const modal = new bootstrap.Modal(document.getElementById('depositModal'));
        modal.show();
    }
    
    showWithdrawModal() {
        const modal = new bootstrap.Modal(document.getElementById('withdrawModal'));
        modal.show();
    }
    
    showBuyPackageModal() {
        const modal = new bootstrap.Modal(document.getElementById('buyPackageModal'));
        modal.show();
    }
    
    showInvestmentModal() {
        const modal = new bootstrap.Modal(document.getElementById('investmentModal'));
        modal.show();
    }
    
    // Get current state
    getState() {
        return {
            currentUser: this.currentUser,
            ppoBalance: this.ppoBalance,
            bnbBalance: this.bnbBalance,
            exchangeRate: this.exchangeRate,
            slippage: this.slippage,
            transactions: this.transactions.length
        };
    }
}

// Export to global scope
window.PPOSwapSystem = PPOSwapSystem;

// Initialize when DOM is ready
function initializeSwapSystem() {
    console.log('🚀 Initializing PPO Swap System...');
    window.ppoSwap = new PPOSwapSystem();
}

// Global functions for HTML onclick events
window.setMaxAmount = (type) => window.ppoSwap?.setMaxAmount(type);
window.swapTokens = () => window.ppoSwap?.swapTokens();
window.executeSwap = () => window.ppoSwap?.executeSwap();
window.executeDeposit = () => window.ppoSwap?.executeDeposit();
window.executeWithdraw = () => window.ppoSwap?.executeWithdraw();
window.buyPackage = (type) => window.ppoSwap?.buyPackage(type);
window.startStaking = () => window.ppoSwap?.startStaking();
window.startLiquidityMining = () => window.ppoSwap?.startLiquidityMining();
window.showDepositModal = () => window.ppoSwap?.showDepositModal();
window.showWithdrawModal = () => window.ppoSwap?.showWithdrawModal();
window.showBuyPackageModal = () => window.ppoSwap?.showBuyPackageModal();
window.showInvestmentModal = () => window.ppoSwap?.showInvestmentModal();

console.log('✅ PPO Swap System ready');


