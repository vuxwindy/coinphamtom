// System Check Script - PPO NFT Platform
// Kiểm tra toàn bộ tính năng của hệ thống

console.log('🔍 === PPO SYSTEM CHECK ===');

const SystemChecker = {
    // Check Firebase connection
    async checkFirebase() {
        console.log('🔍 Checking Firebase connection...');
        
        try {
            if (window.firebase && window.firebase.app) {
                console.log('✅ Firebase initialized');
                
                // Check Firestore
                const { db } = window.firebase;
                if (db) {
                    console.log('✅ Firestore connected');
                    return true;
                } else {
                    console.error('❌ Firestore not available');
                    return false;
                }
            } else {
                console.error('❌ Firebase not initialized');
                return false;
            }
        } catch (error) {
            console.error('❌ Firebase check failed:', error);
            return false;
        }
    },

    // Check wallet connection
    checkWallet() {
        console.log('🔍 Checking wallet connection...');
        
        const walletAddress = localStorage.getItem('walletAddress');
        const walletConnected = localStorage.getItem('walletConnected');
        
        if (walletAddress && walletConnected === 'true') {
            console.log('✅ Wallet connected:', walletAddress);
            return true;
        } else {
            console.log('❌ Wallet not connected');
            return false;
        }
    },

    // Check daily tasks system
    checkDailyTasks() {
        console.log('🔍 Checking daily tasks system...');
        
        if (window.DailyTasks) {
            console.log('✅ Daily tasks system loaded');
            
            // Check components
            const components = ['state', 'ui', 'firebase', 'utils', 'wallet'];
            const missing = components.filter(comp => !window.DailyTasks[comp]);
            
            if (missing.length === 0) {
                console.log('✅ All daily tasks components available');
                return true;
            } else {
                console.error('❌ Missing components:', missing);
                return false;
            }
        } else {
            console.error('❌ Daily tasks system not loaded');
            return false;
        }
    },

    // Check Firebase service
    checkFirebaseService() {
        console.log('🔍 Checking Firebase service...');
        
        if (window.FirebaseService) {
            console.log('✅ Firebase service loaded');
            
            // Check essential functions
            const functions = [
                'createOrUpdateUser',
                'getTokenBalance',
                'updateTokenBalance',
                'performDailyCheckIn',
                'completeTask',
                'checkDailyCheckInStatus'
            ];
            
            const missing = functions.filter(func => !window.FirebaseService[func]);
            
            if (missing.length === 0) {
                console.log('✅ All Firebase service functions available');
                return true;
            } else {
                console.error('❌ Missing functions:', missing);
                return false;
            }
        } else {
            console.error('❌ Firebase service not loaded');
            return false;
        }
    },

    // Check UI elements
    checkUIElements() {
        console.log('🔍 Checking UI elements...');
        
        const elements = [
            '.connect-wallet-btn',
            '.task-btn',
            '.available-rewards',
            '.token-balance',
            '.referral-link'
        ];
        
        const missing = elements.filter(selector => !document.querySelector(selector));
        
        if (missing.length === 0) {
            console.log('✅ All UI elements found');
            return true;
        } else {
            console.warn('⚠️ Missing UI elements:', missing);
            return false;
        }
    },

    // Check CSS variables
    checkCSSVariables() {
        console.log('🔍 Checking CSS variables...');
        
        const root = document.documentElement;
        const variables = [
            '--ppo-primary',
            '--ppo-secondary',
            '--ppo-accent',
            '--ppo-dark',
            '--ppo-gradient-primary'
        ];
        
        const missing = variables.filter(varName => 
            getComputedStyle(root).getPropertyValue(varName) === ''
        );
        
        if (missing.length === 0) {
            console.log('✅ All CSS variables defined');
            return true;
        } else {
            console.warn('⚠️ Missing CSS variables:', missing);
            return false;
        }
    },

    // Check localStorage
    checkLocalStorage() {
        console.log('🔍 Checking localStorage...');
        
        const keys = [
            'walletAddress',
            'walletConnected',
            'dailyTasksStatus',
            'referralCode'
        ];
        
        const available = keys.filter(key => localStorage.getItem(key) !== null);
        console.log('📦 Available localStorage keys:', available);
        
        return available.length > 0;
    },

    // Check page performance
    checkPerformance() {
        console.log('🔍 Checking page performance...');
        
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`⏱️ Page load time: ${loadTime}ms`);
            
            if (loadTime < 3000) {
                console.log('✅ Good performance');
                return true;
            } else {
                console.warn('⚠️ Slow page load');
                return false;
            }
        } else {
            console.warn('⚠️ Performance API not available');
            return false;
        }
    },

    // Run all checks
    async runAllChecks() {
        console.log('🚀 Starting comprehensive system check...\n');
        
        const results = {
            firebase: await this.checkFirebase(),
            wallet: this.checkWallet(),
            dailyTasks: this.checkDailyTasks(),
            firebaseService: this.checkFirebaseService(),
            uiElements: this.checkUIElements(),
            cssVariables: this.checkCSSVariables(),
            localStorage: this.checkLocalStorage(),
            performance: this.checkPerformance()
        };
        
        console.log('\n📊 === CHECK RESULTS ===');
        
        const passed = Object.values(results).filter(Boolean).length;
        const total = Object.keys(results).length;
        
        Object.entries(results).forEach(([check, result]) => {
            const status = result ? '✅' : '❌';
            console.log(`${status} ${check}: ${result ? 'PASS' : 'FAIL'}`);
        });
        
        console.log(`\n🎯 Overall: ${passed}/${total} checks passed`);
        
        if (passed === total) {
            console.log('🎉 All systems operational!');
        } else {
            console.log('⚠️ Some issues detected. Check console for details.');
        }
        
        return results;
    },

    // Quick health check
    async quickHealthCheck() {
        console.log('⚡ Quick health check...');
        
        const critical = [
            await this.checkFirebase(),
            this.checkDailyTasks(),
            this.checkFirebaseService()
        ];
        
        const allCritical = critical.every(Boolean);
        
        if (allCritical) {
            console.log('✅ System healthy');
        } else {
            console.log('❌ System issues detected');
        }
        
        return allCritical;
    }
};

// Auto-run system check after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        SystemChecker.runAllChecks();
    }, 2000); // Wait for all scripts to load
});

// Export for manual use
window.SystemChecker = SystemChecker;

console.log('✅ System checker loaded'); 