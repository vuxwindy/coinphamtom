// Stats Integration System
// Liên kết thống kê với các hoạt động thực tế trong game và web

console.log('📊 Stats Integration System loaded');

const StatsIntegration = {
    // User stats
    userStats: {
        // Game stats
        totalShots: 0,
        totalHits: 0,
        hitRate: 0,
        
        // PPO Balance
        ppoBalance: 0,
        
        // Game achievements
        gamesPlayed: 0,
        bestScore: 0,
        totalPlayTime: 0,
        
        // Social activities
        socialShares: 0,
        referrals: 0,
        
        // Daily activities
        dailyCheckIns: 0,
        tasksCompleted: 0,
        
        // Last updated
        lastUpdated: null
    },
    
    // Initialize stats system
    init() {
        console.log('🔄 Initializing Stats Integration...');
        
        // Load stats from localStorage
        this.loadStats();
        
        // Update stats display
        this.updateStatsDisplay();
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
        
        // Listen for game events
        this.setupGameEventListeners();
        
        // Listen for task completion events
        this.setupTaskEventListeners();
        
        console.log('✅ Stats Integration initialized');
    },
    
    // Load stats from localStorage
    loadStats() {
        const savedStats = localStorage.getItem('userStats');
        if (savedStats) {
            try {
                this.userStats = { ...this.userStats, ...JSON.parse(savedStats) };
                console.log('📦 Loaded user stats:', this.userStats);
            } catch (error) {
                console.error('❌ Error loading user stats:', error);
            }
        }
    },
    
    // Save stats to localStorage
    saveStats() {
        this.userStats.lastUpdated = new Date().toISOString();
        localStorage.setItem('userStats', JSON.stringify(this.userStats));
        console.log('💾 Saved user stats');
    },
    
    // Update stats display
    updateStatsDisplay() {
        // Update Hit Rate
        const hitRateElement = document.querySelector('.stat-item:nth-child(2) h4');
        if (hitRateElement) {
            this.userStats.hitRate = this.userStats.totalShots > 0 
                ? Math.round((this.userStats.totalHits / this.userStats.totalShots) * 100) 
                : 0;
            hitRateElement.textContent = `${this.userStats.hitRate}%`;
        }
        
        // Update PPO Balance
        const ppoBalanceElement = document.querySelector('.stat-item:nth-child(3) h4');
        if (ppoBalanceElement) {
            ppoBalanceElement.textContent = this.userStats.ppoBalance.toLocaleString();
        }
        
        // Update Mission Left (already handled by mission counter)
        
        console.log('📊 Updated stats display');
    },
    
    // Setup periodic updates
    setupPeriodicUpdates() {
        // Update stats every 30 seconds
        setInterval(() => {
            this.updateStatsDisplay();
        }, 30000);
    },
    
    // Setup game event listeners
    setupGameEventListeners() {
        // Listen for game completion events
        window.addEventListener('gameCompleted', (event) => {
            const gameData = event.detail;
            this.handleGameCompletion(gameData);
        });
        
        // Listen for shot events
        window.addEventListener('shotFired', (event) => {
            const shotData = event.detail;
            this.handleShotFired(shotData);
        });
        
        // Listen for hit events
        window.addEventListener('targetHit', (event) => {
            const hitData = event.detail;
            this.handleTargetHit(hitData);
        });
        
        // Listen for PPO earned events
        window.addEventListener('ppoEarned', (event) => {
            const ppoData = event.detail;
            this.handlePPOEarned(ppoData);
        });
    },
    
    // Setup task event listeners
    setupTaskEventListeners() {
        // Listen for task completion
        window.addEventListener('taskCompleted', (event) => {
            const taskData = event.detail;
            this.handleTaskCompletion(taskData);
        });
        
        // Listen for daily check-in
        window.addEventListener('dailyCheckIn', (event) => {
            this.handleDailyCheckIn();
        });
    },
    
    // Handle game completion
    handleGameCompletion(gameData) {
        console.log('🎮 Game completed:', gameData);
        
        this.userStats.gamesPlayed++;
        
        if (gameData.score > this.userStats.bestScore) {
            this.userStats.bestScore = gameData.score;
        }
        
        if (gameData.playTime) {
            this.userStats.totalPlayTime += gameData.playTime;
        }
        
        this.saveStats();
        this.updateStatsDisplay();
    },
    
    // Handle shot fired
    handleShotFired(shotData) {
        console.log('🎯 Shot fired:', shotData);
        
        this.userStats.totalShots++;
        
        this.saveStats();
        this.updateStatsDisplay();
    },
    
    // Handle target hit
    handleTargetHit(hitData) {
        console.log('🎯 Target hit:', hitData);
        
        this.userStats.totalHits++;
        
        this.saveStats();
        this.updateStatsDisplay();
    },
    
    // Handle PPO earned
    handlePPOEarned(ppoData) {
        console.log('💰 PPO earned:', ppoData);
        
        this.userStats.ppoBalance += ppoData.amount;
        
        this.saveStats();
        this.updateStatsDisplay();
    },
    
    // Handle task completion
    handleTaskCompletion(taskData) {
        console.log('✅ Task completed:', taskData);
        
        this.userStats.tasksCompleted++;
        
        // Don't add to PPO balance directly, let ClaimRewards handle it
        // if (taskData.reward) {
        //     this.userStats.ppoBalance += taskData.reward;
        // }
        
        this.saveStats();
        this.updateStatsDisplay();
    },
    
    // Handle daily check-in
    handleDailyCheckIn() {
        console.log('📅 Daily check-in completed');
        
        this.userStats.dailyCheckIns++;
        // Don't add to PPO balance directly, let ClaimRewards handle it
        // this.userStats.ppoBalance += 1; // Daily check-in reward
        
        this.saveStats();
        this.updateStatsDisplay();
    },
    
    // Manual stats update functions (for testing)
    
    // Add game shots
    addShots(count = 1) {
        this.userStats.totalShots += count;
        this.saveStats();
        this.updateStatsDisplay();
        console.log(`🎯 Added ${count} shots`);
    },
    
    // Add game hits
    addHits(count = 1) {
        this.userStats.totalHits += count;
        this.saveStats();
        this.updateStatsDisplay();
        console.log(`🎯 Added ${count} hits`);
    },
    
    // Add PPO balance
    addPPO(amount) {
        this.userStats.ppoBalance += amount;
        this.saveStats();
        this.updateStatsDisplay();
        console.log(`💰 Added ${amount} PPO`);
    },
    
    // Add games played
    addGamesPlayed(count = 1) {
        this.userStats.gamesPlayed += count;
        this.saveStats();
        this.updateStatsDisplay();
        console.log(`🎮 Added ${count} games played`);
    },
    
    // Add social shares
    addSocialShares(count = 1) {
        this.userStats.socialShares += count;
        this.saveStats();
        this.updateStatsDisplay();
        console.log(`📤 Added ${count} social shares`);
    },
    
    // Add referrals
    addReferrals(count = 1) {
        this.userStats.referrals += count;
        this.saveStats();
        this.updateStatsDisplay();
        console.log(`👥 Added ${count} referrals`);
    },
    
    // Reset all stats
    resetStats() {
        this.userStats = {
            totalShots: 0,
            totalHits: 0,
            hitRate: 0,
            ppoBalance: 0,
            gamesPlayed: 0,
            bestScore: 0,
            totalPlayTime: 0,
            socialShares: 0,
            referrals: 0,
            dailyCheckIns: 0,
            tasksCompleted: 0,
            lastUpdated: new Date().toISOString()
        };
        
        this.saveStats();
        this.updateStatsDisplay();
        console.log('🔄 All stats reset');
    },
    
    // Get current stats
    getStats() {
        return { ...this.userStats };
    },
    
    // Show stats in console
    showStats() {
        console.log('📊 Current User Stats:');
        console.log('- Total Shots:', this.userStats.totalShots);
        console.log('- Total Hits:', this.userStats.totalHits);
        console.log('- Hit Rate:', `${this.userStats.hitRate}%`);
        console.log('- PPO Balance:', this.userStats.ppoBalance);
        console.log('- Games Played:', this.userStats.gamesPlayed);
        console.log('- Best Score:', this.userStats.bestScore);
        console.log('- Total Play Time:', this.userStats.totalPlayTime);
        console.log('- Social Shares:', this.userStats.socialShares);
        console.log('- Referrals:', this.userStats.referrals);
        console.log('- Daily Check-ins:', this.userStats.dailyCheckIns);
        console.log('- Tasks Completed:', this.userStats.tasksCompleted);
        console.log('- Last Updated:', this.userStats.lastUpdated);
    }
};

