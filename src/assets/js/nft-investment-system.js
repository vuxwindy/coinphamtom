// NFT Investment System - COINPAYOT NFT
// Hệ thống đầu tư NFT với gói đồng, bạc, vàng

console.log('💎 NFT Investment System loaded');

// ========================================
// NFT INVESTMENT CONFIGURATION
// ========================================
const NFT_INVESTMENT_CONFIG = {
    // Tier levels based on total NFT value
    TIERS: {
        BRONZE: {
            name: 'Gói Đồng',
            minValue: 1000,
            maxValue: 19999,
            dailyRate: 0.05, // 5% daily PPO reward
            color: '#cd7f32',
            icon: '🥉'
        },
        SILVER: {
            name: 'Gói Bạc',
            minValue: 20000,
            maxValue: 99999,
            dailyRate: 0.08, // 8% daily PPO reward
            color: '#c0c0c0',
            icon: '🥈'
        },
        GOLD: {
            name: 'Gói Vàng',
            minValue: 100000,
            maxValue: Infinity,
            dailyRate: 0.12, // 12% daily PPO reward
            color: '#ffd700',
            icon: '🥇'
        }
    },
    
    // NFT Collection configuration
    NFT_COLLECTION: {
        LOCK_PERIOD: 24 * 30 * 24 * 60 * 60 * 1000, // 24 months in milliseconds
        CONVERSION_RATE: 1, // 1 NFT = 1 PPO (adjustable)
        MIN_PURCHASE: 100, // Minimum BNB purchase
        MAX_PURCHASE: 10000 // Maximum BNB purchase per transaction
    },
    
    // Platform wallet address
    PLATFORM_WALLET: '0xD962765700AC0F62dd627c2da0D6947Ed230dBB6',
    
    // Daily reward calculation
    DAILY_REWARDS: {
        CALCULATION_TIME: 24 * 60 * 60 * 1000, // 24 hours
        MINIMUM_REWARD: 0.1, // Minimum 0.1 PPO per day
        MAXIMUM_REWARD: 1000 // Maximum 1000 PPO per day
    }
};

// ========================================
// NFT INVESTMENT SYSTEM CLASS
// ========================================
class NFTInvestmentSystem {
    constructor() {
        this.database = null;
        this.blockchain = null;
        this.isInitialized = false;
        this.userInvestments = new Map();
        this.dailyRewards = new Map();
        this.tierCalculations = new Map();
        
        this.init();
    }
    
    async init() {
        try {
            console.log('💎 Initializing NFT Investment System...');
            
            // Wait for core systems
            await this.waitForCoreSystems();
            
            // Initialize components
            this.database = window.DatabaseCore;
            this.blockchain = window.PPOBlockchain;
            
            this.isInitialized = true;
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Start daily reward processing
            this.startDailyRewardProcessing();
            
            console.log('✅ NFT Investment System initialized');
        } catch (error) {
            console.error('❌ NFT Investment System initialization failed:', error);
            throw error;
        }
    }
    
