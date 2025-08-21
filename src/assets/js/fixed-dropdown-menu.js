// Fixed Dropdown Menu - COINPAYOT NFT
// Script sửa lỗi dropdown menu không hoạt động

console.log('🔧 Fixed Dropdown Menu loaded');

class FixedDropdownMenu {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Initializing Fixed Dropdown Menu...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupDropdowns());
        } else {
            this.setupDropdowns();
        }
    }

    setupDropdowns() {
        console.log('🎨 Setting up dropdown menus...');
        
        // Fix Bootstrap dropdowns
        this.fixBootstrapDropdowns();
        
        // Fix custom dropdowns
        this.fixCustomDropdowns();
        
        // Fix offcanvas dropdowns
        this.fixOffcanvasDropdowns();
        
        console.log('✅ Dropdown menus setup complete');
    }

    fixBootstrapDropdowns() {
        // Initialize Bootstrap dropdowns
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl);
        });

        // Add click handlers for dropdown toggles
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = toggle.closest('.dropdown');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                menu.classList.toggle('show');
                
                // Add active class to toggle
                toggle.classList.toggle('active');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown-toggle.active').forEach(toggle => {
                    toggle.classList.remove('active');
                });
            }
        });
    }

    fixCustomDropdowns() {
        // Fix custom dropdown implementations
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const target = toggle.getAttribute('data-bs-target') || 
                             toggle.getAttribute('href') || 
                             '#' + toggle.getAttribute('aria-controls');
                
                const menu = document.querySelector(target);
                if (menu) {
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown-menu.show, .show').forEach(openMenu => {
                        if (openMenu !== menu) {
                            openMenu.classList.remove('show');
                        }
                    });
                    
                    // Toggle current dropdown
                    menu.classList.toggle('show');
                    toggle.classList.toggle('active');
                }
            });
        });
    }

    fixOffcanvasDropdowns() {
        // Fix dropdowns inside offcanvas
        document.querySelectorAll('.offcanvas .dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = toggle.closest('.dropdown');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                // Close other dropdowns in offcanvas
                const offcanvas = toggle.closest('.offcanvas');
                if (offcanvas) {
                    offcanvas.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                        if (openMenu !== menu) {
                            openMenu.classList.remove('show');
                        }
                    });
                }
                
                // Toggle current dropdown
                menu.classList.toggle('show');
                toggle.classList.toggle('active');
                
                // Add visual feedback
                if (menu.classList.contains('show')) {
                    toggle.style.transform = 'rotate(180deg)';
                } else {
                    toggle.style.transform = 'rotate(0deg)';
                }
            });
        });

        // Fix dropdown items in offcanvas
        document.querySelectorAll('.offcanvas .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Close parent dropdown
                const dropdown = item.closest('.dropdown');
                const menu = dropdown.querySelector('.dropdown-menu');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                
                menu.classList.remove('show');
                toggle.classList.remove('active');
                toggle.style.transform = 'rotate(0deg)';
                
                // Handle navigation
                const href = item.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });
    }

    // Method to manually trigger dropdown
    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (dropdown) {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.classList.toggle('show');
            toggle.classList.toggle('active');
            
            if (toggle.classList.contains('active')) {
                toggle.style.transform = 'rotate(180deg)';
            } else {
                toggle.style.transform = 'rotate(0deg)';
            }
        }
    }

    // Method to close all dropdowns
    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        
        document.querySelectorAll('.dropdown-toggle.active').forEach(toggle => {
            toggle.classList.remove('active');
            toggle.style.transform = 'rotate(0deg)';
        });
    }

    // Method to add dropdown functionality to any element
    addDropdownToElement(element, menuContent) {
        element.classList.add('dropdown-toggle');
        element.setAttribute('data-bs-toggle', 'dropdown');
        element.setAttribute('aria-expanded', 'false');
        
        // Create dropdown menu
        const menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        menu.innerHTML = menuContent;
        
        // Wrap in dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        element.parentNode.insertBefore(dropdown, element);
        dropdown.appendChild(element);
        dropdown.appendChild(menu);
        
        // Add click handler
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                if (openMenu !== menu) {
                    openMenu.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            menu.classList.toggle('show');
            element.classList.toggle('active');
            element.setAttribute('aria-expanded', menu.classList.contains('show'));
        });
    }
}

// Initialize the fixed dropdown menu
const fixedDropdownMenu = new FixedDropdownMenu();

// Make it globally available
window.fixedDropdownMenu = fixedDropdownMenu;
window.FixedDropdownMenu = FixedDropdownMenu;

// Global functions for manual control
window.toggleDropdown = (dropdownId) => {
    fixedDropdownMenu.toggleDropdown(dropdownId);
};

window.closeAllDropdowns = () => {
    fixedDropdownMenu.closeAllDropdowns();
};

window.addDropdownToElement = (element, menuContent) => {
    fixedDropdownMenu.addDropdownToElement(element, menuContent);
};

console.log('🎯 Fixed Dropdown Menu ready!');
