// Debug Add To Wallet Function
// Script để test và sửa lỗi addToWallet

console.log('🔧 Debug Add To Wallet loaded');

// Global function để test
window.debugAddToWallet = function() {
    console.log('🔧 Testing addToWallet function...');
    
    // Kiểm tra các dependencies
    console.log('📋 Checking dependencies:');
    console.log('- window.addToWallet:', typeof window.addToWallet);
    console.log('- window.PPOBlockchainIntegration:', typeof window.PPOBlockchainIntegration);
    console.log('- window.systemIntegration:', typeof window.systemIntegration);
    console.log('- window.blockchain:', typeof window.blockchain);
    
    // Kiểm tra nút
    const addToWalletBtn = document.getElementById('addToWalletBtn');
    console.log('- addToWalletBtn:', addToWalletBtn);
    
    if (addToWalletBtn) {
        console.log('- addToWalletBtn.onclick:', addToWalletBtn.onclick);
        console.log('- addToWalletBtn.getAttribute("onclick"):', addToWalletBtn.getAttribute('onclick'));
    }
    
    // Thử gọi function nếu có
    if (typeof window.addToWallet === 'function') {
        console.log('✅ addToWallet function exists, calling it...');
        try {
            window.addToWallet();
        } catch (error) {
            console.error('❌ Error calling addToWallet:', error);
        }
    } else {
        console.log('❌ addToWallet function not found');
        
        // Thử tạo function fallback
        console.log('🔧 Creating fallback addToWallet function...');
        window.addToWallet = async function() {
            console.log('🔄 Fallback addToWallet called');
            
            // Priority: Real Blockchain > PPOBlockchain > PPOBlockchainIntegration > systemIntegration
            if (window.RealBlockchain && typeof window.RealBlockchain.addToWallet === 'function') {
                console.log('✅ RealBlockchain found, calling addToWallet...');
                try {
                    return await window.RealBlockchain.addToWallet();
                } catch (error) {
                    console.error('❌ Error calling RealBlockchain.addToWallet:', error);
                }
            } else if (window.PPOBlockchain && typeof window.PPOBlockchain.addToWallet === 'function') {
                console.log('✅ PPOBlockchain found, calling addToWallet...');
                try {
                    return await window.PPOBlockchain.addToWallet();
                } catch (error) {
                    console.error('❌ Error calling PPOBlockchain.addToWallet:', error);
                }
            } else if (window.PPOBlockchainIntegration && typeof window.PPOBlockchainIntegration.addToWallet === 'function') {
                console.log('✅ PPOBlockchainIntegration found, calling addToWallet...');
                try {
                    return await window.PPOBlockchainIntegration.addToWallet();
                } catch (error) {
                    console.error('❌ Error calling PPOBlockchainIntegration.addToWallet:', error);
                }
            } else if (window.systemIntegration && window.systemIntegration.blockchain) {
                console.log('✅ systemIntegration.blockchain found, calling addToWallet...');
                try {
                    return await window.systemIntegration.blockchain.addToWallet();
                } catch (error) {
                    console.error('❌ Error calling systemIntegration.blockchain.addToWallet:', error);
                }
            } else {
                console.log('❌ No blockchain integration found');
                alert('Blockchain integration not available. Please refresh the page.');
            }
        };
        
        console.log('✅ Fallback addToWallet function created');
    }
};

// Auto-test khi page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Debug Add To Wallet: DOM ready');
    
    // Đợi một chút để các script khác load
    setTimeout(() => {
        console.log('🔧 Debug Add To Wallet: Running auto-test...');
        window.debugAddToWallet();
    }, 2000);
});

// Thêm nút debug vào page
setTimeout(() => {
    const debugBtn = document.createElement('button');
    debugBtn.textContent = '🔧 Debug Add To Wallet';
    debugBtn.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 10000;
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
    `;
    debugBtn.onclick = window.debugAddToWallet;
    document.body.appendChild(debugBtn);
    console.log('🔧 Debug button added to page');
}, 1000);

console.log('✅ Debug Add To Wallet ready');
