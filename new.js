document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the hero section
    const heroSection = document.getElementById('hero-section');

    // Get all the navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    // Add a click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default link behavior (scrolling)
            event.preventDefault();

            // Get the target section ID from the link's href attribute
            const targetId = this.getAttribute('href').substring(1);

            // Find the target section element
            const targetElement = document.getElementById(targetId);

            // If target id is empty do nothing, if not scroll to the section
            if(targetElement){
                // Hide the hero section
                if (heroSection) {
                    heroSection.style.display = 'none';
                }

                // Scroll to the target section with smooth scrolling
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust for header height
                    behavior: 'smooth'
                });
            } else {
                if (heroSection) {
                    heroSection.style.display = 'block';
                }
            }
        });
    });

    // Add the code below to the end of the navigation code to account to back to home function
    const logoElement = document.querySelector('nav img.logo');
    if (logoElement) {
        logoElement.addEventListener('click', function(event) {
             // Prevent the default link behavior (scrolling)
             event.preventDefault();
             if (heroSection) {
                heroSection.style.display = 'block';
             }

             window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation example
    const form = document.querySelector('#contact-form'); // Changed to ID selector
    if(form){  //only if a form is on page
       form.addEventListener('submit', function(event) {
           event.preventDefault(); // Prevent the default form submission

           let isValid = true; // Assume the form is valid initially

           // Get the values of the name, email, and message input fields
           const nameInput = document.querySelector('#name');
           const emailInput = document.querySelector('#email');
           const messageInput = document.querySelector('#message');

           // Validate the name field
           if (nameInput.value.trim() === '') {
               alert('Name is required');
               isValid = false;
              // event.preventDefault(); // Prevent form submission
           }

           // Validate the email field
           if (emailInput.value.trim() === '') {
               alert('Email is required');
               isValid = false;
               //event.preventDefault(); // Prevent form submission
           } else if (!isValidEmail(emailInput.value.trim())) {
               alert('Invalid email format');
               isValid = false;
               //event.preventDefault(); // Prevent form submission
           }

           // Validate the message field
           if (messageInput.value.trim() === '') {
               alert('Message is required');
               isValid = false;
              // event.preventDefault(); // Prevent form submission
           }

           // If the form is valid show an alert to the user
           if (isValid) {
               alert('Thank you for your message! We will get back to you soon.');
                // Reset the form after successful submission
                form.reset();
           }

           // Function to validate email format using a simple regex
           function isValidEmail(email) {
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               return emailRegex.test(email);
           }
       });
    }

    // JavaScript for the menu icon functionality
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon){
        menuIcon.addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
    }

  // Get all event links and modals
  const eventLinks = document.querySelectorAll('.event-link');
  const modals = document.querySelectorAll('.modal');

  // Attach event listeners to each event link
  eventLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default link behavior

          const targetId = this.getAttribute('href'); // Get the target modal ID

          // Find the target modal
          const targetModal = document.querySelector(targetId);

          // If modal is found, show it
          if (targetModal) {
              targetModal.style.display = "block"; // Show the modal
          }
      });
  });

  // Get all close buttons
  const closeButtons = document.querySelectorAll('.close');

  // Attach event listeners to each close button
  closeButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Find the parent modal and hide it
          const parentModal = this.closest('.modal');

          if (parentModal) {
              parentModal.style.display = "none"; // Hide the modal
          }
      });
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', function(event) {
      modals.forEach(modal => {
          if (event.target == modal) {
              modal.style.display = "none"; // Hide the modal
          }
      });
  });

    // --- What We Offer Section ---
    const offerNavItems = document.querySelectorAll('.offer-nav-item');
    const offerSections = document.querySelectorAll('.offer-section');

    offerNavItems.forEach(item => {
      item.addEventListener('click', function() {
        // Hide all offer sections
        offerSections.forEach(section => {
          section.classList.add('hidden');
        });

        // Show the selected section
        const sectionId = this.dataset.section;
        document.getElementById(sectionId).classList.remove('hidden');
      });
    });
});