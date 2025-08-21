// Test Notification System - COINPAYOT NFT
// Script để test và debug notification system
console.log('🧪 Test Notification System loaded');

class TestNotificationSystem {
    constructor() {
        this.testResults = [];
        this.init();
    }

    init() {
        console.log('🧪 Initializing Test Notification System...');
        this.setupTestButtons();
        console.log('✅ Test Notification System ready!');
    }

    setupTestButtons() {
        // Create test panel
        const testPanel = document.createElement('div');
        testPanel.id = 'test-notification-panel';
        testPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9999;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 10px;
            padding: 15px;
            color: white;
            font-size: 12px;
            max-width: 300px;
        `;
        
        testPanel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold;">🧪 Test Notifications</div>
            <button onclick="testNotificationSystem.testSuccess()" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Success</button>
            <button onclick="testNotificationSystem.testError()" style="
                background: #dc3545;
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Error</button>
            <button onclick="testNotificationSystem.testWarning()" style="
                background: #ffc107;
                color: black;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Warning</button>
            <button onclick="testNotificationSystem.testInfo()" style="
                background: #17a2b8;
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Info</button>
            <button onclick="testNotificationSystem.testMultiple()" style="
                background: #6f42c1;
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Multiple</button>
            <button onclick="testNotificationSystem.clearAll()" style="
                background: #6c757d;
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Clear All</button>
            <button onclick="testNotificationSystem.hidePanel()" style="
                background: #343a40;
                color: white;
                border: none;
                padding: 5px 10px;
                margin: 2px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 11px;
            ">Hide</button>
        `;
        
        document.body.appendChild(testPanel);
        
        // Add keyboard shortcut to show/hide panel
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                this.togglePanel();
            }
        });
    }

    testSuccess() {
        this.logTest('Testing success notification');
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.success('✅ Thành công! Đây là thông báo thành công.');
        } else if (window.showNotification) {
            window.showNotification('✅ Thành công! Đây là thông báo thành công.', 'success');
        } else {
            alert('❌ Notification system not found!');
        }
    }

    testError() {
        this.logTest('Testing error notification');
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.error('❌ Lỗi! Đây là thông báo lỗi.');
        } else if (window.showNotification) {
            window.showNotification('❌ Lỗi! Đây là thông báo lỗi.', 'error');
        } else {
            alert('❌ Notification system not found!');
        }
    }

    testWarning() {
        this.logTest('Testing warning notification');
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.warning('⚠️ Cảnh báo! Đây là thông báo cảnh báo.');
        } else if (window.showNotification) {
            window.showNotification('⚠️ Cảnh báo! Đây là thông báo cảnh báo.', 'warning');
        } else {
            alert('❌ Notification system not found!');
        }
    }

    testInfo() {
        this.logTest('Testing info notification');
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.info('ℹ️ Thông tin! Đây là thông báo thông tin.');
        } else if (window.showNotification) {
            window.showNotification('ℹ️ Thông tin! Đây là thông báo thông tin.', 'info');
        } else {
            alert('❌ Notification system not found!');
        }
    }

    testMultiple() {
        this.logTest('Testing multiple notifications');
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.success('✅ Thông báo 1: Thành công!');
            setTimeout(() => {
                window.unifiedNotificationSystem.error('❌ Thông báo 2: Lỗi!');
            }, 500);
            setTimeout(() => {
                window.unifiedNotificationSystem.warning('⚠️ Thông báo 3: Cảnh báo!');
            }, 1000);
            setTimeout(() => {
                window.unifiedNotificationSystem.info('ℹ️ Thông báo 4: Thông tin!');
            }, 1500);
        } else if (window.showNotification) {
            window.showNotification('✅ Thông báo 1: Thành công!', 'success');
            setTimeout(() => {
                window.showNotification('❌ Thông báo 2: Lỗi!', 'error');
            }, 500);
            setTimeout(() => {
                window.showNotification('⚠️ Thông báo 3: Cảnh báo!', 'warning');
            }, 1000);
            setTimeout(() => {
                window.showNotification('ℹ️ Thông báo 4: Thông tin!', 'info');
            }, 1500);
        } else {
            alert('❌ Notification system not found!');
        }
    }

    clearAll() {
        this.logTest('Clearing all notifications');
        if (window.unifiedNotificationSystem) {
            window.unifiedNotificationSystem.clearAll();
        } else {
            // Remove all notification elements
            const notifications = document.querySelectorAll('.unified-notification, .notification-toast, .alert');
            notifications.forEach(notification => {
                if (notification.parentNode) {
                    notification.remove();
                }
            });
        }
    }

    hidePanel() {
        const panel = document.getElementById('test-notification-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    togglePanel() {
        const panel = document.getElementById('test-notification-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }

    logTest(message) {
        console.log(`🧪 ${message}`);
        this.testResults.push({
            timestamp: new Date().toISOString(),
            message: message
        });
    }

    // Method to check notification system status
    checkStatus() {
        console.log('🔍 Checking notification system status...');
        
        const status = {
            unifiedNotificationSystem: !!window.unifiedNotificationSystem,
            showNotification: !!window.showNotification,
            notificationContainer: !!document.getElementById('unified-notification-container'),
            existingNotifications: document.querySelectorAll('.unified-notification, .notification-toast, .alert').length
        };
        
        console.log('📊 Notification System Status:', status);
        
        if (!status.unifiedNotificationSystem && !status.showNotification) {
            console.error('❌ No notification system found!');
        } else if (status.unifiedNotificationSystem) {
            console.log('✅ Unified notification system is active');
        } else if (status.showNotification) {
            console.log('⚠️ Legacy notification system is active');
        }
        
        return status;
    }

    // Method to run comprehensive test
    runComprehensiveTest() {
        console.log('🧪 Running comprehensive notification test...');
        
        this.checkStatus();
        
        // Test all notification types
        setTimeout(() => this.testSuccess(), 100);
        setTimeout(() => this.testError(), 2000);
        setTimeout(() => this.testWarning(), 4000);
        setTimeout(() => this.testInfo(), 6000);
        setTimeout(() => this.testMultiple(), 8000);
        
        console.log('🧪 Comprehensive test completed. Check notifications above.');
    }
}

// Initialize the test system
const testNotificationSystem = new TestNotificationSystem();
window.testNotificationSystem = testNotificationSystem;

// Auto-check on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        testNotificationSystem.checkStatus();
    }, 1000);
});

console.log('🎯 Test Notification System ready!');
console.log('💡 Press Ctrl+Shift+T to toggle test panel');
