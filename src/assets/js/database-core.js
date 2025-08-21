// Database Core System - COINPAYOT NFT
// Hệ thống database cốt lõi với logic xử lý tối ưu

console.log('🗄️ Database Core System loaded');

// ========================================
// DATABASE CONFIGURATION
// ========================================
const DB_CONFIG = {
    // Collections
    COLLECTIONS: {
        USERS: 'users',
        WALLETS: 'wallets',
        TOKENS: 'tokens',
        NFTS: 'nfts',
        REFERRALS: 'referrals',
        DAILY_TASKS: 'daily_tasks',
        INVESTMENTS: 'investments',
        TRANSACTIONS: 'transactions',
        REFERRAL_COMMISSIONS: 'referral_commissions',
        LISTINGS: 'listings',
        ADMIN_ACTIONS: 'admin_actions',
        GAME_STATS: 'game_stats',
        MARKETPLACE: 'marketplace',
        CREATORS: 'creators',
        FOLLOWS: 'follows',
        NOTIFICATIONS: 'notifications',
        SETTINGS: 'settings'
    },

    // Default values
    DEFAULTS: {
        USER: {
            ppoBalance: 0,
            usdBalance: 0,
            totalEarned: 0,
            referralEarnings: 0,
            investmentEarnings: 0,
            dailyTaskEarnings: 0,
            gameEarnings: 0,
            level: 0,
            experience: 0,
            status: 'active',
            verified: false,
            createdAt: null,
            updatedAt: null
        },
        TOKEN: {
            ppoBalance: 0,
            totalEarned: 0,
            referralEarnings: 0,
            investmentEarnings: 0,
            dailyTaskEarnings: 0,
            gameEarnings: 0,
            lastUpdated: null
        },
        TASK: {
            lastDailyCheckIn: null,
            checkinStreak: 0,
            completedTasks: {},
            totalTasksCompleted: 0,
            totalRewardsEarned: 0
        },
        REFERRAL: {
            referralCode: null,
            referrerUid: null,
            referrerCode: null,
            level: 0,
            referrals: [],
            totalReferrals: 0,
            totalCommissions: 0
        }
    },

    // Validation rules
    VALIDATION: {
        MIN_PPO_AMOUNT: 0.001,
        MAX_PPO_AMOUNT: 1000000,
        MIN_USD_AMOUNT: 0.01,
        MAX_USD_AMOUNT: 100000,
        MAX_REFERRAL_LEVEL: 3,
        MAX_DAILY_TASKS: 10,
        MAX_INVESTMENT_AMOUNT: 100000
    }
};

