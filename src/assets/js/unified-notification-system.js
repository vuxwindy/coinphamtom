// Unified Notification System - COINPAYOT NFT
// Hệ thống notification thống nhất để tránh chồng chéo
console.log('🔔 Unified Notification System loaded');

class UnifiedNotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 3;
        this.notificationSpacing = 10;
        this.init();
    }

    init() {
        console.log('🔔 Initializing Unified Notification System...');
        this.createNotificationContainer();
        this.setupGlobalFunction();
        console.log('✅ Unified Notification System ready!');
    }

    createNotificationContainer() {
        // Create a dedicated container for notifications
        const container = document.createElement('div');
        container.id = 'unified-notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    setupGlobalFunction() {
        // Override any existing showNotification function
        window.showNotification = (message, type = 'info') => {
            this.show(message, type);
        };
        
        // Also provide a global function for other scripts
        window.unifiedShowNotification = (message, type = 'info') => {
            this.show(message, type);
        };
    }

    show(message, type = 'info') {
        console.log(`🔔 Showing notification: ${message} (${type})`);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `unified-notification unified-notification-${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        let alertClass = 'info';
        
        switch(type) {
            case 'success':
                icon = 'check-circle';
                alertClass = 'success';
                break;
            case 'error':
            case 'danger':
                icon = 'exclamation-circle';
                alertClass = 'danger';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                alertClass = 'warning';
                break;
            case 'info':
            default:
                icon = 'info-circle';
                alertClass = 'info';
                break;
        }
        
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: ${this.getTextColor(type)};
            border: 1px solid ${this.getBorderColor(type)};
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: ${this.notificationSpacing}px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            pointer-events: auto;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            animation: unifiedNotificationSlideIn 0.3s ease;
            position: relative;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${icon}" style="margin-right: 10px; font-size: 16px;"></i>
            <span style="flex: 1;">${message}</span>
            <button class="unified-notification-close" style="
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 18px;
                margin-left: 10px;
                opacity: 0.7;
                transition: opacity 0.2s;
            " onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add hover effect for close button
        const closeBtn = notification.querySelector('.unified-notification-close');
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.opacity = '1';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.opacity = '0.7';
        });
        
        // Add to container
        const container = document.getElementById('unified-notification-container');
        if (container) {
            container.appendChild(notification);
            this.notifications.push(notification);
            
            // Limit number of notifications
            if (this.notifications.length > this.maxNotifications) {
                const oldestNotification = this.notifications.shift();
                if (oldestNotification && oldestNotification.parentNode) {
                    oldestNotification.remove();
                }
            }
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                this.removeNotification(notification);
            }, 5000);
        }
    }

    removeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.animation = 'unifiedNotificationSlideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
                // Remove from array
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            }, 300);
        }
    }

    getBackgroundColor(type) {
        switch(type) {
            case 'success':
                return 'rgba(40, 167, 69, 0.95)';
            case 'error':
            case 'danger':
                return 'rgba(220, 53, 69, 0.95)';
            case 'warning':
                return 'rgba(255, 193, 7, 0.95)';
            case 'info':
            default:
                return 'rgba(23, 162, 184, 0.95)';
        }
    }

    getTextColor(type) {
        switch(type) {
            case 'warning':
                return '#000';
            default:
                return '#fff';
        }
    }

    getBorderColor(type) {
        switch(type) {
            case 'success':
                return 'rgba(40, 167, 69, 0.3)';
            case 'error':
            case 'danger':
                return 'rgba(220, 53, 69, 0.3)';
            case 'warning':
                return 'rgba(255, 193, 7, 0.3)';
            case 'info':
            default:
                return 'rgba(23, 162, 184, 0.3)';
        }
    }

    // Method to clear all notifications
    clearAll() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }

    // Method to show different types of notifications
    success(message) {
        this.show(message, 'success');
    }

    error(message) {
        this.show(message, 'error');
    }

    warning(message) {
        this.show(message, 'warning');
    }

    info(message) {
        this.show(message, 'info');
    }
}

// Initialize the unified notification system
const unifiedNotificationSystem = new UnifiedNotificationSystem();
window.unifiedNotificationSystem = unifiedNotificationSystem;

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes unifiedNotificationSlideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes unifiedNotificationSlideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .unified-notification {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    
    .unified-notification:hover {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
    }
    
    /* Override any existing notification styles */
    .notification-toast,
    .alert {
        display: none !important;
    }
`;

document.head.appendChild(style);

console.log('🎯 Unified Notification System ready!');
