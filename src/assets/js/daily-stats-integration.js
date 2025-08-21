// Daily Stats Integration System
// Liên kết tất cả các con số thống kê với daily tasks system

console.log('📊 Daily Stats Integration System loaded');

const DailyStatsIntegration = {
    // Initialize stats integration
    init() {
        console.log('🔄 Initializing Daily Stats Integration...');
        
        // Update all stats immediately
        this.updateAllStats();
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
        
        // Listen for daily tasks events
        this.setupDailyTasksEventListeners();
        
        // Listen for storage changes
        this.setupStorageEventListeners();
        
        console.log('✅ Daily Stats Integration initialized');
    },
    
    // Update all stats display
    updateAllStats() {
        this.updateMissionLeft();
        this.updateHitRate();
        this.updatePPOBalance();
        console.log('📊 All stats updated');
    },
    
    // Update Mission Left (based on daily tasks)
    updateMissionLeft() {
        try {
            // Get task status from localStorage
            const savedStatus = localStorage.getItem('dailyTasksStatus');
            let taskStatus = {};
            
            if (savedStatus) {
                taskStatus = JSON.parse(savedStatus);
            }
            
            // Calculate completed and total tasks
            const completedTasks = Object.values(taskStatus).filter(status => status === true).length;
            const totalTasks = Object.keys(taskStatus).length || 6; // Default to 6 if no tasks found
            const remainingTasks = totalTasks - completedTasks;
            
            // Update Mission Left display
            const missionLeftElement = document.querySelector('.stat-item:nth-child(1) h4');
            if (missionLeftElement) {
                missionLeftElement.textContent = `${String(remainingTasks).padStart(2, '0')}/${String(totalTasks).padStart(2, '0')}`;
            }
            
            console.log(`📋 Mission Left: ${remainingTasks}/${totalTasks}`);
            
        } catch (error) {
            console.error('❌ Error updating Mission Left:', error);
        }
    },
    
    // Update Hit Rate (based on game stats)
    updateHitRate() {
        try {
            // Get game stats from localStorage
            const savedStats = localStorage.getItem('userStats');
            let gameStats = {
                totalShots: 0,
                totalHits: 0
            };
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                gameStats = {
                    totalShots: parsedStats.totalShots || 0,
                    totalHits: parsedStats.totalHits || 0
                };
            }
            
            // Calculate hit rate
            const hitRate = gameStats.totalShots > 0 
                ? Math.round((gameStats.totalHits / gameStats.totalShots) * 100) 
                : 0;
            
            // Update Hit Rate display
            const hitRateElement = document.querySelector('.stat-item:nth-child(2) h4');
            if (hitRateElement) {
                hitRateElement.textContent = `${hitRate}%`;
            }
            
            console.log(`🎯 Hit Rate: ${hitRate}% (${gameStats.totalHits}/${gameStats.totalShots})`);
            
        } catch (error) {
            console.error('❌ Error updating Hit Rate:', error);
        }
    },
    
    // Update PPO Balance (based on claimed rewards)
    updatePPOBalance() {
        try {
            // Get PPO balance from localStorage
            const savedStats = localStorage.getItem('userStats');
            let ppoBalance = 0;
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                ppoBalance = parsedStats.ppoBalance || 0;
            }
            
            // Update PPO Balance display
            const ppoBalanceElement = document.querySelector('.stat-item:nth-child(3) h4');
            if (ppoBalanceElement) {
                ppoBalanceElement.textContent = ppoBalance.toLocaleString();
            }
            
            console.log(`💰 PPO Balance: ${ppoBalance.toLocaleString()}`);
            
        } catch (error) {
            console.error('❌ Error updating PPO Balance:', error);
        }
    },
    
    // Setup periodic updates
    setupPeriodicUpdates() {
        // Update stats every 5 seconds
        setInterval(() => {
            this.updateAllStats();
        }, 5000);
    },
    
    // Setup daily tasks event listeners
    setupDailyTasksEventListeners() {
        // Listen for task completion
        window.addEventListener('taskCompleted', (event) => {
            console.log('✅ Task completed, updating stats...');
            this.updateMissionLeft();
        });
        
        // Listen for daily check-in
        window.addEventListener('dailyCheckIn', (event) => {
            console.log('📅 Daily check-in completed, updating stats...');
            this.updateMissionLeft();
        });
        
        // Listen for rewards claimed
        window.addEventListener('rewardsClaimed', (event) => {
            console.log('🎁 Rewards claimed, updating PPO balance...');
            this.updatePPOBalance();
        });
        
        // Listen for game events
        window.addEventListener('shotFired', (event) => {
            console.log('🎯 Shot fired, updating hit rate...');
            this.updateHitRate();
        });
        
        window.addEventListener('targetHit', (event) => {
            console.log('🎯 Target hit, updating hit rate...');
            this.updateHitRate();
        });
    },
    
    // Setup storage event listeners
    setupStorageEventListeners() {
        // Listen for localStorage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'dailyTasksStatus') {
                console.log('📦 Daily tasks status changed, updating mission left...');
                this.updateMissionLeft();
            } else if (e.key === 'userStats') {
                console.log('📦 User stats changed, updating hit rate and PPO balance...');
                this.updateHitRate();
                this.updatePPOBalance();
            }
        });
    },
    
    // Manual functions for testing
    
    // Test mission left update
    testMissionLeft() {
        console.log('🧪 Testing Mission Left update...');
        this.updateMissionLeft();
    },
    
    // Test hit rate update
    testHitRate() {
        console.log('🧪 Testing Hit Rate update...');
        this.updateHitRate();
    },
    
    // Test PPO balance update
    testPPOBalance() {
        console.log('🧪 Testing PPO Balance update...');
        this.updatePPOBalance();
    },
    
    // Show current stats
    showCurrentStats() {
        console.log('📊 Current Stats:');
        
        // Mission Left
        const missionLeftElement = document.querySelector('.stat-item:nth-child(1) h4');
        if (missionLeftElement) {
            console.log('- Mission Left Display:', missionLeftElement.textContent);
        }
        
        // Hit Rate
        const hitRateElement = document.querySelector('.stat-item:nth-child(2) h4');
        if (hitRateElement) {
            console.log('- Hit Rate Display:', hitRateElement.textContent);
        }
        
        // PPO Balance
        const ppoBalanceElement = document.querySelector('.stat-item:nth-child(3) h4');
        if (ppoBalanceElement) {
            console.log('- PPO Balance Display:', ppoBalanceElement.textContent);
        }
        
        // Raw data
        const savedStatus = localStorage.getItem('dailyTasksStatus');
        const savedStats = localStorage.getItem('userStats');
        
        console.log('- Raw Daily Tasks Status:', savedStatus);
        console.log('- Raw User Stats:', savedStats);
    },
    
    // Force update all stats
    forceUpdateAll() {
        console.log('🔄 Force updating all stats...');
        this.updateAllStats();
    }
};

// Export to global scope
window.DailyStatsIntegration = DailyStatsIntegration;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Daily Stats Integration...');
    DailyStatsIntegration.init();
});

console.log('✅ Daily Stats Integration System ready');
