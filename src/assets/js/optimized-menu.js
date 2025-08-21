// Optimized Menu System - Hệ thống menu tối ưu hóa
// Menu gọn gàng với dropdown và responsive

console.log('🍔 Optimized Menu System loaded');

class OptimizedMenu {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.menuItems = [
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
                    { name: 'BlindBox', url: 'blindbox.html', icon: 'fas fa-gift' },
                    { name: 'Creators', url: 'creators.html', icon: 'fas fa-palette' }
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
                    { name: 'Daily Tasks', url: 'tasks-section.html', icon: 'fas fa-tasks' },
                    { name: 'Connect Wallet', url: 'metamask.html', icon: 'fas fa-wallet' },
                    { name: 'Logout', url: '#', icon: 'fas fa-sign-out-alt', action: 'logout' }
                ]
            }
        ];
        
        this.init();
    }
    
    init() {
        try {
            console.log('🚀 Initializing Optimized Menu...');
            
            // Replace existing menus
            this.replaceMenus();
            
            // Setup mobile menu
            this.setupMobileMenu();
            
            console.log('✅ Optimized Menu initialized');
        } catch (error) {
            console.error('❌ Error initializing Optimized Menu:', error);
        }
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page;
    }
    
    replaceMenus() {
        // Find the optimized menu container
        const menuContainer = document.getElementById('optimizedMenu');
        if (!menuContainer) {
            console.log('⚠️ Optimized menu container not found, skipping menu replacement');
            return;
        }
        
        // Clear existing menu items
        menuContainer.innerHTML = '';
        
        // Add new menu items
        this.menuItems.forEach(item => {
            const menuItem = this.createMenuItem(item);
            menuContainer.appendChild(menuItem);
        });
    }
    
    createMenuItem(item) {
        const li = document.createElement('li');
        
        // Check if we're in a navbar-nav structure (like swap.html)
        const isNavbarNav = document.querySelector('.navbar-nav') && !document.querySelector('.offcanvas');
        if (isNavbarNav) {
            li.className = 'nav-item';
        } else {
            li.className = 'menu-item';
        }
        
        if (item.submenu) {
            // Create dropdown menu
            li.className += ' dropdown';
            
            const link = document.createElement('a');
            if (isNavbarNav) {
                link.className = 'nav-link dropdown-toggle';
            } else {
                link.className = 'item-anchor dropdown-toggle';
            }
            link.href = '#';
            link.setAttribute('role', 'button');
            link.setAttribute('data-bs-toggle', 'dropdown');
            link.setAttribute('aria-expanded', 'false');
            link.innerHTML = `<i class="${item.icon} me-1"></i>${item.name}`;
            
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu dropdown-menu-dark';
            
            item.submenu.forEach(subItem => {
                const dropdownItem = document.createElement('li');
                const dropdownLink = document.createElement('a');
                dropdownLink.className = 'dropdown-item fw-light';
                
                // Handle special actions like logout
                if (subItem.action === 'logout') {
                    dropdownLink.href = '#';
                    dropdownLink.onclick = (e) => {
                        e.preventDefault();
                        this.handleLogout();
                    };
                } else {
                    dropdownLink.href = subItem.url;
                }
                
                dropdownLink.innerHTML = `<i class="${subItem.icon} me-2"></i>${subItem.name}`;
                
                // Add active class if current page
                if (this.currentPage === subItem.url) {
                    dropdownLink.classList.add('active');
                }
                
                dropdownItem.appendChild(dropdownLink);
                dropdownMenu.appendChild(dropdownItem);
            });
            
            li.appendChild(link);
            li.appendChild(dropdownMenu);
            
        } else {
            // Create regular menu item
            const link = document.createElement('a');
            if (isNavbarNav) {
                link.className = 'nav-link';
            } else {
                link.className = 'item-anchor';
            }
            link.href = item.url;
            link.innerHTML = `<i class="${item.icon} me-1"></i>${item.name}`;
            
            // Add active class if current page
            if (this.currentPage === item.url) {
                link.classList.add('active');
            }
            
            li.appendChild(link);
        }
        
        return li;
    }
    
    setupMobileMenu() {
        // Add mobile menu toggle button if not exists
        const navbar = document.querySelector('.navbar');
        if (navbar && !navbar.querySelector('.navbar-toggler')) {
            const toggler = document.createElement('button');
            toggler.className = 'navbar-toggler';
            toggler.type = 'button';
            toggler.setAttribute('data-bs-toggle', 'collapse');
            toggler.setAttribute('data-bs-target', '#navbarNav');
            toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
            
            const navbarBrand = navbar.querySelector('.navbar-brand');
            if (navbarBrand) {
                navbarBrand.parentNode.insertBefore(toggler, navbarBrand.nextSibling);
            }
        }
        
        // Ensure navbar-collapse exists
        const navbarNav = document.querySelector('.navbar-nav');
        if (navbarNav && !navbarNav.parentNode.classList.contains('collapse')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'collapse navbar-collapse';
            wrapper.id = 'navbarNav';
            navbarNav.parentNode.insertBefore(wrapper, navbarNav);
            wrapper.appendChild(navbarNav);
        }
    }
    
    async handleLogout() {
        try {
            console.log('🚪 Handling logout...');
            
            // Show confirmation dialog
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                // Disconnect wallet if connected
                if (window.RealBlockchain && window.RealBlockchain.isWalletConnected()) {
                    await window.RealBlockchain.disconnectWallet();
                }
                
                if (window.PPOBlockchain && window.PPOBlockchain.isWalletConnected()) {
                    await window.PPOBlockchain.disconnectWallet();
                }
                
                // Also try global disconnect function
                if (window.disconnectWallet) {
                    await window.disconnectWallet();
                }
                
                // Clear localStorage
                localStorage.removeItem('ppoBalance');
                localStorage.removeItem('ppoContractAddress');
                localStorage.removeItem('userId');
                localStorage.removeItem('userData');
                localStorage.removeItem('referralCode');
                
                // Clear sessionStorage
                sessionStorage.clear();
                
                // Show success message
                this.showNotification('Đăng xuất thành công!', 'success');
                
                // Redirect to home page after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } else {
                console.log('❌ Logout cancelled by user');
            }
            
        } catch (error) {
            console.error('❌ Error during logout:', error);
            this.showNotification('Có lỗi xảy ra khi đăng xuất', 'error');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Add floating action button for mobile
    addFloatingMenu() {
        const floatingMenu = document.createElement('div');
        floatingMenu.className = 'floating-menu d-lg-none';
        floatingMenu.innerHTML = `
            <button class="floating-menu-btn" onclick="toggleFloatingMenu()">
                <i class="fas fa-bars"></i>
            </button>
            <div class="floating-menu-content" id="floatingMenuContent">
                ${this.menuItems.map(item => {
                    if (item.submenu) {
                        return `
                            <div class="floating-menu-group">
                                <div class="floating-menu-header">
                                    <i class="${item.icon}"></i> ${item.name}
                                </div>
                                ${item.submenu.map(subItem => {
                                    if (subItem.action === 'logout') {
                                        return `
                                            <a href="#" class="floating-menu-item" onclick="window.optimizedMenu.handleLogout(); return false;">
                                                <i class="${subItem.icon}"></i> ${subItem.name}
                                            </a>
                                        `;
                                    } else {
                                        return `
                                            <a href="${subItem.url}" class="floating-menu-item">
                                                <i class="${subItem.icon}"></i> ${subItem.name}
                                            </a>
                                        `;
                                    }
                                }).join('')}
                            </div>
                        `;
                    } else {
                        return `
                            <a href="${item.url}" class="floating-menu-item">
                                <i class="${item.icon}"></i> ${item.name}
                            </a>
                        `;
                    }
                }).join('')}
            </div>
        `;
        
        document.body.appendChild(floatingMenu);
        
        // Add CSS for floating menu
        this.addFloatingMenuCSS();
    }
    
    addFloatingMenuCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .floating-menu {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .floating-menu-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border: none;
                color: white;
                font-size: 1.5rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            }
            
            .floating-menu-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            
            .floating-menu-content {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                padding: 1rem;
                min-width: 200px;
                display: none;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .floating-menu-content.show {
                display: block;
            }
            
            .floating-menu-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem;
                color: #333;
                text-decoration: none;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            
            .floating-menu-item:hover {
                background: #f8f9fa;
                color: #667eea;
            }
            
            .floating-menu-group {
                margin-bottom: 1rem;
            }
            
            .floating-menu-header {
                font-weight: bold;
                color: #667eea;
                padding: 0.5rem 0.75rem;
                border-bottom: 1px solid #e9ecef;
                margin-bottom: 0.5rem;
            }
            
            .floating-menu-item i {
                width: 20px;
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .navbar-nav {
                    text-align: center;
                }
                
                .dropdown-menu {
                    text-align: center;
                    border: none;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Global function to toggle floating menu
window.toggleFloatingMenu = function() {
    const content = document.getElementById('floatingMenuContent');
    if (content) {
        content.classList.toggle('show');
    }
};

// Export to global scope
window.OptimizedMenu = OptimizedMenu;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Optimized Menu...');
    window.optimizedMenu = new OptimizedMenu();
    
    // Add floating menu for mobile
    if (window.innerWidth < 992) {
        window.optimizedMenu.addFloatingMenu();
    }
});

console.log('✅ Optimized Menu System ready');
