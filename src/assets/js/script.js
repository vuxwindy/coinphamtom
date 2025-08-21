(function($) {

  "use strict";

  // Tab Section
  var initTabs = function(){
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

    // Initialize Swiper only if it exists and element exists
if (typeof Swiper !== 'undefined' && document.querySelector(".product-swiper")) {
  var swiper = new Swiper(".product-swiper", {
    slidesPerView: 3,
    spaceBetween: 50,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      699: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
}

// ========================================
// ADMIN ACCESS FUNCTIONS (GLOBAL)
// ========================================

// Handle admin button click (hidden button) - GLOBAL FUNCTION
let adminClickCount = 0;
let adminClickTimer = null;

window.handleAdminButtonClick = function() {
    console.log('Admin button clicked! Count:', adminClickCount + 1);
    adminClickCount++;
    
    // Clear existing timer
    if (adminClickTimer) {
        clearTimeout(adminClickTimer);
    }
    
    // Set timer to reset click count
    adminClickTimer = setTimeout(() => {
        console.log('Timer reset - click count reset to 0');
        adminClickCount = 0;
    }, 2000);
    
    // Check if triple click
    if (adminClickCount >= 3) {
        console.log('Triple click detected! Redirecting to admin panel...');
        adminClickCount = 0;
        if (adminClickTimer) {
            clearTimeout(adminClickTimer);
        }
        
        // Redirect to admin panel
        window.location.href = 'admin/123123.html';
    }
}



// ========================================
// JQUERY FUNCTIONS
// ========================================

// document ready
  $(document).ready(function(){
    initTabs();

    window.addEventListener("load", (event) => {
      //isotope
      $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry'
      });



      // Initialize Isotope
      var $container = $('.isotope-container').isotope({
        // options
        itemSelector: '.item',
        layoutMode: 'masonry'
      });

      $(document).ready(function () {
        //active button
        $('.filter-button').click(function () {
          $('.filter-button').removeClass('active');
          $(this).addClass('active');
        });
      });

      // Filter items on button click
      $('.filter-button').click(function () {
        var filterValue = $(this).attr('data-filter');
        if (filterValue === '*') {
          // Show all items
          $container.isotope({ filter: '*' });
        } else {
          // Show filtered items
          $container.isotope({ filter: filterValue });
        }
      });

    });
  });

})(jQuery);