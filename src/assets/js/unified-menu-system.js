// Unified Menu System - COINPAYOT NFT
// Hệ thống menu và nút connect thống nhất cho tất cả các trang
console.log('🎯 Unified Menu System loaded');

class UnifiedMenuSystem {
    constructor() {
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
                    { name: 'Daily Tasks', url: 'tasks-section.html', icon: 'fas fa-tasks' },
                    { name: 'Logout', url: '#', icon: 'fas fa-sign-out-alt', action: 'logout' }
                ]
            }
        ];
        this.init();
    }

    async init() {
        console.log('🎯 Initializing Unified Menu System...');
        await this.setupMenu();
        await this.setupConnectButton();
        this.setupDropdownHandlers();
        this.setupEventListeners();
        console.log('✅ Unified Menu System ready!');
    }

    async setupMenu() {
        const menuContainer = document.getElementById('optimizedMenu');
        if (!menuContainer) {
            console.error('❌ Menu container not found!');
            return;
        }

        console.log('🎯 Setting up unified menu...');
        menuContainer.innerHTML = '';
        
        this.menuItems.forEach(item => {
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
                dropdownMenu.style.position = 'static';
                dropdownMenu.style.transform = 'none';
                dropdownMenu.style.width = '100%';
                dropdownMenu.style.display = 'none';
                
                item.submenu.forEach(subItem => {
                    const dropdownItem = document.createElement('li');
                    const dropdownLink = document.createElement('a');
                    dropdownLink.className = 'dropdown-item fw-light';
                    
                    // Handle logout action
                    if (subItem.action === 'logout') {
                        dropdownLink.href = '#';
                        dropdownLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                                this.handleLogout();
                            }
                        });
                    } else {
                        dropdownLink.href = subItem.url;
                        // Add click event for navigation
                        dropdownLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            console.log('🖱️ Submenu item clicked:', subItem.name, subItem.url);
                            window.location.href = subItem.url;
                        });
                    }
                    
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
                
                // Add click event for navigation
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🖱️ Menu item clicked:', item.name, item.url);
                    window.location.href = item.url;
                });
                
                li.appendChild(link);
            }
            
            menuContainer.appendChild(li);
        });
        
        console.log('✅ Menu setup complete');
    }

    async setupConnectButton() {
        const btnWrap = document.querySelector('.btn-wrap');
        if (!btnWrap) {
            console.error('❌ Button wrap not found!');
            return;
        }

        // Clear existing buttons
        btnWrap.innerHTML = '';
        
        // Add connect wallet button
        const connectBtn = document.createElement('a');
        connectBtn.className = 'btn btn-linear btn-medium connect-wallet-btn';
        connectBtn.onclick = () => this.connectWallet();
        connectBtn.innerHTML = '<i class="fas fa-wallet me-2"></i>Connect Wallet';
        
        btnWrap.appendChild(connectBtn);
        
        console.log('✅ Connect button setup complete');
    }

    setupDropdownHandlers() {
        // Handle dropdown toggles
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownMenu = toggle.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.style.display = 'none';
                        }
                    });
                    
                    // Toggle current dropdown
                    const isVisible = dropdownMenu.style.display === 'block';
                    dropdownMenu.style.display = isVisible ? 'none' : 'block';
                    
                    // Toggle active class
                    toggle.classList.toggle('active');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                    toggle.classList.remove('active');
                });
            }
        });

        console.log('✅ Dropdown handlers setup complete');
    }

    setupEventListeners() {
        // Handle offcanvas dropdowns specifically
        setTimeout(() => {
            const offcanvasDropdownToggles = document.querySelectorAll('.offcanvas .dropdown-toggle');
            offcanvasDropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdownMenu = toggle.nextElementSibling;
                    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                        // Close all other dropdowns in offcanvas
                        document.querySelectorAll('.offcanvas .dropdown-menu').forEach(menu => {
                            if (menu !== dropdownMenu) {
                                menu.style.display = 'none';
                            }
                        });
                        
                        // Toggle current dropdown
                        const isVisible = dropdownMenu.style.display === 'block';
                        dropdownMenu.style.display = isVisible ? 'none' : 'block';
                        
                        // Toggle active class
                        toggle.classList.toggle('active');
                    }
                });
            });
        }, 1000);

        console.log('✅ Event listeners setup complete');
    }

    async connectWallet() {
        console.log('🔗 Connecting wallet...');
        
        // Try to use existing wallet system
        if (window.connectWallet) {
            try {
                await window.connectWallet();
            } catch (error) {
                console.error('❌ Error connecting wallet:', error);
                this.showNotification('❌ Lỗi kết nối ví', 'error');
            }
        } else {
            console.warn('⚠️ No wallet system found');
            this.showNotification('⚠️ Hệ thống ví chưa sẵn sàng', 'warning');
        }
    }

    async handleLogout() {
        console.log('🔌 Logging out...');
        
        try {
            // Try to use existing logout function
            if (window.logout) {
                await window.logout();
            } else if (window.disconnectWallet) {
                await window.disconnectWallet();
            } else {
                // Fallback
                localStorage.clear();
                sessionStorage.clear();
            }
            
            this.showNotification('✅ Đã đăng xuất thành công!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            console.error('❌ Error during logout:', error);
            this.showNotification('❌ Lỗi đăng xuất', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Use unified notification system if available
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.show(message, type);
        } else if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            // Fallback to simple alert
            console.log(`🔔 ${type.toUpperCase()}: ${message}`);
            alert(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Method to update menu for specific page
    updateMenuForPage(pageName) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log(`🎯 Updating menu for page: ${currentPage}`);
        
        // Highlight current page in menu
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const link = item.querySelector('.item-anchor');
            if (link) {
                const href = link.getAttribute('href');
                if (href === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }
}

// Initialize the unified menu system
const unifiedMenuSystem = new UnifiedMenuSystem();
window.unifiedMenuSystem = unifiedMenuSystem;

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    unifiedMenuSystem.updateMenuForPage();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .menu-item.active .item-anchor {
        color: var(--primary-color) !important;
        background: rgba(204, 0, 255, 0.1);
        border-radius: 8px;
    }
    
    .dropdown-toggle.active {
        color: var(--primary-color) !important;
        background: rgba(204, 0, 255, 0.1);
        border-radius: 8px;
    }
`;
document.head.appendChild(style);

console.log('🎯 Unified Menu System ready!');