// ========================================
// DATABASE CORE CLASS
// ========================================
class DatabaseCore {
    constructor() {
        this.db = null;
        this.isInitialized = false;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.batchOperations = [];
        this.batchSize = 500;
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing Database Core...');
            
            // Wait for Firebase to be available
            await this.waitForFirebase();
            
            // Initialize database connection
            this.db = window.firebase.firestore();
            this.isInitialized = true;
            
            // Setup cache cleanup
            this.setupCacheCleanup();
            
            console.log('✅ Database Core initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing Database Core:', error);
            throw error;
        }
    }

    async waitForFirebase(maxWaitTime = 10000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < maxWaitTime) {
            if (window.firebase && window.firebase.db) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.warn('⚠️ Firebase initialization timeout, using fallback mode');
        // Create fallback Firebase
        window.firebase = {
            db: {
                collection: () => ({ 
                    doc: () => ({ 
                        set: () => Promise.resolve(), 
                        get: () => Promise.resolve({ exists: false, data: () => null }),
                        update: () => Promise.resolve()
                    }),
                    where: () => ({ get: () => Promise.resolve({ forEach: () => {} }) }),
                    add: () => Promise.resolve({ id: 'mock-id' })
                })
            }
        };
        return true;
    }

    setupCacheCleanup() {
        setInterval(() => {
            const now = Date.now();
            for (const [key, value] of this.cache.entries()) {
                if (now - value.timestamp > this.cacheTimeout) {
                    this.cache.delete(key);
                }
            }
        }, 60000); // Clean up every minute
    }

    // ========================================
    // CACHE MANAGEMENT
    // ========================================
    
    getCacheKey(collection, id, operation = 'get') {
        return `${collection}_${id}_${operation}`;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    getCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    clearCache(pattern = null) {
        if (pattern) {
            for (const key of this.cache.keys()) {
                if (key.includes(pattern)) {
                    this.cache.delete(key);
                }
            }
        } else {
            this.cache.clear();
        }
    }

    // ========================================
    // BATCH OPERATIONS
    // ========================================
    
    addToBatch(operation) {
        this.batchOperations.push(operation);
        
        if (this.batchOperations.length >= this.batchSize) {
            return this.executeBatch();
        }
        return Promise.resolve();
    }

    async executeBatch() {
        if (this.batchOperations.length === 0) {
            return { success: true };
        }

        try {
            const batch = this.db.batch();
            
            for (const operation of this.batchOperations) {
                const { type, ref, data } = operation;
                
                switch (type) {
                    case 'set':
                        batch.set(ref, data);
                        break;
                    case 'update':
                        batch.update(ref, data);
                        break;
                    case 'delete':
                        batch.delete(ref);
                        break;
                }
            }
            
            await batch.commit();
            this.batchOperations = [];
            
            return { success: true };
        } catch (error) {
            console.error('❌ Error executing batch:', error);
            this.batchOperations = [];
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // USER MANAGEMENT
    // ========================================
    
    async createUser(userData) {
        try {
            const userRef = this.db.collection(DB_CONFIG.COLLECTIONS.USERS).doc(userData.uid);
            
            const user = {
                ...DB_CONFIG.DEFAULTS.USER,
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            await userRef.set(user);
            
            // Create related records
            await this.createUserTokenRecord(userData.uid);
            await this.createUserTaskRecord(userData.uid);
            await this.createUserReferralRecord(userData.uid);
            
            // Clear cache
            this.clearCache(`users_${userData.uid}`);
            
            return { success: true, data: user };
        } catch (error) {
            console.error('❌ Error creating user:', error);
            return { success: false, error: error.message };
        }
    }

    async getUser(uid) {
        try {
            const cacheKey = this.getCacheKey('users', uid);
            const cached = this.getCache(cacheKey);
            if (cached) return { success: true, data: cached };

            const userRef = this.db.collection(DB_CONFIG.COLLECTIONS.USERS).doc(uid);
            const userSnap = await userRef.get();
            
            if (userSnap.exists) {
                const userData = userSnap.data();
                this.setCache(cacheKey, userData);
                return { success: true, data: userData };
            } else {
                return { success: false, error: 'User not found' };
            }
        } catch (error) {
            console.error('❌ Error getting user:', error);
            return { success: false, error: error.message };
        }
    }

    async updateUser(uid, updateData) {
        try {
            const userRef = this.db.collection(DB_CONFIG.COLLECTIONS.USERS).doc(uid);
            
            const update = {
                ...updateData,
                updatedAt: new Date()
            };
            
            await userRef.update(update);
            
            // Clear cache
            this.clearCache(`users_${uid}`);
            
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating user:', error);
            return { success: false, error: error.message };
        }
    }

    async getUserByWallet(walletAddress) {
        try {
            const cacheKey = this.getCacheKey('users_wallet', walletAddress);
            const cached = this.getCache(cacheKey);
            if (cached) return { success: true, data: cached };

            const usersRef = this.db.collection(DB_CONFIG.COLLECTIONS.USERS);
            const query = usersRef.where('walletAddress', '==', walletAddress);
            const querySnap = await query.get();
            
            if (!querySnap.empty) {
                const userDoc = querySnap.docs[0];
                const userData = { id: userDoc.id, ...userDoc.data() };
                this.setCache(cacheKey, userData);
                return { success: true, data: userData };
            } else {
                return { success: false, error: 'User not found' };
            }
        } catch (error) {
            console.error('❌ Error getting user by wallet:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // TOKEN MANAGEMENT
    // ========================================
    
    async createUserTokenRecord(uid) {
        try {
            const tokenRef = this.db.collection(DB_CONFIG.COLLECTIONS.TOKENS).doc(uid);
            
            const tokenData = {
                ...DB_CONFIG.DEFAULTS.TOKEN,
                uid: uid,
                lastUpdated: new Date()
            };
            
            await tokenRef.set(tokenData);
            return { success: true };
        } catch (error) {
            console.error('❌ Error creating token record:', error);
            return { success: false, error: error.message };
        }
    }

    async getTokenBalance(uid) {
        try {
            const cacheKey = this.getCacheKey('tokens', uid);
            const cached = this.getCache(cacheKey);
            if (cached) return { success: true, data: cached };

            const tokenRef = this.db.collection(DB_CONFIG.COLLECTIONS.TOKENS).doc(uid);
            const tokenSnap = await tokenRef.get();
            
            if (tokenSnap.exists) {
                const tokenData = tokenSnap.data();
                this.setCache(cacheKey, tokenData);
                return { success: true, data: tokenData };
            } else {
                // Create default token record
                await this.createUserTokenRecord(uid);
                const defaultData = { ...DB_CONFIG.DEFAULTS.TOKEN, uid: uid };
                this.setCache(cacheKey, defaultData);
                return { success: true, data: defaultData };
            }
        } catch (error) {
            console.error('❌ Error getting token balance:', error);
            return { success: false, error: error.message };
        }
    }

    async updateTokenBalance(uid, amount, type = 'add', description = '') {
        try {
            // Validate amount
            if (amount < DB_CONFIG.VALIDATION.MIN_PPO_AMOUNT || amount > DB_CONFIG.VALIDATION.MAX_PPO_AMOUNT) {
                return { success: false, error: 'Invalid amount' };
            }

            const tokenRef = this.db.collection(DB_CONFIG.COLLECTIONS.TOKENS).doc(uid);
            const tokenSnap = await tokenRef.get();
            
            let tokenData = tokenSnap.exists ? tokenSnap.data() : { ...DB_CONFIG.DEFAULTS.TOKEN, uid: uid };
            
            // Calculate new balance
            const currentBalance = tokenData.ppoBalance || 0;
            const newBalance = type === 'add' ? currentBalance + amount : currentBalance - amount;
            
            if (newBalance < 0) {
                return { success: false, error: 'Insufficient balance' };
            }
            
            // Update token data
            const updateData = {
                ppoBalance: newBalance,
                totalEarned: tokenData.totalEarned || 0,
                lastUpdated: new Date()
            };
            
            // Update specific earnings type
            switch (type) {
                case 'referral':
                    updateData.referralEarnings = (tokenData.referralEarnings || 0) + amount;
                    break;
                case 'investment':
                    updateData.investmentEarnings = (tokenData.investmentEarnings || 0) + amount;
                    break;
                case 'daily_task':
                    updateData.dailyTaskEarnings = (tokenData.dailyTaskEarnings || 0) + amount;
                    break;
                case 'game':
                    updateData.gameEarnings = (tokenData.gameEarnings || 0) + amount;
                    break;
            }
            
            if (type === 'add') {
                updateData.totalEarned = (tokenData.totalEarned || 0) + amount;
            }
            
            await tokenRef.set(updateData, { merge: true });
            
            // Log transaction
            await this.logTransaction(uid, {
                type: type,
                amount: amount,
                description: description || `${type === 'add' ? 'Added' : 'Subtracted'} ${amount} PPO`,
                balance: newBalance
            });
            
            // Clear cache
            this.clearCache(`tokens_${uid}`);
            
            return { success: true, data: { newBalance, updateData } };
        } catch (error) {
            console.error('❌ Error updating token balance:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // DAILY TASKS MANAGEMENT
    // ========================================
    
    async createUserTaskRecord(uid) {
        try {
            const taskRef = this.db.collection(DB_CONFIG.COLLECTIONS.DAILY_TASKS).doc(uid);
            
            const taskData = {
                ...DB_CONFIG.DEFAULTS.TASK,
                uid: uid
            };
            
            await taskRef.set(taskData);
            return { success: true };
        } catch (error) {
            console.error('❌ Error creating task record:', error);
            return { success: false, error: error.message };
        }
    }

    async getTaskStatus(uid) {
        try {
            const cacheKey = this.getCacheKey('tasks', uid);
            const cached = this.getCache(cacheKey);
            if (cached) return { success: true, data: cached };

            const taskRef = this.db.collection(DB_CONFIG.COLLECTIONS.DAILY_TASKS).doc(uid);
            const taskSnap = await taskRef.get();
            
            if (taskSnap.exists) {
                const taskData = taskSnap.data();
                this.setCache(cacheKey, taskData);
                return { success: true, data: taskData };
            } else {
                // Create default task record
                await this.createUserTaskRecord(uid);
                const defaultData = { ...DB_CONFIG.DEFAULTS.TASK, uid: uid };
                this.setCache(cacheKey, defaultData);
                return { success: true, data: defaultData };
            }
        } catch (error) {
            console.error('❌ Error getting task status:', error);
            return { success: false, error: error.message };
        }
    }

    async performDailyCheckIn(uid) {
        try {
            const taskRef = this.db.collection(DB_CONFIG.COLLECTIONS.DAILY_TASKS).doc(uid);
            const taskSnap = await taskRef.get();
            
            let taskData = taskSnap.exists ? taskSnap.data() : { ...DB_CONFIG.DEFAULTS.TASK, uid: uid };
            
            const today = new Date();
            const todayStr = today.toDateString();
            
            // Check if already checked in today
            if (taskData.lastDailyCheckIn) {
                const lastCheckIn = taskData.lastDailyCheckIn.toDate ? 
                    taskData.lastDailyCheckIn.toDate().toDateString() : 
                    new Date(taskData.lastDailyCheckIn).toDateString();
                
                if (lastCheckIn === todayStr) {
                    return { success: false, error: 'Already checked in today' };
                }
            }
            
            // Calculate streak
            let newStreak = 1;
            if (taskData.lastDailyCheckIn) {
                const lastCheckIn = taskData.lastDailyCheckIn.toDate ? 
                    taskData.lastDailyCheckIn.toDate() : 
                    new Date(taskData.lastDailyCheckIn);
                
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                
                if (lastCheckIn.toDateString() === yesterday.toDateString()) {
                    newStreak = (taskData.checkinStreak || 0) + 1;
                }
            }
            
            // Update task data
            const updateData = {
                lastDailyCheckIn: today,
                checkinStreak: newStreak,
                totalTasksCompleted: (taskData.totalTasksCompleted || 0) + 1,
                totalRewardsEarned: (taskData.totalRewardsEarned || 0) + 1,
                updatedAt: today
            };
            
            await taskRef.set(updateData, { merge: true });
            
            // Add reward
            const reward = 1; // 1 PPO for daily check-in
            await this.updateTokenBalance(uid, reward, 'daily_task', 'Daily check-in reward');
            
            // Clear cache
            this.clearCache(`tasks_${uid}`);
            
            return { success: true, data: { reward, streak: newStreak } };
        } catch (error) {
            console.error('❌ Error performing daily check-in:', error);
            return { success: false, error: error.message };
        }
    }

    async completeTask(uid, taskType) {
        try {
            const taskRef = this.db.collection(DB_CONFIG.COLLECTIONS.DAILY_TASKS).doc(uid);
            const taskSnap = await taskRef.get();
            
            let taskData = taskSnap.exists ? taskSnap.data() : { ...DB_CONFIG.DEFAULTS.TASK, uid: uid };
            
            // Check if task already completed
            if (taskData.completedTasks && taskData.completedTasks[taskType]) {
                return { success: false, error: 'Task already completed' };
            }
            
            // Define task rewards
            const taskRewards = {
                telegramGroup: 2,
                telegramChannel: 2,
                facebookPage: 2,
                twitterFollow: 2,
                socialShare: 3
            };
            
            const reward = taskRewards[taskType] || 0;
            
            // Update task data
            const updateData = {
                [`completedTasks.${taskType}`]: {
                    completed: true,
                    completedAt: new Date()
                },
                totalTasksCompleted: (taskData.totalTasksCompleted || 0) + 1,
                totalRewardsEarned: (taskData.totalRewardsEarned || 0) + reward,
                updatedAt: new Date()
            };
            
            await taskRef.set(updateData, { merge: true });
            
            // Add reward
            await this.updateTokenBalance(uid, reward, 'daily_task', `${taskType} task reward`);
            
            // Clear cache
            this.clearCache(`tasks_${uid}`);
            
            return { success: true, data: { reward } };
        } catch (error) {
            console.error('❌ Error completing task:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // REFERRAL SYSTEM
    // ========================================
    
    async createUserReferralRecord(uid) {
        try {
            const referralRef = this.db.collection(DB_CONFIG.COLLECTIONS.REFERRALS).doc(uid);
            
            const referralData = {
                ...DB_CONFIG.DEFAULTS.REFERRAL,
                uid: uid,
                referralCode: this.generateReferralCode()
            };
            
            await referralRef.set(referralData);
            return { success: true };
        } catch (error) {
            console.error('❌ Error creating referral record:', error);
            return { success: false, error: error.message };
        }
    }

    generateReferralCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async getReferralData(uid) {
        try {
            const cacheKey = this.getCacheKey('referrals', uid);
            const cached = this.getCache(cacheKey);
            if (cached) return { success: true, data: cached };

            const referralRef = this.db.collection(DB_CONFIG.COLLECTIONS.REFERRALS).doc(uid);
            const referralSnap = await referralRef.get();
            
            if (referralSnap.exists) {
                const referralData = referralSnap.data();
                this.setCache(cacheKey, referralData);
                return { success: true, data: referralData };
            } else {
                // Create default referral record
                await this.createUserReferralRecord(uid);
                const defaultData = { ...DB_CONFIG.DEFAULTS.REFERRAL, uid: uid, referralCode: this.generateReferralCode() };
                this.setCache(cacheKey, defaultData);
                return { success: true, data: defaultData };
            }
        } catch (error) {
            console.error('❌ Error getting referral data:', error);
            return { success: false, error: error.message };
        }
    }

    async processReferral(newUserUid, referralCode) {
        try {
            // Find referrer by referral code
            const referralsRef = this.db.collection(DB_CONFIG.COLLECTIONS.REFERRALS);
            const query = referralsRef.where('referralCode', '==', referralCode);
            const querySnap = await query.get();
            
            if (querySnap.empty) {
                return { success: false, error: 'Invalid referral code' };
            }
            
            const referrerDoc = querySnap.docs[0];
            const referrerUid = referrerDoc.id;
            
            if (referrerUid === newUserUid) {
                return { success: false, error: 'Cannot refer yourself' };
            }
            
            // Update referrer's data
            const referrerData = referrerDoc.data();
            const referrals = referrerData.referrals || [];
            referrals.push({
                uid: newUserUid,
                joinedAt: new Date(),
                level: 1
            });
            
            await referrerDoc.ref.update({
                referrals: referrals,
                totalReferrals: referrals.length,
                updatedAt: new Date()
            });
            
            // Update new user's referral data
            const newUserReferralRef = this.db.collection(DB_CONFIG.COLLECTIONS.REFERRALS).doc(newUserUid);
            await newUserReferralRef.update({
                referrerUid: referrerUid,
                referrerCode: referralCode,
                level: 0,
                updatedAt: new Date()
            });
            
            // Clear cache
            this.clearCache(`referrals_${referrerUid}`);
            this.clearCache(`referrals_${newUserUid}`);
            
            return { success: true, data: { referrerUid, referralCode } };
        } catch (error) {
            console.error('❌ Error processing referral:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // NFT INVESTMENT SYSTEM
    // ========================================
    
    async createNFTInvestment(investmentData) {
        try {
            const nftInvestmentsRef = this.db.collection('nft_investments');
            
            const investment = {
                ...investmentData,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const docRef = await nftInvestmentsRef.add(investment);
            
            // Clear cache
            this.clearCache(`nft_investments_${investmentData.userId}`);
            
            return { success: true, data: { id: docRef.id, ...investment } };
        } catch (error) {
            console.error('❌ Error creating NFT investment:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getUserNFTInvestments(userId) {
        try {
            const cacheKey = `nft_investments_${userId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
            
            const nftInvestmentsRef = this.db.collection('nft_investments');
            const query = nftInvestmentsRef
                .where('userId', '==', userId)
                .orderBy('purchaseDate', 'desc');
            
            const querySnap = await query.get();
            const investments = [];
            
            querySnap.forEach(doc => {
                investments.push({ id: doc.id, ...doc.data() });
            });
            
            this.setCache(cacheKey, { success: true, data: investments });
            return { success: true, data: investments };
        } catch (error) {
            console.error('❌ Error getting user NFT investments:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getNFTInvestment(nftId) {
        try {
            const nftInvestmentsRef = this.db.collection('nft_investments');
            const doc = await nftInvestmentsRef.doc(nftId).get();
            
            if (!doc.exists) {
                return { success: false, error: 'NFT investment not found' };
            }
            
            return { success: true, data: { id: doc.id, ...doc.data() } };
        } catch (error) {
            console.error('❌ Error getting NFT investment:', error);
            return { success: false, error: error.message };
        }
    }
    
    async updateNFTInvestmentStatus(nftId, status) {
        try {
            const nftInvestmentsRef = this.db.collection('nft_investments');
            await nftInvestmentsRef.doc(nftId).update({
                status: status,
                updatedAt: new Date()
            });
            
            // Clear cache
            this.clearCache(`nft_investments_${nftId}`);
            
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating NFT investment status:', error);
            return { success: false, error: error.message };
        }
    }
    
    async updateUserTier(userId, tier, totalValue) {
        try {
            const usersRef = this.db.collection(DB_CONFIG.COLLECTIONS.USERS);
            await usersRef.doc(userId).update({
                nftTier: tier,
                totalNFTValue: totalValue,
                updatedAt: new Date()
            });
            
            // Clear cache
            this.clearCache(`user_${userId}`);
            
            return { success: true };
        } catch (error) {
            console.error('❌ Error updating user tier:', error);
            return { success: false, error: error.message };
        }
    }
    
    async logRewardTransaction(transactionData) {
        try {
            const rewardTransactionsRef = this.db.collection('reward_transactions');
            
            const transaction = {
                ...transactionData,
                createdAt: new Date()
            };
            
            await rewardTransactionsRef.add(transaction);
            return { success: true };
        } catch (error) {
            console.error('❌ Error logging reward transaction:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getUserTransactions(userId, source = null) {
        try {
            const rewardTransactionsRef = this.db.collection('reward_transactions');
            let query = rewardTransactionsRef.where('userId', '==', userId);
            
            if (source) {
                query = query.where('source', '==', source);
            }
            
            query = query.orderBy('date', 'desc').limit(50);
            
            const querySnap = await query.get();
            const transactions = [];
            
            querySnap.forEach(doc => {
                transactions.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, data: transactions };
        } catch (error) {
            console.error('❌ Error getting user transactions:', error);
            return { success: false, error: error.message };
        }
    }
    
    async getAllUsers() {
        try {
            const usersRef = this.db.collection(DB_CONFIG.COLLECTIONS.USERS);
            const querySnap = await usersRef.get();
            const users = [];
            
            querySnap.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, data: users };
        } catch (error) {
            console.error('❌ Error getting all users:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // TRANSACTION LOGGING
    // ========================================
    
    async logTransaction(uid, transactionData) {
        try {
            const transactionRef = this.db.collection(DB_CONFIG.COLLECTIONS.TRANSACTIONS);
            
            const transaction = {
                uid: uid,
                ...transactionData,
                timestamp: new Date(),
                createdAt: new Date()
            };
            
            await transactionRef.add(transaction);
            return { success: true };
        } catch (error) {
            console.error('❌ Error logging transaction:', error);
            return { success: false, error: error.message };
        }
    }

    async getTransactionHistory(uid, limit = 50) {
        try {
            const transactionsRef = this.db.collection(DB_CONFIG.COLLECTIONS.TRANSACTIONS);
            const query = transactionsRef
                .where('uid', '==', uid)
                .orderBy('timestamp', 'desc')
                .limit(limit);
            
            const querySnap = await query.get();
            const transactions = [];
            
            querySnap.forEach(doc => {
                transactions.push({ id: doc.id, ...doc.data() });
            });
            
            return { success: true, data: transactions };
        } catch (error) {
            console.error('❌ Error getting transaction history:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    async executeBatch() {
        return await this.executeBatch();
    }

    clearAllCache() {
        this.cache.clear();
    }

    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// ========================================
// EXPORT AND INITIALIZATION
// ========================================

// Create global instance
let databaseCore;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        databaseCore = new DatabaseCore();
        window.DatabaseCore = databaseCore;
        console.log('✅ Database Core ready');
    } catch (error) {
        console.error('❌ Failed to initialize Database Core:', error);
    }
});

// Export for global use
window.DB_CONFIG = DB_CONFIG;
window.DatabaseCore = DatabaseCore;
