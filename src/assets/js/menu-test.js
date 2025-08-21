// Menu Test Script
console.log('🧪 Menu Test Script loaded');

function testMenuFunctionality() {
    console.log('🔍 Testing menu functionality...');
    
    // Test 1: Check if menu container exists
    const menuContainer = document.getElementById('optimizedMenu');
    if (!menuContainer) {
        console.error('❌ Menu container not found!');
        return false;
    }
    console.log('✅ Menu container found');
    
    // Test 2: Check if menu items exist
    const menuItems = menuContainer.querySelectorAll('.menu-item');
    console.log(`✅ Found ${menuItems.length} menu items`);
    
    // Test 3: Check dropdown functionality
    const dropdownToggles = document.querySelectorAll('.offcanvas .dropdown-toggle');
    console.log(`✅ Found ${dropdownToggles.length} dropdown toggles`);
    
    // Test 4: Add test click events
    menuItems.forEach((item, index) => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                console.log(`🖱️ Menu item ${index + 1} clicked:`, link.textContent.trim());
            });
        }
    });
    
    // Test 5: Test dropdown toggles
    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', (e) => {
            console.log(`🖱️ Dropdown toggle ${index + 1} clicked:`, toggle.textContent.trim());
        });
    });
    
    console.log('✅ Menu functionality test completed');
    return true;
}

// Run test when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testMenuFunctionality);
} else {
    testMenuFunctionality();
}

// Also test after a delay
setTimeout(testMenuFunctionality, 2000);

console.log('✅ Menu Test Script ready');