    async waitForCoreSystems() {
        const maxWaitTime = 10000;
        const checkInterval = 100;
        let elapsed = 0;
        
        while (elapsed < maxWaitTime) {
            if (window.DatabaseCore && window.PPOBlockchain) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, checkInterval));
            elapsed += checkInterval;
        }
        
        throw new Error('Core systems not available after timeout');
    }
    
    setupEventListeners() {
        // Listen for NFT purchase events
        document.addEventListener('nft:purchased', this.handleNFTPurchase.bind(this));
        
        // Listen for wallet connection events
        document.addEventListener('wallet:connected', this.handleWalletConnected.bind(this));
        
        // Listen for daily reward events
        setInterval(() => {
            this.processDailyRewards();
        }, NFT_INVESTMENT_CONFIG.DAILY_REWARDS.CALCULATION_TIME);
    }
    
    // ========================================
    // NFT PURCHASE SYSTEM
    // ========================================
    
    async purchaseNFT(nftData) {
        try {
            console.log('💎 Processing NFT purchase...', nftData);
            
            const userId = this.getCurrentUserId();
            const bnbAmount = nftData.bnbAmount;
            const nftValue = nftData.nftValue;
            
            // Validate purchase
            const validation = await this.validateNFTPurchase(userId, bnbAmount, nftValue);
            if (!validation.success) {
                throw new Error(validation.error);
            }
            
            // Process BNB transfer to platform wallet
            const transferResult = await this.processBNBTransfer(bnbAmount);
            if (!transferResult.success) {
                throw new Error(transferResult.error);
            }
            
            // Create NFT investment record
            const investmentData = {
                userId: userId,
                nftId: this.generateNFTId(),
                nftName: nftData.nftName,
                nftValue: nftValue,
                bnbAmount: bnbAmount,
                purchaseDate: new Date(),
                lockEndDate: new Date(Date.now() + NFT_INVESTMENT_CONFIG.NFT_COLLECTION.LOCK_PERIOD),
                status: 'locked',
                tier: this.calculateTier(nftValue),
                dailyRate: this.getTierDailyRate(nftValue),
                totalPPOValue: nftValue * NFT_INVESTMENT_CONFIG.NFT_COLLECTION.CONVERSION_RATE
            };
            
            // Save to database
            const saveResult = await this.database.createNFTInvestment(investmentData);
            if (!saveResult.success) {
                throw new Error(saveResult.error);
            }
            
            // Update user tier
            await this.updateUserTier(userId);
            
            // Update UI
            this.updateInvestmentUI();
            
            // Show success notification
            this.showNotification(`NFT purchased successfully! Value: $${nftValue}`, 'success');
            
            // Emit purchase event
            this.emit('nft:purchased', investmentData);
            
            return {
                success: true,
                data: investmentData,
                message: 'NFT purchased successfully'
            };
            
        } catch (error) {
            console.error('❌ NFT purchase failed:', error);
            this.showNotification(`NFT purchase failed: ${error.message}`, 'error');
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    async validateNFTPurchase(userId, bnbAmount, nftValue) {
        // Check minimum purchase
        if (bnbAmount < NFT_INVESTMENT_CONFIG.NFT_COLLECTION.MIN_PURCHASE) {
            return {
                success: false,
                error: `Minimum purchase is ${NFT_INVESTMENT_CONFIG.NFT_COLLECTION.MIN_PURCHASE} BNB`
            };
        }
        
        // Check maximum purchase
        if (bnbAmount > NFT_INVESTMENT_CONFIG.NFT_COLLECTION.MAX_PURCHASE) {
            return {
                success: false,
                error: `Maximum purchase is ${NFT_INVESTMENT_CONFIG.NFT_COLLECTION.MAX_PURCHASE} BNB`
            };
        }
        
        // Check wallet connection
        if (!this.blockchain.isConnected()) {
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        
        // Check BNB balance
        const bnbBalance = await this.blockchain.getBNBBalance();
        if (bnbBalance < bnbAmount) {
            return {
                success: false,
                error: 'Insufficient BNB balance'
            };
        }
        
        return { success: true };
    }
    
    async processBNBTransfer(bnbAmount) {
        try {
            // Transfer BNB to platform wallet
            const transferResult = await this.blockchain.transferBNB(
                NFT_INVESTMENT_CONFIG.PLATFORM_WALLET,
                bnbAmount
            );
            
            return {
                success: true,
                transactionHash: transferResult.hash
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // ========================================
    // TIER CALCULATION SYSTEM
    // ========================================
    
    calculateTier(totalValue) {
        if (totalValue >= NFT_INVESTMENT_CONFIG.TIERS.GOLD.minValue) {
            return 'GOLD';
        } else if (totalValue >= NFT_INVESTMENT_CONFIG.TIERS.SILVER.minValue) {
            return 'SILVER';
        } else if (totalValue >= NFT_INVESTMENT_CONFIG.TIERS.BRONZE.minValue) {
            return 'BRONZE';
        } else {
            return 'NONE';
        }
    }
    
    getTierDailyRate(totalValue) {
        const tier = this.calculateTier(totalValue);
        return NFT_INVESTMENT_CONFIG.TIERS[tier]?.dailyRate || 0;
    }
    
    getTierInfo(tier) {
        return NFT_INVESTMENT_CONFIG.TIERS[tier] || null;
    }
    
    async updateUserTier(userId) {
        try {
            // Get user's total NFT value
            const userInvestments = await this.database.getUserNFTInvestments(userId);
            const totalValue = userInvestments.reduce((sum, investment) => sum + investment.nftValue, 0);
            
            // Calculate new tier
            const newTier = this.calculateTier(totalValue);
            
            // Update user tier in database
            await this.database.updateUserTier(userId, newTier, totalValue);
            
            // Update UI
            this.updateTierDisplay(newTier, totalValue);
            
        } catch (error) {
            console.error('Error updating user tier:', error);
        }
    }
    
    // ========================================
    // DAILY REWARD SYSTEM
    // ========================================
    
    async processDailyRewards() {
        try {
            console.log('💰 Processing daily rewards...');
            
            const allUsers = await this.database.getAllUsers();
            
            for (const user of allUsers) {
                await this.processUserDailyReward(user.id);
            }
            
            console.log('✅ Daily rewards processed');
        } catch (error) {
            console.error('❌ Daily reward processing failed:', error);
        }
    }
    
    async processUserDailyReward(userId) {
        try {
            // Get user's NFT investments
            const investments = await this.database.getUserNFTInvestments(userId);
            
            if (investments.length === 0) return;
            
            let totalDailyReward = 0;
            
            for (const investment of investments) {
                // Calculate daily reward for this investment
                const dailyReward = investment.nftValue * investment.dailyRate;
                totalDailyReward += dailyReward;
            }
            
            // Apply minimum and maximum limits
            totalDailyReward = Math.max(
                NFT_INVESTMENT_CONFIG.DAILY_REWARDS.MINIMUM_REWARD,
                Math.min(totalDailyReward, NFT_INVESTMENT_CONFIG.DAILY_REWARDS.MAXIMUM_REWARD)
            );
            
            // Add PPO to user's wallet
            await this.blockchain.addPPOToWallet(userId, totalDailyReward);
            
            // Update user's PPO balance in database
            await this.database.updateTokenBalance(userId, totalDailyReward, 'add');
            
            // Log reward transaction
            await this.database.logRewardTransaction({
                userId: userId,
                amount: totalDailyReward,
                type: 'daily_reward',
                date: new Date(),
                source: 'nft_investment'
            });
            
            // Update UI for this user
            this.updateUserRewardDisplay(userId, totalDailyReward);
            
        } catch (error) {
            console.error(`Error processing daily reward for user ${userId}:`, error);
        }
    }
    
    // ========================================
    // NFT CONVERSION SYSTEM (24 months)
    // ========================================
    
    async convertNFTToPPO(nftId) {
        try {
            console.log('🔄 Converting NFT to PPO...', nftId);
            
            const userId = this.getCurrentUserId();
            
            // Get NFT investment
            const investment = await this.database.getNFTInvestment(nftId);
            if (!investment) {
                throw new Error('NFT investment not found');
            }
            
            // Check if user owns this NFT
            if (investment.userId !== userId) {
                throw new Error('You do not own this NFT');
            }
            
            // Check if lock period has ended
            if (new Date() < investment.lockEndDate) {
                const remainingDays = Math.ceil((investment.lockEndDate - new Date()) / (1000 * 60 * 60 * 24));
                throw new Error(`NFT is still locked. ${remainingDays} days remaining`);
            }
            
            // Calculate PPO value
            const ppoValue = investment.totalPPOValue;
            
            // Transfer PPO to user's wallet
            await this.blockchain.addPPOToWallet(userId, ppoValue);
            
            // Update database
            await this.database.updateTokenBalance(userId, ppoValue, 'add');
            await this.database.updateNFTInvestmentStatus(nftId, 'converted');
            
            // Log conversion transaction
            await this.database.logRewardTransaction({
                userId: userId,
                amount: ppoValue,
                type: 'nft_conversion',
                date: new Date(),
                source: 'nft_investment',
                nftId: nftId
            });
            
            // Update user tier
            await this.updateUserTier(userId);
            
            // Update UI
            this.updateInvestmentUI();
            
            // Show success notification
            this.showNotification(`NFT converted to ${ppoValue} PPO successfully!`, 'success');
            
            return {
                success: true,
                ppoValue: ppoValue,
                message: 'NFT converted successfully'
            };
            
        } catch (error) {
            console.error('❌ NFT conversion failed:', error);
            this.showNotification(`NFT conversion failed: ${error.message}`, 'error');
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // ========================================
    // UI UPDATE METHODS
    // ========================================
    
    updateInvestmentUI() {
        this.updateInvestmentDisplay();
        this.updateTierDisplay();
        this.updateRewardDisplay();
    }
    
    async updateInvestmentDisplay() {
        try {
            const userId = this.getCurrentUserId();
            const investments = await this.database.getUserNFTInvestments(userId);
            
            const container = document.getElementById('nft-investment-container');
            if (!container) return;
            
            let html = '<div class="row">';
            
            investments.forEach(investment => {
                const tierInfo = this.getTierInfo(investment.tier);
                const isLocked = new Date() < investment.lockEndDate;
                const remainingDays = isLocked ? 
                    Math.ceil((investment.lockEndDate - new Date()) / (1000 * 60 * 60 * 24)) : 0;
                
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="card nft-investment-card" style="border-color: ${tierInfo?.color || '#ccc'}">
                            <div class="card-header" style="background-color: ${tierInfo?.color || '#ccc'}20">
                                <h5 class="card-title mb-0">
                                    ${tierInfo?.icon || '💎'} ${investment.nftName}
                                </h5>
                            </div>
                            <div class="card-body">
                                <p><strong>Value:</strong> $${investment.nftValue.toLocaleString()}</p>
                                <p><strong>PPO Value:</strong> ${investment.totalPPOValue} PPO</p>
                                <p><strong>Daily Rate:</strong> ${(investment.dailyRate * 100).toFixed(2)}%</p>
                                <p><strong>Purchase Date:</strong> ${new Date(investment.purchaseDate).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> 
                                    <span class="badge ${isLocked ? 'bg-warning' : 'bg-success'}">
                                        ${isLocked ? 'Locked' : 'Unlocked'}
                                    </span>
                                </p>
                                ${isLocked ? `<p><strong>Unlock in:</strong> ${remainingDays} days</p>` : ''}
                            </div>
                            <div class="card-footer">
                                ${!isLocked ? `
                                    <button class="btn btn-primary btn-sm" onclick="nftInvestmentSystem.convertNFTToPPO('${investment.nftId}')">
                                        Convert to PPO
                                    </button>
                                ` : `
                                    <button class="btn btn-secondary btn-sm" disabled>
                                        Locked
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            container.innerHTML = html;
            
        } catch (error) {
            console.error('Error updating investment display:', error);
        }
    }
    
    async updateTierDisplay(tier = null, totalValue = null) {
        try {
            if (!tier || !totalValue) {
                const userId = this.getCurrentUserId();
                const investments = await this.database.getUserNFTInvestments(userId);
                totalValue = investments.reduce((sum, investment) => sum + investment.nftValue, 0);
                tier = this.calculateTier(totalValue);
            }
            
            const tierInfo = this.getTierInfo(tier);
            const container = document.getElementById('user-tier-display');
            
            if (container && tierInfo) {
                container.innerHTML = `
                    <div class="tier-badge" style="background-color: ${tierInfo.color}20; border: 2px solid ${tierInfo.color};">
                        <h4>${tierInfo.icon} ${tierInfo.name}</h4>
                        <p>Total NFT Value: $${totalValue.toLocaleString()}</p>
                        <p>Daily Rate: ${(tierInfo.dailyRate * 100).toFixed(2)}%</p>
                    </div>
                `;
            }
            
        } catch (error) {
            console.error('Error updating tier display:', error);
        }
    }
    
    async updateRewardDisplay() {
        try {
            const userId = this.getCurrentUserId();
            const investments = await this.database.getUserNFTInvestments(userId);
            
            let totalDailyReward = 0;
            investments.forEach(investment => {
                totalDailyReward += investment.nftValue * investment.dailyRate;
            });
            
            // Apply limits
            totalDailyReward = Math.max(
                NFT_INVESTMENT_CONFIG.DAILY_REWARDS.MINIMUM_REWARD,
                Math.min(totalDailyReward, NFT_INVESTMENT_CONFIG.DAILY_REWARDS.MAXIMUM_REWARD)
            );
            
            const container = document.getElementById('daily-reward-display');
            if (container) {
                container.innerHTML = `
                    <div class="reward-info">
                        <h5>💰 Daily PPO Reward</h5>
                        <p class="reward-amount">${totalDailyReward.toFixed(2)} PPO</p>
                        <small>Next reward in: <span id="reward-countdown">24:00:00</span></small>
                    </div>
                `;
                
                // Start countdown
                this.startRewardCountdown();
            }
            
        } catch (error) {
            console.error('Error updating reward display:', error);
        }
    }
    
    startRewardCountdown() {
        const countdownElement = document.getElementById('reward-countdown');
        if (!countdownElement) return;
        
        const updateCountdown = () => {
            const now = new Date();
            const nextReward = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const timeLeft = nextReward - now;
            
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    updateUserRewardDisplay(userId, rewardAmount) {
        // Update specific user's reward display
        const userRewardElement = document.querySelector(`[data-user-id="${userId}"] .user-reward`);
        if (userRewardElement) {
            userRewardElement.textContent = `${rewardAmount.toFixed(2)} PPO`;
        }
    }
    
    // ========================================
    // UTILITY METHODS
    // ========================================
    
    getCurrentUserId() {
        return window.selectedAccount || 
               localStorage.getItem('userId') || 
               sessionStorage.getItem('userId') ||
               'anonymous';
    }
    
    generateNFTId() {
        return 'nft_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    emit(event, data) {
        const customEvent = new CustomEvent(event, { detail: data });
        window.dispatchEvent(customEvent);
    }
    
    // ========================================
    // EVENT HANDLERS
    // ========================================
    
    handleNFTPurchase(event) {
        console.log('NFT purchased event:', event.detail);
        this.updateInvestmentUI();
    }
    
    handleWalletConnected(event) {
        console.log('Wallet connected event:', event.detail);
        this.updateInvestmentUI();
    }
    
    startDailyRewardProcessing() {
        // Process rewards every 24 hours
        setInterval(() => {
            this.processDailyRewards();
        }, NFT_INVESTMENT_CONFIG.DAILY_REWARDS.CALCULATION_TIME);
    }
}

// ========================================
// INITIALIZATION
// ========================================

let nftInvestmentSystem;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('💎 Starting NFT Investment System...');
        nftInvestmentSystem = new NFTInvestmentSystem();
        window.nftInvestmentSystem = nftInvestmentSystem;
        
        // Wait for initialization
        await new Promise(resolve => {
            const checkInit = () => {
                if (nftInvestmentSystem.isInitialized) {
                    resolve();
                } else {
                    setTimeout(checkInit, 100);
                }
            };
            checkInit();
        });
        
        console.log('✅ NFT Investment System ready');
    } catch (error) {
        console.error('❌ NFT Investment System initialization failed:', error);
    }
});

// Export for global access
window.NFTInvestmentSystem = NFTInvestmentSystem;
