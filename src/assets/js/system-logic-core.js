// System Logic Core - COINPAYOT NFT
// Hệ thống logic xử lý cốt lõi với business logic tối ưu

console.log('🧠 System Logic Core loaded');

// ========================================
// SYSTEM CONFIGURATION
// ========================================
const SYSTEM_CONFIG = {
    // Game Configuration
    GAME: {
        MIN_SCORE_FOR_REWARD: 10,
        REWARD_MULTIPLIER: 0.1, // 10% of score
        MAX_DAILY_GAME_REWARDS: 100,
        BONUS_THRESHOLDS: [50, 100, 200, 500],
        BONUS_MULTIPLIERS: [1.1, 1.2, 1.5, 2.0]
    },

    // Investment Configuration
    INVESTMENT: {
        PACKAGES: {
            bronze: { minAmount: 100, dailyRate: 0.004, duration: 30 },
            silver: { minAmount: 500, dailyRate: 0.005, duration: 30 },
            gold: { minAmount: 1000, dailyRate: 0.006, duration: 30 },
            platinum: { minAmount: 5000, dailyRate: 0.008, duration: 30 }
        },
        MAX_INVESTMENT_AMOUNT: 100000,
        MIN_INVESTMENT_AMOUNT: 100
    },

    // Referral Configuration
    REFERRAL: {
        COMMISSION_RATES: {
            level1: 0.15, // 15% for F1
            level2: 0.10, // 10% for F2
            level3: 0.05  // 5% for F3
        },
        MAX_LEVELS: 3,
        MIN_COMMISSION_AMOUNT: 0.001
    },

    // Daily Tasks Configuration
    TASKS: {
        REWARDS: {
            dailyCheckIn: 1,
            telegramGroup: 2,
            telegramChannel: 2,
            facebookPage: 2,
            twitterFollow: 2,
            socialShare: 3
        },
        MAX_DAILY_TASKS: 10,
        STREAK_BONUSES: {
            7: 5,   // 7 days streak = 5 PPO bonus
            14: 15, // 14 days streak = 15 PPO bonus
            30: 50  // 30 days streak = 50 PPO bonus
        }
    },

    // NFT Configuration
    NFT: {
        RARITY_WEIGHTS: {
            common: 60,
            rare: 25,
            epic: 10,
            legendary: 5
        },
        BLINDBOX_COST: 10, // 10 PPO per blindbox
        MAX_NFTS_PER_USER: 1000
    },

    // Marketplace Configuration
    MARKETPLACE: {
        LISTING_FEE: 1, // 1 PPO per listing
        TRANSACTION_FEE: 0.02, // 2% transaction fee
        MIN_LISTING_PRICE: 0.1,
        MAX_LISTING_PRICE: 10000
    }
};

