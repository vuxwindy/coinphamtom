// Offcanvas Dropdown Handler
console.log('📱 Offcanvas Dropdown Handler loaded');

function initOffcanvasDropdown() {
    console.log('🚀 Initializing Offcanvas Dropdown...');
    
    // Wait for menu to be created
    setTimeout(() => {
        const dropdownToggles = document.querySelectorAll('.offcanvas .dropdown-toggle');
        console.log('🔍 Found dropdown toggles:', dropdownToggles.length);
        
        dropdownToggles.forEach((toggle, index) => {
            console.log(`🎯 Setting up dropdown ${index + 1}:`, toggle.textContent.trim());
            
            // Remove existing event listeners
            toggle.removeEventListener('click', handleDropdownClick);
            
            // Add new event listener
            toggle.addEventListener('click', handleDropdownClick);
        });
        
        console.log('✅ Offcanvas dropdown handlers initialized');
    }, 2000);
}

function handleDropdownClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const toggle = e.currentTarget;
    const dropdownMenu = toggle.nextElementSibling;
    
    console.log('🖱️ Dropdown clicked:', toggle.textContent.trim());
    
    if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
        const isVisible = dropdownMenu.style.display === 'block';
        
        // Close all other dropdowns first
        const allDropdowns = document.querySelectorAll('.offcanvas .dropdown-menu');
        allDropdowns.forEach(menu => {
            menu.style.display = 'none';
        });
        
        // Toggle current dropdown
        dropdownMenu.style.display = isVisible ? 'none' : 'block';
        
        console.log(`📂 Dropdown ${isVisible ? 'closed' : 'opened'}:`, toggle.textContent.trim());
        
        // Add visual feedback
        if (isVisible) {
            toggle.classList.remove('active');
        } else {
            toggle.classList.add('active');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOffcanvasDropdown);
} else {
    initOffcanvasDropdown();
}

// Also try after delays
setTimeout(initOffcanvasDropdown, 1000);
setTimeout(initOffcanvasDropdown, 3000);

console.log('✅ Offcanvas Dropdown Handler ready');
