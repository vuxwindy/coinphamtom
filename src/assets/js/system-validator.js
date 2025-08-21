// System Validator - COINPAYOT NFT
// Kiểm tra toàn diện các button và function linkages

console.log('🔍 System Validator loaded');

// ========================================
// VALIDATION CONFIGURATION
// ========================================
const VALIDATION_CONFIG = {
    // Critical functions that must exist
    CRITICAL_FUNCTIONS: [
        'connectWallet',
        'disconnectWallet',
        'addToWallet',
        'openPPODepositModal',
        'openPPOWithdrawModal',
        'executeSwap',
        'restartGame',
        'buyArrows',
        'claimRewards',
        'openBlindBox',
        'buyPackage',
        'startStaking',
        'editProfile',
        'copyPlatformAddress',
        'copyReferralLink',
        'handleAdminButtonClick'
    ],
    
    // Critical buttons that must exist
    CRITICAL_BUTTONS: [
        '.connect-wallet-btn'
        // Removed specific onclick buttons as they may not exist on all pages
    ],
    
    // Core systems that must be available
    CORE_SYSTEMS: [
        'DatabaseCore',
        'SystemLogicCore',
        'PPOBlockchainIntegration',
        'SystemIntegration'
    ],
    
    // Required HTML elements (optional - may not exist on all pages)
    OPTIONAL_ELEMENTS: [
        '#ppoBalance',
        '#userBalance',
        '#gameStats',
        '#nftCollection',
        '#transactionHistory'
    ]
};