// ========================================
// SYSTEM LOGIC CORE CLASS
// ========================================
class SystemLogicCore {
    constructor() {
        this.database = null;
        this.blockchain = null;
        this.isInitialized = false;
        this.eventListeners = new Map();
        this.processingQueue = [];
        this.isProcessing = false;
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing System Logic Core...');
            
            // Wait for dependencies
            await this.waitForDependencies();
            
            // Initialize components
            this.database = window.DatabaseCore;
            this.blockchain = window.PPOBlockchain || window.PPOBlockchainIntegration;
            
            this.isInitialized = true;
            
            // Setup event system
            this.setupEventSystem();
            
            // Start processing queue
            this.startProcessingQueue();
            
            console.log('✅ System Logic Core initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing System Logic Core:', error);
            throw error;
        }
    }

    async waitForDependencies(maxWaitTime = 15000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < maxWaitTime) {
            if (window.DatabaseCore) {
                console.log('✅ DatabaseCore found, continuing with initialization');
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.warn('⚠️ Dependencies initialization timeout, continuing with available systems');
        return true;
    }

    // ========================================
    // EVENT SYSTEM
    // ========================================
    
    setupEventSystem() {
        // System events
        this.on('user:created', this.handleUserCreated.bind(this));
        this.on('user:updated', this.handleUserUpdated.bind(this));
        this.on('transaction:completed', this.handleTransactionCompleted.bind(this));
        this.on('game:completed', this.handleGameCompleted.bind(this));
        this.on('investment:created', this.handleInvestmentCreated.bind(this));
        this.on('referral:processed', this.handleReferralProcessed.bind(this));
    }

    on(event, handler) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(handler);
    }

    emit(event, data) {
        const handlers = this.eventListeners.get(event) || [];
        handlers.forEach(handler => {
            try {
                handler(data);
            } catch (error) {
                console.error(`❌ Error in event handler for ${event}:`, error);
            }
        });
    }

    // ========================================
    // PROCESSING QUEUE
    // ========================================
    
    addToQueue(operation) {
        this.processingQueue.push(operation);
        
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.isProcessing || this.processingQueue.length === 0) {
            return;
        }

        this.isProcessing = true;

        while (this.processingQueue.length > 0) {
            const operation = this.processingQueue.shift();
            
            try {
                await this.executeOperation(operation);
            } catch (error) {
                console.error('❌ Error processing operation:', error);
                // Retry logic could be added here
            }
        }

        this.isProcessing = false;
    }

    async executeOperation(operation) {
        const { type, data, callback } = operation;
        
        let result;
        
        switch (type) {
            case 'updateBalance':
                result = await this.updateUserBalance(data);
                break;
            case 'processGameReward':
                result = await this.processGameReward(data);
                break;
            case 'processInvestment':
                result = await this.processInvestment(data);
                break;
            case 'processReferral':
                result = await this.processReferral(data);
                break;
            case 'mintNFT':
                result = await this.mintNFT(data);
                break;
            default:
                throw new Error(`Unknown operation type: ${type}`);
        }
        
        if (callback) {
            callback(result);
        }
        
        return result;
    }

    startProcessingQueue() {
        setInterval(() => {
            if (this.processingQueue.length > 0 && !this.isProcessing) {
                this.processQueue();
            }
        }, 1000); // Check every second
    }

    // ========================================
    // USER MANAGEMENT LOGIC
    // ========================================
    
    async handleUserCreated(userData) {
        try {
            // Initialize user records
            await this.database.createUser(userData);
            
            // Welcome bonus
            await this.giveWelcomeBonus(userData.uid);
            
            // Setup default settings
            await this.setupUserDefaults(userData.uid);
            
            console.log(`✅ User ${userData.uid} created successfully`);
        } catch (error) {
            console.error('❌ Error handling user creation:', error);
        }
    }

    async handleUserUpdated(userData) {
        try {
            // Update user data
            await this.database.updateUser(userData.uid, userData);
            
            // Check for level ups
            await this.checkForLevelUp(userData.uid);
            
            console.log(`✅ User ${userData.uid} updated successfully`);
        } catch (error) {
            console.error('❌ Error handling user update:', error);
        }
    }

    async giveWelcomeBonus(uid) {
        try {
            const welcomeBonus = 10; // 10 PPO welcome bonus
            await this.database.updateTokenBalance(uid, welcomeBonus, 'add', 'Welcome bonus');
            
            // Log welcome bonus
            await this.database.logTransaction(uid, {
                type: 'welcome_bonus',
                amount: welcomeBonus,
                description: 'Welcome to COINPAYOT!'
            });
            
            console.log(`✅ Welcome bonus given to user ${uid}`);
        } catch (error) {
            console.error('❌ Error giving welcome bonus:', error);
        }
    }

    async setupUserDefaults(uid) {
        try {
            // Create default settings
            const settings = {
                notifications: true,
                emailUpdates: false,
                theme: 'dark',
                language: 'en'
            };
            
            // This could be stored in a separate settings collection
            console.log(`✅ Default settings set for user ${uid}`);
        } catch (error) {
            console.error('❌ Error setting up user defaults:', error);
        }
    }

    async checkForLevelUp(uid) {
        try {
            const userResult = await this.database.getUser(uid);
            if (!userResult.success) return;

            const user = userResult.data;
            const currentLevel = user.level || 0;
            
            // Level up thresholds
            const levelThresholds = [0, 100, 500, 1000, 5000, 10000];
            const newLevel = levelThresholds.findIndex(threshold => user.experience < threshold) - 1;
            
            if (newLevel > currentLevel) {
                await this.database.updateUser(uid, { level: newLevel });
                
                // Level up bonus
                const levelUpBonus = newLevel * 5; // 5 PPO per level
                await this.database.updateTokenBalance(uid, levelUpBonus, 'add', `Level ${newLevel} bonus`);
                
                console.log(`🎉 User ${uid} leveled up to ${newLevel}!`);
            }
        } catch (error) {
            console.error('❌ Error checking for level up:', error);
        }
    }

    // ========================================
    // GAME LOGIC
    // ========================================
    
    async handleGameCompleted(gameData) {
        try {
            const { uid, score, gameType } = gameData;
            
            // Calculate reward
            const reward = this.calculateGameReward(score);
            
            // Add to processing queue
            this.addToQueue({
                type: 'processGameReward',
                data: { uid, score, reward, gameType },
                callback: (result) => {
                    if (result.success) {
                        console.log(`🎮 Game reward processed for user ${uid}: ${reward} PPO`);
                    }
                }
            });
        } catch (error) {
            console.error('❌ Error handling game completion:', error);
        }
    }

    calculateGameReward(score) {
        if (score < SYSTEM_CONFIG.GAME.MIN_SCORE_FOR_REWARD) {
            return 0;
        }
        
        let reward = score * SYSTEM_CONFIG.GAME.REWARD_MULTIPLIER;
        
        // Apply bonus multipliers for high scores
        for (let i = SYSTEM_CONFIG.GAME.BONUS_THRESHOLDS.length - 1; i >= 0; i--) {
            if (score >= SYSTEM_CONFIG.GAME.BONUS_THRESHOLDS[i]) {
                reward *= SYSTEM_CONFIG.GAME.BONUS_MULTIPLIERS[i];
                break;
            }
        }
        
        // Cap daily rewards
        reward = Math.min(reward, SYSTEM_CONFIG.GAME.MAX_DAILY_GAME_REWARDS);
        
        return Math.round(reward * 1000) / 1000; // Round to 3 decimal places
    }

    async processGameReward(data) {
        try {
            const { uid, score, reward, gameType } = data;
            
            if (reward <= 0) {
                return { success: true, reward: 0 };
            }
            
            // Check daily game reward limit
            const canReceiveReward = await this.checkDailyGameRewardLimit(uid, reward);
            if (!canReceiveReward) {
                return { success: false, error: 'Daily game reward limit reached' };
            }
            
            // Update balance
            await this.database.updateTokenBalance(uid, reward, 'game', `${gameType} game reward (${score} points)`);
            
            // Log game completion
            await this.database.logTransaction(uid, {
                type: 'game_earned',
                amount: reward,
                score: score,
                gameType: gameType,
                description: `${gameType} game completed with ${score} points`
            });
            
            return { success: true, reward: reward };
        } catch (error) {
            console.error('❌ Error processing game reward:', error);
            return { success: false, error: error.message };
        }
    }

    async checkDailyGameRewardLimit(uid, newReward) {
        try {
            // Get today's game rewards
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const transactionsResult = await this.database.getTransactionHistory(uid, 100);
            if (!transactionsResult.success) return true;
            
            const todayGameRewards = transactionsResult.data
                .filter(tx => tx.type === 'game_earned' && 
                             new Date(tx.timestamp.toDate ? tx.timestamp.toDate() : tx.timestamp) >= today)
                .reduce((sum, tx) => sum + (tx.amount || 0), 0);
            
            return (todayGameRewards + newReward) <= SYSTEM_CONFIG.GAME.MAX_DAILY_GAME_REWARDS;
        } catch (error) {
            console.error('❌ Error checking daily game reward limit:', error);
            return true; // Allow if check fails
        }
    }

    // ========================================
    // INVESTMENT LOGIC
    // ========================================
    
    async handleInvestmentCreated(investmentData) {
        try {
            const { uid, amount, packageType } = investmentData;
            
            // Add to processing queue
            this.addToQueue({
                type: 'processInvestment',
                data: { uid, amount, packageType },
                callback: (result) => {
                    if (result.success) {
                        console.log(`💰 Investment processed for user ${uid}: ${amount} PPO`);
                    }
                }
            });
        } catch (error) {
            console.error('❌ Error handling investment creation:', error);
        }
    }

    async processInvestment(data) {
        try {
            const { uid, amount, packageType } = data;
            
            // Validate investment
            const validation = this.validateInvestment(amount, packageType);
            if (!validation.valid) {
                return { success: false, error: validation.error };
            }
            
            // Deduct amount from user balance
            const balanceResult = await this.database.updateTokenBalance(uid, amount, 'subtract', `Investment in ${packageType} package`);
            if (!balanceResult.success) {
                return { success: false, error: 'Insufficient balance' };
            }
            
            // Create investment record
            const investment = {
                uid: uid,
                amount: amount,
                packageType: packageType,
                dailyRate: SYSTEM_CONFIG.INVESTMENT.PACKAGES[packageType].dailyRate,
                duration: SYSTEM_CONFIG.INVESTMENT.PACKAGES[packageType].duration,
                status: 'active',
                startDate: new Date(),
                lastProfitCalculation: new Date(),
                totalProfit: 0
            };
            
            // Store investment (this would be in a separate investment collection)
            console.log(`✅ Investment created: ${amount} PPO in ${packageType} package`);
            
            // Log investment
            await this.database.logTransaction(uid, {
                type: 'investment_created',
                amount: amount,
                packageType: packageType,
                description: `Invested ${amount} PPO in ${packageType} package`
            });
            
            return { success: true, investment: investment };
        } catch (error) {
            console.error('❌ Error processing investment:', error);
            return { success: false, error: error.message };
        }
    }

    validateInvestment(amount, packageType) {
        const packageConfig = SYSTEM_CONFIG.INVESTMENT.PACKAGES[packageType];
        
        if (!packageConfig) {
            return { valid: false, error: 'Invalid package type' };
        }
        
        if (amount < packageConfig.minAmount) {
            return { valid: false, error: `Minimum investment for ${packageType} is ${packageConfig.minAmount} PPO` };
        }
        
        if (amount > SYSTEM_CONFIG.INVESTMENT.MAX_INVESTMENT_AMOUNT) {
            return { valid: false, error: `Maximum investment amount is ${SYSTEM_CONFIG.INVESTMENT.MAX_INVESTMENT_AMOUNT} PPO` };
        }
        
        return { valid: true };
    }

    // ========================================
    // REFERRAL LOGIC
    // ========================================
    
    async handleReferralProcessed(referralData) {
        try {
            const { newUserUid, referrerUid, referralCode } = referralData;
            
            // Add to processing queue
            this.addToQueue({
                type: 'processReferral',
                data: { newUserUid, referrerUid, referralCode },
                callback: (result) => {
                    if (result.success) {
                        console.log(`👥 Referral processed: ${newUserUid} referred by ${referrerUid}`);
                    }
                }
            });
        } catch (error) {
            console.error('❌ Error handling referral processing:', error);
        }
    }

    async processReferral(data) {
        try {
            const { newUserUid, referrerUid, referralCode } = data;
            
            // Process referral in database
            const result = await this.database.processReferral(newUserUid, referralCode);
            if (!result.success) {
                return result;
            }
            
            // Give referral bonus to new user
            const newUserBonus = 5; // 5 PPO for new user
            await this.database.updateTokenBalance(newUserUid, newUserBonus, 'add', 'Referral signup bonus');
            
            // Give referral bonus to referrer
            const referrerBonus = 10; // 10 PPO for referrer
            await this.database.updateTokenBalance(referrerUid, referrerBonus, 'referral', 'Referral commission');
            
            // Log transactions
            await this.database.logTransaction(newUserUid, {
                type: 'referral_bonus',
                amount: newUserBonus,
                description: 'Referral signup bonus'
            });
            
            await this.database.logTransaction(referrerUid, {
                type: 'referral_commission',
                amount: referrerBonus,
                description: `Referral commission for ${newUserUid}`
            });
            
            return { success: true, newUserBonus, referrerBonus };
        } catch (error) {
            console.error('❌ Error processing referral:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // NFT LOGIC
    // ========================================
    
    async mintNFT(data) {
        try {
            const { uid, nftData } = data;
            
            // Generate NFT based on rarity weights
            const nft = this.generateNFT();
            
            // Store NFT in database
            const nftResult = await this.database.addUserNFT(uid, nft);
            if (!nftResult.success) {
                return nftResult;
            }
            
            // Log NFT minting
            await this.database.logTransaction(uid, {
                type: 'nft_minted',
                amount: 0,
                nftId: nftResult.data.id,
                description: `Minted ${nft.name} (${nft.rarity})`
            });
            
            return { success: true, nft: nftResult.data };
        } catch (error) {
            console.error('❌ Error minting NFT:', error);
            return { success: false, error: error.message };
        }
    }

    generateNFT() {
        const rarities = Object.keys(SYSTEM_CONFIG.NFT.RARITY_WEIGHTS);
        const weights = Object.values(SYSTEM_CONFIG.NFT.RARITY_WEIGHTS);
        
        // Weighted random selection
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        let selectedRarity = rarities[0];
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                selectedRarity = rarities[i];
                break;
            }
        }
        
        // Generate NFT based on rarity
        const nft = {
            name: this.generateNFTName(selectedRarity),
            image: this.generateNFTImage(selectedRarity),
            rarity: selectedRarity,
            attributes: this.generateNFTAttributes(selectedRarity),
            source: 'blindbox'
        };
        
        return nft;
    }

    generateNFTName(rarity) {
        const names = {
            common: ['Basic Bow', 'Simple Arrow', 'Wooden Bow'],
            rare: ['Steel Bow', 'Magic Arrow', 'Enchanted Bow'],
            epic: ['Dragon Bow', 'Thunder Arrow', 'Legendary Bow'],
            legendary: ['Phoenix Bow', 'Cosmic Arrow', 'Divine Bow']
        };
        
        const rarityNames = names[rarity] || names.common;
        return rarityNames[Math.floor(Math.random() * rarityNames.length)];
    }

    generateNFTImage(rarity) {
        // This would return appropriate image URLs based on rarity
        const images = {
            common: 'images/nft-common.jpg',
            rare: 'images/nft-rare.jpg',
            epic: 'images/nft-epic.jpg',
            legendary: 'images/nft-legendary.jpg'
        };
        
        return images[rarity] || images.common;
    }

    generateNFTAttributes(rarity) {
        const baseStats = {
            common: { damage: 10, accuracy: 80, speed: 1.0 },
            rare: { damage: 20, accuracy: 85, speed: 1.2 },
            epic: { damage: 35, accuracy: 90, speed: 1.5 },
            legendary: { damage: 50, accuracy: 95, speed: 2.0 }
        };
        
        return baseStats[rarity] || baseStats.common;
    }

    // ========================================
    // TRANSACTION LOGIC
    // ========================================
    
    async handleTransactionCompleted(transactionData) {
        try {
            const { uid, type, amount, description } = transactionData;
            
            // Update user stats based on transaction type
            await this.updateUserStats(uid, type, amount);
            
            // Check for achievements
            await this.checkForAchievements(uid, type, amount);
            
            console.log(`✅ Transaction completed: ${type} for user ${uid}`);
        } catch (error) {
            console.error('❌ Error handling transaction completion:', error);
        }
    }

    async updateUserStats(uid, transactionType, amount) {
        try {
            const userResult = await this.database.getUser(uid);
            if (!userResult.success) return;

            const user = userResult.data;
            let experienceGain = 0;
            
            // Calculate experience based on transaction type
            switch (transactionType) {
                case 'game_earned':
                    experienceGain = Math.floor(amount * 10);
                    break;
                case 'investment_created':
                    experienceGain = Math.floor(amount * 0.1);
                    break;
                case 'referral_commission':
                    experienceGain = Math.floor(amount * 5);
                    break;
                case 'daily_task':
                    experienceGain = Math.floor(amount * 2);
                    break;
                default:
                    experienceGain = Math.floor(amount * 0.5);
            }
            
            if (experienceGain > 0) {
                await this.database.updateUser(uid, {
                    experience: (user.experience || 0) + experienceGain
                });
            }
        } catch (error) {
            console.error('❌ Error updating user stats:', error);
        }
    }

    async checkForAchievements(uid, transactionType, amount) {
        try {
            // This would check for various achievements
            // For now, just log the check
            console.log(`🏆 Checking achievements for user ${uid}`);
        } catch (error) {
            console.error('❌ Error checking achievements:', error);
        }
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    async updateUserBalance(uid, amount, type, description) {
        try {
            return await this.database.updateTokenBalance(uid, amount, type, description);
        } catch (error) {
            console.error('❌ Error updating user balance:', error);
            return { success: false, error: error.message };
        }
    }

    getSystemConfig() {
        return SYSTEM_CONFIG;
    }

    getQueueStatus() {
        return {
            queueLength: this.processingQueue.length,
            isProcessing: this.isProcessing
        };
    }

    clearQueue() {
        this.processingQueue = [];
        console.log('🧹 Processing queue cleared');
    }
}

// ========================================
// EXPORT AND INITIALIZATION
// ========================================

// Create global instance
let systemLogicCore;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        systemLogicCore = new SystemLogicCore();
        window.SystemLogicCore = systemLogicCore;
        console.log('✅ System Logic Core ready');
    } catch (error) {
        console.error('❌ Failed to initialize System Logic Core:', error);
    }
});

// Export for global use
window.SYSTEM_CONFIG = SYSTEM_CONFIG;
window.SystemLogicCore = SystemLogicCore;
