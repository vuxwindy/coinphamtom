// Firebase Database Service - COINPAYOT NFT
// Quản lý tất cả operations với Firebase Firestore

// ========================================
// DATABASE COLLECTIONS
// ========================================
const COLLECTIONS = {
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
    ADMIN_ACTIONS: 'admin_actions'
};

// ========================================
// USER MANAGEMENT
// ========================================

// Tạo hoặc cập nhật user profile
async function createOrUpdateUser(userData) {
    try {
        const { db } = window.firebase;
        const { doc, setDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const userRef = doc(db, COLLECTIONS.USERS, userData.uid);
        await setDoc(userRef, {
            ...userData,
            updatedAt: new Date(),
            createdAt: userData.createdAt || new Date()
        }, { merge: true });
        
        return { success: true, data: userData };
    } catch (error) {
        console.error('Error creating/updating user:', error);
        return { success: false, error: error.message };
    }
}

// Lấy user profile theo UID
async function getUserProfile(uid) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const userRef = doc(db, COLLECTIONS.USERS, uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return { success: true, data: userSnap.data() };
        } else {
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
        return { success: false, error: error.message };
    }
}

// Lấy user profile theo wallet address
async function getUserByWallet(walletAddress) {
    try {
        const { db } = window.firebase;
        const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const usersRef = collection(db, COLLECTIONS.USERS);
        const q = query(usersRef, where("walletAddress", "==", walletAddress));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return { success: true, data: { id: userDoc.id, ...userDoc.data() } };
        } else {
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('Error getting user by wallet:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// TOKEN MANAGEMENT ($PPO)
// ========================================

// Lấy token balance của user
async function getTokenBalance(uid) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const tokenRef = doc(db, COLLECTIONS.TOKENS, uid);
        const tokenSnap = await getDoc(tokenRef);
        
        if (tokenSnap.exists()) {
            return { success: true, data: tokenSnap.data() };
        } else {
            // Tạo token record mới nếu chưa có
            const defaultTokenData = {
                uid: uid,
                ppoBalance: 0,
                totalEarned: 0,
                referralEarnings: 0,
                investmentEarnings: 0,
                dailyTaskEarnings: 0,
                lastUpdated: new Date()
            };
            
            await createTokenRecord(uid, defaultTokenData);
            return { success: true, data: defaultTokenData };
        }
    } catch (error) {
        console.error('Error getting token balance:', error);
        return { success: false, error: error.message };
    }
}

// Tạo token record mới
async function createTokenRecord(uid, tokenData) {
    try {
        const { db } = window.firebase;
        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const tokenRef = doc(db, COLLECTIONS.TOKENS, uid);
        await setDoc(tokenRef, {
            ...tokenData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error creating token record:', error);
        return { success: false, error: error.message };
    }
}

// Cập nhật token balance
async function updateTokenBalance(uid, amount, type = 'add') {
    try {
        const { db } = window.firebase;
        const { doc, setDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const tokenRef = doc(db, COLLECTIONS.TOKENS, uid);
        
        // Kiểm tra xem document đã tồn tại chưa
        const tokenSnap = await getDoc(tokenRef);
        
        if (tokenSnap.exists()) {
            // Document đã tồn tại, cập nhật balance
            const currentData = tokenSnap.data();
            const newBalance = (currentData.ppoBalance || 0) + (type === 'add' ? amount : -amount);
            const newTotalEarned = (currentData.totalEarned || 0) + (type === 'add' ? amount : 0);
            
            const updateData = {
                ppoBalance: newBalance,
                totalEarned: newTotalEarned,
                updatedAt: new Date()
            };
            
            // Cập nhật theo loại earnings
            switch (type) {
                case 'referral':
                    updateData.referralEarnings = (currentData.referralEarnings || 0) + amount;
                    break;
                case 'investment':
                    updateData.investmentEarnings = (currentData.investmentEarnings || 0) + amount;
                    break;
                case 'daily_task':
                    updateData.dailyTaskEarnings = (currentData.dailyTaskEarnings || 0) + amount;
                    break;
            }
            
            await setDoc(tokenRef, updateData, { merge: true });
        } else {
            // Document chưa tồn tại, tạo mới
            const newTokenData = {
                uid: uid,
                ppoBalance: type === 'add' ? amount : -amount,
                totalEarned: type === 'add' ? amount : 0,
                referralEarnings: type === 'referral' ? amount : 0,
                investmentEarnings: type === 'investment' ? amount : 0,
                dailyTaskEarnings: type === 'daily_task' ? amount : 0,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            await setDoc(tokenRef, newTokenData);
        }
        
        // Ghi log transaction
        await logTransaction(uid, {
            type: type,
            amount: amount,
            description: `${type === 'add' ? 'Added' : 'Subtracted'} ${amount} $PPO`,
            timestamp: new Date()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error updating token balance:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// USER BALANCE & PURCHASES
// ========================================

// Lấy user balance (PPO + USD)
async function getUserBalance(uid) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const tokenRef = doc(db, COLLECTIONS.TOKENS, uid);
        const tokenSnap = await getDoc(tokenRef);
        
        if (tokenSnap.exists()) {
            const tokenData = tokenSnap.data();
            return { 
                success: true, 
                data: {
                    ppoBalance: tokenData.ppoBalance || 0,
                    usdBalance: tokenData.usdBalance || 0
                }
            };
        } else {
            return { 
                success: true, 
                data: {
                    ppoBalance: 0,
                    usdBalance: 0
                }
            };
        }
    } catch (error) {
        console.error('Error getting user balance:', error);
        return { success: false, error: error.message };
    }
}

// Lấy user purchases (NFT purchases)
async function getUserPurchases(uid) {
    try {
        const { db } = window.firebase;
        const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const transactionsRef = collection(db, COLLECTIONS.TRANSACTIONS);
        const q = query(
            transactionsRef, 
            where("uid", "==", uid),
            where("type", "==", "purchase")
        );
        const querySnapshot = await getDocs(q);
        
        const purchases = [];
        querySnapshot.forEach((doc) => {
            purchases.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, data: purchases };
    } catch (error) {
        console.error('Error getting user purchases:', error);
        return { success: false, error: error.message };
    }
}

// Lấy user referrals
async function getUserReferrals(uid) {
    try {
        const { db } = window.firebase;
        const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const referralsRef = collection(db, COLLECTIONS.REFERRALS);
        const q = query(
            referralsRef, 
            where("referrerUid", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        
        const referrals = [];
        querySnapshot.forEach((doc) => {
            referrals.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, data: referrals };
    } catch (error) {
        console.error('Error getting user referrals:', error);
        return { success: false, error: error.message };
    }
}

// Lấy user check-ins
async function getUserCheckins(uid) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const taskRef = doc(db, COLLECTIONS.DAILY_TASKS, uid);
        const taskSnap = await getDoc(taskRef);
        
        if (taskSnap.exists()) {
            const taskData = taskSnap.data();
            return { 
                success: true, 
                data: {
                    streak: taskData.checkinStreak || 0,
                    lastCheckin: taskData.lastCheckin || null
                }
            };
        } else {
            return { 
                success: true, 
                data: {
                    streak: 0,
                    lastCheckin: null
                }
            };
        }
    } catch (error) {
        console.error('Error getting user checkins:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// DAILY TASKS MANAGEMENT
// ========================================

// Kiểm tra daily check-in status
async function checkDailyCheckInStatus(uid) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const taskRef = doc(db, COLLECTIONS.DAILY_TASKS, uid);
        const taskSnap = await getDoc(taskRef);
        
        if (taskSnap.exists()) {
            const taskData = taskSnap.data();
            const today = new Date().toDateString();
            const lastCheckIn = taskData.lastDailyCheckIn ? new Date(taskData.lastDailyCheckIn.toDate()).toDateString() : null;
            
            return {
                success: true,
                data: {
                    canCheckIn: lastCheckIn !== today,
                    lastCheckIn: lastCheckIn,
                    completedTasks: taskData.completedTasks || {}
                }
            };
        } else {
            return { success: true, data: { canCheckIn: true, lastCheckIn: null, completedTasks: {} } };
        }
    } catch (error) {
        console.error('Error checking daily check-in status:', error);
        return { success: false, error: error.message };
    }
}

// Thực hiện daily check-in
async function performDailyCheckIn(uid) {
    try {
        const { db } = window.firebase;
        const { doc, setDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const taskRef = doc(db, COLLECTIONS.DAILY_TASKS, uid);
        const taskSnap = await getDoc(taskRef);
        
        const today = new Date();
        const todayString = today.toDateString();
        
        let taskData = taskSnap.exists() ? taskSnap.data() : {};
        
        // Kiểm tra xem đã check-in hôm nay chưa
        if (taskData.lastDailyCheckIn) {
            const lastCheckIn = new Date(taskData.lastDailyCheckIn.toDate()).toDateString();
            if (lastCheckIn === todayString) {
                return { success: false, error: 'Already checked in today' };
            }
        }
        
        // Cập nhật daily check-in
        taskData = {
            ...taskData,
            uid: uid,
            lastDailyCheckIn: today,
            updatedAt: today
        };
        
        await setDoc(taskRef, taskData, { merge: true });
        
        // Thêm 1 $PPO cho daily check-in
        await updateTokenBalance(uid, 1, 'daily_task');
        
        return { success: true, data: taskData };
    } catch (error) {
        console.error('Error performing daily check-in:', error);
        return { success: false, error: error.message };
    }
}

// Hoàn thành task khác
async function completeTask(uid, taskType) {
    try {
        const { db } = window.firebase;
        const { doc, setDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const taskRef = doc(db, COLLECTIONS.DAILY_TASKS, uid);
        const taskSnap = await getDoc(taskRef);
        
        let taskData = taskSnap.exists() ? taskSnap.data() : {};
        
        // Kiểm tra xem task đã hoàn thành chưa
        if (taskData.completedTasks && taskData.completedTasks[taskType]) {
            return { success: false, error: 'Task already completed' };
        }
        
        // Cập nhật completed tasks
        taskData = {
            ...taskData,
            uid: uid,
            completedTasks: {
                ...taskData.completedTasks,
                [taskType]: {
                    completedAt: new Date(),
                    completed: true
                }
            },
            updatedAt: new Date()
        };
        
        await setDoc(taskRef, taskData, { merge: true });
        
        // Thêm reward theo task type
        const rewards = {
            telegramGroup: 2,
            telegramChannel: 2,
            facebookPage: 2,
            twitterFollow: 2,
            socialShare: 3
        };
        
        if (rewards[taskType]) {
            await updateTokenBalance(uid, rewards[taskType], 'daily_task');
        }
        
        return { success: true, data: taskData };
    } catch (error) {
        console.error('Error completing task:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// REFERRAL SYSTEM
// ========================================

// Tạo referral code cho user
async function generateReferralCode(uid) {
    try {
        const { db } = window.firebase;
        const { doc, setDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const referralRef = doc(db, COLLECTIONS.REFERRALS, uid);
        const referralSnap = await getDoc(referralRef);
        
        let referralData = referralSnap.exists() ? referralSnap.data() : {};
        
        // Tạo referral code nếu chưa có
        if (!referralData.referralCode) {
            referralData.referralCode = generateRandomCode();
        }
        
        referralData = {
            ...referralData,
            uid: uid,
            updatedAt: new Date()
        };
        
        await setDoc(referralRef, referralData, { merge: true });
        
        return { success: true, data: referralData };
    } catch (error) {
        console.error('Error generating referral code:', error);
        return { success: false, error: error.message };
    }
}

// Lấy referral data
async function getReferralData(uid) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const referralRef = doc(db, COLLECTIONS.REFERRALS, uid);
        const referralSnap = await getDoc(referralRef);
        
        if (referralSnap.exists()) {
            return { success: true, data: referralSnap.data() };
        } else {
            // Tạo referral data mới
            return await generateReferralCode(uid);
        }
    } catch (error) {
        console.error('Error getting referral data:', error);
        return { success: false, error: error.message };
    }
}

// Xử lý referral khi user mới đăng ký
async function processReferral(newUserUid, referralCode) {
    try {
        const { db } = window.firebase;
        const { collection, query, where, getDocs, doc, setDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        // Tìm user có referral code này
        const referralsRef = collection(db, COLLECTIONS.REFERRALS);
        const q = query(referralsRef, where("referralCode", "==", referralCode));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { success: false, error: 'Invalid referral code' };
        }
        
        const referrerDoc = querySnapshot.docs[0];
        const referrerUid = referrerDoc.id;
        
        // Cập nhật referral data của referrer
        const referrerData = referrerDoc.data();
        const referrals = referrerData.referrals || [];
        referrals.push({
            uid: newUserUid,
            joinedAt: new Date(),
            level: 1 // F1
        });
        
        await setDoc(doc(db, COLLECTIONS.REFERRALS, referrerUid), {
            ...referrerData,
            referrals: referrals,
            totalReferrals: referrals.length,
            updatedAt: new Date()
        }, { merge: true });
        
        // Cập nhật referral data của new user
        await setDoc(doc(db, COLLECTIONS.REFERRALS, newUserUid), {
            uid: newUserUid,
            referrerUid: referrerUid,
            referrerCode: referralCode,
            level: 0, // F0
            referrals: [],
            totalReferrals: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { merge: true });
        
        return { success: true, data: { referrerUid, referralCode } };
    } catch (error) {
        console.error('Error processing referral:', error);
        return { success: false, error: error.message };
    }
}

// Tính toán referral commission
async function calculateReferralCommission(uid, investmentAmount) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const referralRef = doc(db, COLLECTIONS.REFERRALS, uid);
        const referralSnap = await getDoc(referralRef);
        
        if (!referralSnap.exists()) {
            return { success: false, error: 'No referral data found' };
        }
        
        const referralData = referralSnap.data();
        const commissions = [];
        
        // Tính commission cho F1 (15%)
        if (referralData.referrerUid) {
            const f1Commission = investmentAmount * 0.15;
            commissions.push({
                level: 1,
                referrerUid: referralData.referrerUid,
                commission: f1Commission,
                percentage: 15
            });
            
            // Tính commission cho F2 (10%)
            const f1ReferralRef = doc(db, COLLECTIONS.REFERRALS, referralData.referrerUid);
            const f1ReferralSnap = await getDoc(f1ReferralRef);
            
            if (f1ReferralSnap.exists()) {
                const f1ReferralData = f1ReferralSnap.data();
                if (f1ReferralData.referrerUid) {
                    const f2Commission = investmentAmount * 0.10;
                    commissions.push({
                        level: 2,
                        referrerUid: f1ReferralData.referrerUid,
                        commission: f2Commission,
                        percentage: 10
                    });
                    
                    // Tính commission cho F3 (5%)
                    const f2ReferralRef = doc(db, COLLECTIONS.REFERRALS, f1ReferralData.referrerUid);
                    const f2ReferralSnap = await getDoc(f2ReferralRef);
                    
                    if (f2ReferralSnap.exists()) {
                        const f2ReferralData = f2ReferralSnap.data();
                        if (f2ReferralData.referrerUid) {
                            const f3Commission = investmentAmount * 0.05;
                            commissions.push({
                                level: 3,
                                referrerUid: f2ReferralData.referrerUid,
                                commission: f3Commission,
                                percentage: 5
                            });
                        }
                    }
                }
            }
        }
        
        return { success: true, data: commissions };
    } catch (error) {
        console.error('Error calculating referral commission:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// NFT INVESTMENT SYSTEM
// ========================================

// Tạo investment record
async function createInvestment(uid, investmentData) {
    try {
        const { db } = window.firebase;
        const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const investmentRef = collection(db, COLLECTIONS.INVESTMENTS);
        const investment = {
            ...investmentData,
            uid: uid,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastProfitCalculation: new Date()
        };
        
        const docRef = await addDoc(investmentRef, investment);
        
        return { success: true, data: { id: docRef.id, ...investment } };
    } catch (error) {
        console.error('Error creating investment:', error);
        return { success: false, error: error.message };
    }
}

// Lấy investments của user
async function getUserInvestments(uid) {
    try {
        const { db } = window.firebase;
        const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const investmentsRef = collection(db, COLLECTIONS.INVESTMENTS);
        const q = query(investmentsRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        
        const investments = [];
        querySnapshot.forEach((doc) => {
            investments.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, data: investments };
    } catch (error) {
        console.error('Error getting user investments:', error);
        return { success: false, error: error.message };
    }
}

// Tính toán profit hàng ngày
async function calculateDailyProfit(investmentId) {
    try {
        const { db } = window.firebase;
        const { doc, getDoc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const investmentRef = doc(db, COLLECTIONS.INVESTMENTS, investmentId);
        const investmentSnap = await getDoc(investmentRef);
        
        if (!investmentSnap.exists()) {
            return { success: false, error: 'Investment not found' };
        }
        
        const investment = investmentSnap.data();
        
        // Tính daily profit rate theo package
        let dailyRate = 0;
        switch (investment.package) {
            case 'bronze':
                dailyRate = 0.004; // 0.4%
                break;
            case 'silver':
                dailyRate = 0.005; // 0.5%
                break;
            case 'gold':
                dailyRate = 0.006; // 0.6%
                break;
            default:
                dailyRate = 0.004;
        }
        
        const dailyProfit = investment.amount * dailyRate;
        
        // Cập nhật investment với profit mới
        await updateDoc(investmentRef, {
            totalProfit: (investment.totalProfit || 0) + dailyProfit,
            lastProfitCalculation: new Date(),
            updatedAt: new Date()
        });
        
        // Thêm profit vào token balance
        await updateTokenBalance(investment.uid, dailyProfit, 'investment');
        
        return { success: true, data: { dailyProfit, totalProfit: (investment.totalProfit || 0) + dailyProfit } };
    } catch (error) {
        console.error('Error calculating daily profit:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Tạo random code
function generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Log transaction
async function logTransaction(uid, transactionData) {
    try {
        const { db } = window.firebase;
        const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
        
        const transactionRef = collection(db, COLLECTIONS.TRANSACTIONS);
        await addDoc(transactionRef, {
            uid: uid,
            ...transactionData,
            createdAt: new Date()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error logging transaction:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// EXPORT FUNCTIONS
// ========================================

// Export tất cả functions
window.firebaseService = {
    // User functions
    createOrUpdateUser,
    getUserProfile,
    getUserByWallet,
    
    // Token functions
    getTokenBalance,
    createTokenRecord,
    updateTokenBalance,
    
    // Balance & Purchases
    getUserBalance,
    getUserPurchases,
    getUserReferrals,
    getUserCheckins,
    
    // Daily tasks
    checkDailyCheckInStatus,
    performDailyCheckIn,
    completeTask,
    
    // Referral system
    generateReferralCode,
    getReferralData,
    processReferral,
    calculateReferralCommission,
    
    // Investment system
    createInvestment,
    getUserInvestments,
    calculateDailyProfit,
    
    // Utility functions
    generateRandomCode,
    logTransaction
}; 