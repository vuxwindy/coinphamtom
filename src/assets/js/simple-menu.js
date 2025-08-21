// Simple Menu Script - Hoạt động ngay lập tức
console.log('🍔 Simple Menu Script loaded');

function initSimpleMenu() {
    console.log('🚀 Initializing Simple Menu...');
    
    // Check if menu container exists
    const menuContainer = document.getElementById('optimizedMenu');
    if (!menuContainer) {
        console.error('❌ Menu container not found!');
        return;
    }
    
    console.log('✅ Menu container found, creating menu...');
    
    // Menu items
    const menuItems = [
        { name: 'Home', url: 'index.html', icon: 'fas fa-home' },
        { name: 'Games', url: 'game.html', icon: 'fas fa-gamepad' },
        { name: 'Dashboard', url: 'dashboard.html', icon: 'fas fa-chart-line' },
        { name: 'Swap', url: 'swap.html', icon: 'fas fa-exchange-alt' },
        { 
            name: 'Marketplace', 
            icon: 'fas fa-store',
            submenu: [
                { name: 'NFT Market', url: 'marketplace.html', icon: 'fas fa-store' },
                { name: 'Collection', url: 'collection.html', icon: 'fas fa-images' },
                { name: 'BlindBox', url: 'blindbox.html', icon: 'fas fa-gift' }
            ]
        },
        { 
            name: 'Finance', 
            icon: 'fas fa-coins',
            submenu: [
                { name: 'Investment', url: 'investment.html', icon: 'fas fa-chart-line' },
                { name: 'NFT Investment', url: 'nft-investment.html', icon: 'fas fa-gem' },
                { name: 'Referral', url: 'referral.html', icon: 'fas fa-users' }
            ]
        },
        { 
            name: 'More', 
            icon: 'fas fa-ellipsis-h',
            submenu: [
                { name: 'Profile', url: 'profile.html', icon: 'fas fa-user' },
                { name: 'Whitepaper', url: 'whitepaper.html', icon: 'fas fa-file-alt' },
                { name: 'Daily Tasks', url: 'tasks-section.html', icon: 'fas fa-tasks' }
            ]
        }
    ];
    
    // Clear existing content
    menuContainer.innerHTML = '';
    
    // Create menu items
    menuItems.forEach(item => {
        const li = document.createElement('li');
        
        if (item.submenu) {
            // Create dropdown menu
            li.className = 'menu-item dropdown';
            
            const link = document.createElement('a');
            link.className = 'item-anchor dropdown-toggle';
            link.href = '#';
            link.setAttribute('data-bs-toggle', 'dropdown');
            link.setAttribute('aria-expanded', 'false');
            link.innerHTML = `<i class="${item.icon} me-1"></i>${item.name}`;
            
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu dropdown-menu-dark';
            
            item.submenu.forEach(subItem => {
                const dropdownItem = document.createElement('li');
                const dropdownLink = document.createElement('a');
                dropdownLink.className = 'dropdown-item fw-light';
                dropdownLink.href = subItem.url;
                dropdownLink.innerHTML = `<i class="${subItem.icon} me-2"></i>${subItem.name}`;
                
                dropdownItem.appendChild(dropdownLink);
                dropdownMenu.appendChild(dropdownItem);
            });
            
            li.appendChild(link);
            li.appendChild(dropdownMenu);
            
        } else {
            // Create regular menu item
            li.className = 'menu-item';
            
            const link = document.createElement('a');
            link.className = 'item-anchor';
            link.href = item.url;
            link.innerHTML = `<i class="${item.icon} me-1"></i>${item.name}`;
            
            // Add active class if current page
            if (window.location.pathname.includes(item.url)) {
                link.classList.add('active');
            }
            
            li.appendChild(link);
        }
        
        menuContainer.appendChild(li);
    });
    
    console.log('✅ Simple menu created successfully!');
}

// Try to initialize immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimpleMenu);
} else {
    initSimpleMenu();
}

// Also try after a short delay
setTimeout(initSimpleMenu, 100);

console.log('✅ Simple Menu Script ready');
