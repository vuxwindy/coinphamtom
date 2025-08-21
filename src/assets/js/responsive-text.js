// Responsive Text System - Tự động điều chỉnh kích thước chữ cho mobile
// Tự động áp dụng các class responsive cho các element HTML

console.log('📱 Responsive Text System loaded');

class ResponsiveTextSystem {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        try {
            console.log('🚀 Initializing Responsive Text System...');
            
            // Apply responsive classes to existing elements
            this.applyResponsiveClasses();
            
            // Set up observer for dynamically added content
            this.setupObserver();
            
            console.log('✅ Responsive Text System initialized');
        } catch (error) {
            console.error('❌ Error initializing Responsive Text System:', error);
        }
    }

    applyResponsiveClasses() {
        try {
            // Apply to headings
            this.applyToElements('h1', 'responsive-h1');
            this.applyToElements('h2', 'responsive-h2');
            this.applyToElements('h3', 'responsive-h3');
            this.applyToElements('h4', 'responsive-h4');
            this.applyToElements('h5', 'responsive-h5');
            this.applyToElements('h6', 'responsive-h6');

            // Apply to text elements
            this.applyToElements('p', 'responsive-text-base');
            this.applyToElements('small', 'responsive-text-sm');
            this.applyToElements('span', 'responsive-text-base');

            // Apply to buttons
            this.applyToElements('.btn', 'responsive-btn-base');
            this.applyToElements('.btn-sm', 'responsive-btn-sm');
            this.applyToElements('.btn-lg', 'responsive-btn-lg');

            // Apply to navigation
            this.applyToElements('.navbar-brand', 'responsive-nav-brand');
            this.applyToElements('.nav-link', 'responsive-nav-link');
            this.applyToElements('.menu-item', 'responsive-menu-item');
            this.applyToElements('.dropdown-item', 'responsive-menu-dropdown');

            // Apply to cards
            this.applyToElements('.card-title', 'responsive-card-title');
            this.applyToElements('.card-text', 'responsive-card-text');

            // Apply to modals
            this.applyToElements('.modal-title', 'responsive-modal-title');
            this.applyToElements('.modal-body', 'responsive-modal-body');

            // Apply to forms
            this.applyToElements('.form-control', 'responsive-input');
            this.applyToElements('.form-select', 'responsive-input');
            this.applyToElements('.form-label', 'responsive-label');

            // Apply to alerts and notifications
            this.applyToElements('.alert', 'responsive-alert');
            this.applyToElements('.notification', 'responsive-notification');

            // Apply to tables
            this.applyToElements('table th', 'responsive-table-header');
            this.applyToElements('table td', 'responsive-table-cell');

            // Apply to badges
            this.applyToElements('.badge', 'responsive-badge');
            this.applyToElements('.badge-lg', 'responsive-badge-lg');

            // Apply to stats and numbers
            this.applyToElements('.stat-number', 'responsive-stat-number');
            this.applyToElements('.stat-label', 'responsive-stat-label');
            this.applyToElements('.price', 'responsive-price');
            this.applyToElements('.price-lg', 'responsive-price-lg');
            this.applyToElements('.price-sm', 'responsive-price-sm');

            // Apply to specific elements
            this.applyToElements('.banner-title', 'responsive-h1');
            this.applyToElements('.banner-content p', 'responsive-text-base');
            this.applyToElements('.claim-reward', 'responsive-text-sm');
            this.applyToElements('.claim-text', 'responsive-text-xs');
            this.applyToElements('.daily-title', 'responsive-h3');
            this.applyToElements('.daily-title-content', 'responsive-text-base');
            this.applyToElements('.task-btn', 'responsive-btn-sm');

            console.log('📝 Applied responsive classes to existing elements');
        } catch (error) {
            console.error('❌ Error applying responsive classes:', error);
        }
    }

    applyToElements(selector, className) {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.classList.contains(className)) {
                    element.classList.add(className);
                }
            });
        } catch (error) {
            console.error(`❌ Error applying ${className} to ${selector}:`, error);
        }
    }

    setupObserver() {
        try {
            // Create observer to watch for dynamically added content
            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.applyResponsiveClassesToElement(node);
                            }
                        });
                    }
                });
            });

            // Start observing
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            console.log('👁️ Set up observer for dynamic content');
        } catch (error) {
            console.error('❌ Error setting up observer:', error);
        }
    }

    applyResponsiveClassesToElement(element) {
        try {
            // Apply to the element itself
            this.applyResponsiveClassToElement(element);

            // Apply to child elements
            const children = element.querySelectorAll('*');
            children.forEach(child => {
                this.applyResponsiveClassToElement(child);
            });
        } catch (error) {
            console.error('❌ Error applying responsive classes to element:', error);
        }
    }

    applyResponsiveClassToElement(element) {
        try {
            const tagName = element.tagName.toLowerCase();
            const className = element.className;

            // Headings
            if (tagName === 'h1' && !className.includes('responsive-h1')) {
                element.classList.add('responsive-h1');
            } else if (tagName === 'h2' && !className.includes('responsive-h2')) {
                element.classList.add('responsive-h2');
            } else if (tagName === 'h3' && !className.includes('responsive-h3')) {
                element.classList.add('responsive-h3');
            } else if (tagName === 'h4' && !className.includes('responsive-h4')) {
                element.classList.add('responsive-h4');
            } else if (tagName === 'h5' && !className.includes('responsive-h5')) {
                element.classList.add('responsive-h5');
            } else if (tagName === 'h6' && !className.includes('responsive-h6')) {
                element.classList.add('responsive-h6');
            }

            // Text elements
            else if (tagName === 'p' && !className.includes('responsive-text-base')) {
                element.classList.add('responsive-text-base');
            } else if (tagName === 'small' && !className.includes('responsive-text-sm')) {
                element.classList.add('responsive-text-sm');
            }

            // Buttons
            else if (className.includes('btn') && !className.includes('responsive-btn')) {
                if (className.includes('btn-sm')) {
                    element.classList.add('responsive-btn-sm');
                } else if (className.includes('btn-lg')) {
                    element.classList.add('responsive-btn-lg');
                } else {
                    element.classList.add('responsive-btn-base');
                }
            }

            // Navigation
            else if (className.includes('navbar-brand') && !className.includes('responsive-nav-brand')) {
                element.classList.add('responsive-nav-brand');
            } else if (className.includes('nav-link') && !className.includes('responsive-nav-link')) {
                element.classList.add('responsive-nav-link');
            } else if (className.includes('menu-item') && !className.includes('responsive-menu-item')) {
                element.classList.add('responsive-menu-item');
            } else if (className.includes('dropdown-item') && !className.includes('responsive-menu-dropdown')) {
                element.classList.add('responsive-menu-dropdown');
            }

            // Cards
            else if (className.includes('card-title') && !className.includes('responsive-card-title')) {
                element.classList.add('responsive-card-title');
            } else if (className.includes('card-text') && !className.includes('responsive-card-text')) {
                element.classList.add('responsive-card-text');
            }

            // Modals
            else if (className.includes('modal-title') && !className.includes('responsive-modal-title')) {
                element.classList.add('responsive-modal-title');
            } else if (className.includes('modal-body') && !className.includes('responsive-modal-body')) {
                element.classList.add('responsive-modal-body');
            }

            // Forms
            else if ((className.includes('form-control') || className.includes('form-select')) && !className.includes('responsive-input')) {
                element.classList.add('responsive-input');
            } else if (className.includes('form-label') && !className.includes('responsive-label')) {
                element.classList.add('responsive-label');
            }

            // Alerts and notifications
            else if (className.includes('alert') && !className.includes('responsive-alert')) {
                element.classList.add('responsive-alert');
            } else if (className.includes('notification') && !className.includes('responsive-notification')) {
                element.classList.add('responsive-notification');
            }

            // Tables
            else if (tagName === 'th' && !className.includes('responsive-table-header')) {
                element.classList.add('responsive-table-header');
            } else if (tagName === 'td' && !className.includes('responsive-table-cell')) {
                element.classList.add('responsive-table-cell');
            }

            // Badges
            else if (className.includes('badge') && !className.includes('responsive-badge')) {
                if (className.includes('badge-lg')) {
                    element.classList.add('responsive-badge-lg');
                } else {
                    element.classList.add('responsive-badge');
                }
            }

            // Stats and numbers
            else if (className.includes('stat-number') && !className.includes('responsive-stat-number')) {
                element.classList.add('responsive-stat-number');
            } else if (className.includes('stat-label') && !className.includes('responsive-stat-label')) {
                element.classList.add('responsive-stat-label');
            } else if (className.includes('price') && !className.includes('responsive-price')) {
                if (className.includes('price-lg')) {
                    element.classList.add('responsive-price-lg');
                } else if (className.includes('price-sm')) {
                    element.classList.add('responsive-price-sm');
                } else {
                    element.classList.add('responsive-price');
                }
            }

            // Specific elements
            else if (className.includes('banner-title') && !className.includes('responsive-h1')) {
                element.classList.add('responsive-h1');
            } else if (className.includes('claim-reward') && !className.includes('responsive-text-sm')) {
                element.classList.add('responsive-text-sm');
            } else if (className.includes('claim-text') && !className.includes('responsive-text-xs')) {
                element.classList.add('responsive-text-xs');
            } else if (className.includes('daily-title') && !className.includes('responsive-h3')) {
                element.classList.add('responsive-h3');
            } else if (className.includes('daily-title-content') && !className.includes('responsive-text-base')) {
                element.classList.add('responsive-text-base');
            } else if (className.includes('task-btn') && !className.includes('responsive-btn-sm')) {
                element.classList.add('responsive-btn-sm');
            }

        } catch (error) {
            console.error('❌ Error applying responsive class to element:', error);
        }
    }

    // Utility methods
    getScreenSize() {
        const width = window.innerWidth;
        if (width >= 1200) return 'xl';
        if (width >= 992) return 'lg';
        if (width >= 768) return 'md';
        if (width >= 576) return 'sm';
        if (width >= 375) return 'xs';
        return 'xxs';
    }

    isMobile() {
        return window.innerWidth < 768;
    }

    isTablet() {
        return window.innerWidth >= 768 && window.innerWidth < 992;
    }

    isDesktop() {
        return window.innerWidth >= 992;
    }

    // Manual application methods
    applyClass(selector, className) {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add(className);
            });
            console.log(`✅ Applied ${className} to ${selector}`);
        } catch (error) {
            console.error(`❌ Error applying ${className} to ${selector}:`, error);
        }
    }

    removeClass(selector, className) {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.remove(className);
            });
            console.log(`✅ Removed ${className} from ${selector}`);
        } catch (error) {
            console.error(`❌ Error removing ${className} from ${selector}:`, error);
        }
    }

    // Force refresh
    refresh() {
        try {
            console.log('🔄 Refreshing responsive text system...');
            this.applyResponsiveClasses();
            console.log('✅ Responsive text system refreshed');
        } catch (error) {
            console.error('❌ Error refreshing responsive text system:', error);
        }
    }

    // Cleanup
    destroy() {
        try {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            console.log('🧹 Responsive text system destroyed');
        } catch (error) {
            console.error('❌ Error destroying responsive text system:', error);
        }
    }
}

// Initialize when DOM is ready
let responsiveTextSystem;

document.addEventListener('DOMContentLoaded', () => {
    responsiveTextSystem = new ResponsiveTextSystem();
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (responsiveTextSystem) {
            responsiveTextSystem.refresh();
        }
    }, 250);
});

// Export to global scope
window.ResponsiveTextSystem = ResponsiveTextSystem;
window.responsiveTextSystem = responsiveTextSystem;

// Utility functions for manual control
window.applyResponsiveClass = (selector, className) => {
    if (responsiveTextSystem) {
        responsiveTextSystem.applyClass(selector, className);
    }
};

window.removeResponsiveClass = (selector, className) => {
    if (responsiveTextSystem) {
        responsiveTextSystem.removeClass(selector, className);
    }
};

window.refreshResponsiveText = () => {
    if (responsiveTextSystem) {
        responsiveTextSystem.refresh();
    }
};

window.getScreenSize = () => {
    if (responsiveTextSystem) {
        return responsiveTextSystem.getScreenSize();
    }
    return 'unknown';
};

console.log('✅ Responsive Text System ready');
