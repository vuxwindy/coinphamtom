// Test Menu Script
console.log('🧪 Test Menu Script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧪 DOM ready, testing menu...');
    
    // Check if menu container exists
    const menuContainer = document.getElementById('optimizedMenu');
    if (menuContainer) {
        console.log('✅ Menu container found:', menuContainer);
        
        // Add test menu items
        const testItems = [
            { name: 'Home', url: 'index.html', icon: 'fas fa-home' },
            { name: 'Games', url: 'game.html', icon: 'fas fa-gamepad' },
            { name: 'Dashboard', url: 'dashboard.html', icon: 'fas fa-chart-line' },
            { name: 'Swap', url: 'swap.html', icon: 'fas fa-exchange-alt' },
            { name: 'NFT Market', url: 'marketplace.html', icon: 'fas fa-store' },
            { name: 'Collection', url: 'collection.html', icon: 'fas fa-images' },
            { name: 'BlindBox', url: 'blindbox.html', icon: 'fas fa-gift' },
            { name: 'Investment', url: 'investment.html', icon: 'fas fa-chart-line' },
            { name: 'NFT Investment', url: 'nft-investment.html', icon: 'fas fa-gem' },
            { name: 'Referral', url: 'referral.html', icon: 'fas fa-users' },
            { name: 'Profile', url: 'profile.html', icon: 'fas fa-user' },
            { name: 'Whitepaper', url: 'whitepaper.html', icon: 'fas fa-file-alt' },
            { name: 'Daily Tasks', url: 'tasks-section.html', icon: 'fas fa-tasks' }
        ];
        
        menuContainer.innerHTML = '';
        
        testItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'menu-item';
            
            const link = document.createElement('a');
            link.className = 'item-anchor';
            link.href = item.url;
            link.innerHTML = `<i class="${item.icon} me-1"></i>${item.name}`;
            
            li.appendChild(link);
            menuContainer.appendChild(li);
        });
        
        console.log('✅ Test menu items added');
    } else {
        console.error('❌ Menu container not found!');
    }
});

console.log('🧪 Test Menu Script ready');
