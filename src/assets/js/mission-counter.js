// Mission Counter Manager
// Quản lý counter nhiệm vụ hàng ngày trên trang chủ

console.log('🎯 Mission Counter Manager loaded');

const MissionCounter = {
    // Initialize mission counter
    init() {
        console.log('🔄 Initializing Mission Counter...');
        
        // Update counter immediately
        this.updateCounter();
        
        // Set up periodic updates
        setInterval(() => {
            this.updateCounter();
        }, 3000); // Update every 3 seconds
        
        // Listen for storage changes (when tasks are completed on other pages)
        window.addEventListener('storage', (e) => {
            if (e.key === 'dailyTasksStatus') {
                console.log('📦 Daily tasks status changed, updating counter...');
                this.updateCounter();
            }
        });
        
        console.log('✅ Mission Counter initialized');
    },
    
    // Update mission counter
    updateCounter() {
        try {
            // Get task status from localStorage
            const savedStatus = localStorage.getItem('dailyTasksStatus');
            let taskStatus = {};
            
            if (savedStatus) {
                taskStatus = JSON.parse(savedStatus);
            }
            
            // Calculate completed tasks
            const completedTasks = Object.values(taskStatus).filter(status => status === true).length;
            const totalTasks = Object.keys(taskStatus).length || 6; // Default to 6 if no tasks found
            
            console.log(`📊 Mission Progress: ${completedTasks}/${totalTasks}`);
            
            // Update mission counter
            const missionCounter = document.querySelector('.hits');
            if (missionCounter) {
                missionCounter.textContent = `${completedTasks}/${totalTasks} Daily Mission`;
            }
            
            // Update progress bar
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                progressBar.style.width = `${progressPercentage}%`;
            }
            
            // Update mission left counter
            const statItems = document.querySelectorAll('.stat-item h4');
            if (statItems.length > 0) {
                const remainingTasks = totalTasks - completedTasks;
                statItems[0].textContent = `${String(remainingTasks).padStart(2, '0')}/${String(totalTasks).padStart(2, '0')}`;
            }
            
        } catch (error) {
            console.error('❌ Error updating mission counter:', error);
        }
    },
    
    // Force update counter (can be called from other scripts)
    forceUpdate() {
        console.log('🔄 Force updating mission counter...');
        this.updateCounter();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on homepage
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        console.log('🏠 Initializing Mission Counter on homepage...');
        MissionCounter.init();
    }
});

// Export to global scope
window.MissionCounter = MissionCounter;