// Export to global scope
window.StatsIntegration = StatsIntegration;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Stats Integration...');
    StatsIntegration.init();
});

// Create custom events for game integration
window.createGameEvent = (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
    console.log(`🎮 Created game event: ${eventName}`, data);
};

// Example usage functions for testing
window.testStatsIntegration = {
    // Test game completion
    testGameCompletion() {
        window.createGameEvent('gameCompleted', {
            score: Math.floor(Math.random() * 1000) + 100,
            playTime: Math.floor(Math.random() * 300) + 60,
            shots: Math.floor(Math.random() * 50) + 10,
            hits: Math.floor(Math.random() * 30) + 5
        });
    },
    
    // Test shot fired
    testShotFired() {
        window.createGameEvent('shotFired', {
            timestamp: new Date().toISOString(),
            position: { x: Math.random() * 100, y: Math.random() * 100 }
        });
    },
    
    // Test target hit
    testTargetHit() {
        window.createGameEvent('targetHit', {
            timestamp: new Date().toISOString(),
            targetType: 'standard',
            points: Math.floor(Math.random() * 100) + 10
        });
    },
    
    // Test PPO earned
    testPPOEarned() {
        const amount = Math.floor(Math.random() * 50) + 1;
        window.createGameEvent('ppoEarned', {
            amount: amount,
            source: 'game',
            timestamp: new Date().toISOString()
        });
    },
    
    // Test task completion
    testTaskCompletion() {
        window.createGameEvent('taskCompleted', {
            taskType: 'dailyCheckIn',
            reward: 1,
            timestamp: new Date().toISOString()
        });
    },
    
    // Test daily check-in
    testDailyCheckIn() {
        window.createGameEvent('dailyCheckIn', {
            timestamp: new Date().toISOString()
        });
    }
};

console.log('✅ Stats Integration System ready');