// ========================================
// SYSTEM VALIDATOR CLASS
// ========================================
class SystemValidator {
    constructor() {
        this.validationResults = {
            functions: {},
            buttons: {},
            systems: {},
            elements: {},
            overall: 'pending'
        };
        this.errors = [];
        this.warnings = [];
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🔍 Initializing System Validator...');
            
            // Wait for page to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Wait a bit more for all scripts to load
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Run validations
            await this.runAllValidations();
            
            // Display results
            this.displayResults();
            
        } catch (error) {
            console.error('❌ System Validator initialization failed:', error);
        }
    }
    
    async runAllValidations() {
        console.log('🔍 Running all validations...');
        
        // Validate functions
        await this.validateFunctions();
        
        // Validate buttons
        await this.validateButtons();
        
        // Validate core systems
        await this.validateCoreSystems();
        
        // Validate optional elements
        await this.validateOptionalElements();
        
        // Calculate overall status
        this.calculateOverallStatus();
    }
    
    async validateFunctions() {
        console.log('🔍 Validating functions...');
        
        VALIDATION_CONFIG.CRITICAL_FUNCTIONS.forEach(funcName => {
            const exists = typeof window[funcName] === 'function';
            this.validationResults.functions[funcName] = exists;
            
            if (!exists) {
                this.errors.push(`Function '${funcName}' is missing`);
            }
        });
    }
    
    async validateButtons() {
        console.log('🔍 Validating buttons...');
        
        VALIDATION_CONFIG.CRITICAL_BUTTONS.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            const exists = elements.length > 0;
            this.validationResults.buttons[selector] = exists;
            
            if (!exists) {
                this.warnings.push(`Button selector '${selector}' found no elements`);
            }
        });
    }
    
    async validateCoreSystems() {
        console.log('🔍 Validating core systems...');
        
        VALIDATION_CONFIG.CORE_SYSTEMS.forEach(systemName => {
            let exists = false;
            let initialized = false;
            
            switch (systemName) {
                case 'DatabaseCore':
                    exists = typeof window.DatabaseCore !== 'undefined';
                    initialized = window.databaseCore && window.databaseCore.isInitialized;
                    break;
                case 'SystemLogicCore':
                    exists = typeof window.SystemLogicCore !== 'undefined';
                    initialized = window.systemLogicCore && window.systemLogicCore.isInitialized;
                    break;
                case 'PPOBlockchainIntegration':
                    exists = typeof window.PPOBlockchainIntegration !== 'undefined';
                    initialized = window.PPOBlockchain && window.PPOBlockchain.isConnected !== undefined;
                    break;
                case 'SystemIntegration':
                    exists = typeof window.SystemIntegration !== 'undefined';
                    initialized = window.systemIntegration && window.systemIntegration.isReady();
                    break;
            }
            
            this.validationResults.systems[systemName] = { exists, initialized };
            
            if (!exists) {
                this.errors.push(`Core system '${systemName}' is missing`);
            } else if (!initialized) {
                this.warnings.push(`Core system '${systemName}' exists but not initialized`);
            }
        });
    }
    
    async validateOptionalElements() {
        console.log('🔍 Validating optional elements...');
        
        VALIDATION_CONFIG.OPTIONAL_ELEMENTS.forEach(selector => {
            const element = document.querySelector(selector);
            const exists = element !== null;
            this.validationResults.elements[selector] = exists;
            
            if (!exists) {
                this.warnings.push(`HTML element '${selector}' not found`);
            }
        });
    }
    
    calculateOverallStatus() {
        const totalFunctions = Object.keys(this.validationResults.functions).length;
        const totalButtons = Object.keys(this.validationResults.buttons).length;
        const totalSystems = Object.keys(this.validationResults.systems).length;
        
        const passedFunctions = Object.values(this.validationResults.functions).filter(Boolean).length;
        const passedButtons = Object.values(this.validationResults.buttons).filter(Boolean).length;
        const passedSystems = Object.values(this.validationResults.systems).filter(s => s.exists).length;
        
        const functionScore = totalFunctions > 0 ? passedFunctions / totalFunctions : 1;
        const buttonScore = totalButtons > 0 ? passedButtons / totalButtons : 1;
        const systemScore = totalSystems > 0 ? passedSystems / totalSystems : 1;
        
        const overallScore = (functionScore + buttonScore + systemScore) / 3;
        
        if (overallScore >= 0.8) {
            this.validationResults.overall = 'success';
        } else if (overallScore >= 0.6) {
            this.validationResults.overall = 'warning';
        } else {
            this.validationResults.overall = 'error';
        }
    }
    
    displayResults() {
        console.log('\n' + '='.repeat(60));
        console.log('🔍 SYSTEM VALIDATION REPORT');
        console.log('='.repeat(60));
        
        // Overall status
        const statusEmoji = {
            'success': '✅',
            'warning': '⚠️',
            'error': '❌'
        };
        
        console.log(`${statusEmoji[this.validationResults.overall]} Status: ${this.validationResults.overall.toUpperCase()}`);
        
        // Count results
        const functionCount = Object.values(this.validationResults.functions).filter(Boolean).length;
        const buttonCount = Object.values(this.validationResults.buttons).filter(Boolean).length;
        const systemCount = Object.values(this.validationResults.systems).filter(s => s.exists).length;
        const elementCount = Object.values(this.validationResults.elements).filter(Boolean).length;
        
        const totalFunctions = Object.keys(this.validationResults.functions).length;
        const totalButtons = Object.keys(this.validationResults.buttons).length;
        const totalSystems = Object.keys(this.validationResults.systems).length;
        const totalElements = Object.keys(this.validationResults.elements).length;
        
        console.log(`${functionCount} ✅ | ${totalFunctions - functionCount} ❌ Functions`);
        console.log(`${buttonCount} ✅ | ${totalButtons - buttonCount} ❌ Buttons`);
        console.log(`${systemCount} ✅ | ${totalSystems - systemCount} ❌ Systems`);
        console.log(`${elementCount} ✅ | ${totalElements - elementCount} ❌ Elements`);
        
        // Detailed results
        console.log('\n🔧 Functions:');
        Object.entries(this.validationResults.functions).forEach(([func, exists]) => {
            console.log(`${exists ? '✅' : '❌'} ${func}`);
        });
        
        console.log('\n🔘 Buttons:');
        Object.entries(this.validationResults.buttons).forEach(([selector, exists]) => {
            console.log(`${exists ? '✅' : '❌'} ${selector}`);
        });
        
        console.log('\n⚙️ Systems:');
        Object.entries(this.validationResults.systems).forEach(([system, status]) => {
            if (status.exists && status.initialized) {
                console.log(`✅ ${system}`);
            } else if (status.exists) {
                console.log(`⚠️ ${system}`);
            } else {
                console.log(`❌ ${system}`);
            }
        });
        
        // Errors and warnings
        if (this.errors.length > 0) {
            console.log('\n❌ Errors:');
            this.errors.forEach(error => {
                console.log(`- ${error}`);
            });
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️ Warnings:');
            this.warnings.forEach(warning => {
                console.log(`- ${warning}`);
            });
        }
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 SUMMARY');
        console.log('='.repeat(60));
        
        const totalTests = totalFunctions + totalButtons + totalSystems;
        const passedTests = functionCount + buttonCount + systemCount;
        const successRate = totalTests > 0 ? (passedTests / totalTests * 100).toFixed(1) : 100;
        
        console.log(`Overall Success Rate: ${successRate}%`);
        console.log(`Tests Passed: ${passedTests}/${totalTests}`);
        
        if (this.validationResults.overall === 'success') {
            console.log('🎉 System validation passed! All critical components are working.');
        } else if (this.validationResults.overall === 'warning') {
            console.log('⚠️ System validation has warnings. Some components need attention.');
        } else {
            console.log('❌ System validation failed. Critical components are missing.');
        }
        
        console.log('='.repeat(60) + '\n');
    }
    
    // Public methods
    getResults() {
        return this.validationResults;
    }
    
    getErrors() {
        return this.errors;
    }
    
    getWarnings() {
        return this.warnings;
    }
    
    isSystemReady() {
        return this.validationResults.overall === 'success';
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Create global instance
let systemValidator;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        systemValidator = new SystemValidator();
        window.SystemValidator = systemValidator;
        console.log('🔍 System Validator initialized');
    } catch (error) {
        console.error('❌ Failed to initialize System Validator:', error);
    }
});

// Export for global use
window.VALIDATION_CONFIG = VALIDATION_CONFIG;
window.SystemValidator = SystemValidator;
