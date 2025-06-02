// navbar.js
function initializeNavbar() {
  console.log('Initializing navbar');
  if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded');
    return;
  }
  if (!$.fn.modal) {
    console.error('Bootstrap modal plugin is not loaded');
    return;
  }

  const navLinks = document.querySelectorAll('.nav-link');
  console.log('Found', navLinks.length, 'nav links');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      const isModalTrigger = this.getAttribute('data-bs-toggle') === 'modal';
      const isChargebeePortal = this.getAttribute('data-cb-type') === 'portal';
      console.log('Clicked link:', href, 'Modal trigger:', isModalTrigger, 'Chargebee portal:', isChargebeePortal);

      if (isChargebeePortal) {
        event.preventDefault();
        const $existingCustomersModal = $('#existingCustomersModal');
        $existingCustomersModal.modal('hide');

        $existingCustomersModal.on('hidden.bs.modal', function() {
          console.log('Modal hidden, redirecting to Chargebee portal');
          window.location.href = 'https://more4lessplans.chargebeeportal.com/portal/login';
        });
      } else if (!isModalTrigger && href && href !== '#') {
        event.preventDefault();
        const $mobileMenuModal = $('#mobileMenuModal');
        if ($mobileMenuModal.length) {
          console.log('Closing mobile menu modal');
          $mobileMenuModal.modal('hide');
        }
        setTimeout(() => {
          console.log('Navigating to:', href);
          window.location.href = href;
        }, 300);
      }
    });
  });
}