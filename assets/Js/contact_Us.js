    // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Add active class to clicked nav item
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Form validation and submission
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');
        const formSuccess = document.getElementById('formSuccess');
        const submitBtn = document.getElementById('submitBtn');
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Phone validation regex (allows international formats)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        // Name validation regex (letters and spaces only, no numbers)
        const nameRegex = /^[A-Za-z\s]+$/;
        
        // Validate form on submit
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            phoneError.style.display = 'none';
            messageError.style.display = 'none';
            nameInput.parentElement.classList.remove('error');
            emailInput.parentElement.classList.remove('error');
            phoneInput.parentElement.classList.remove('error');
            messageInput.parentElement.classList.remove('error');
            
            // Validate name (no numbers allowed)
            if (!nameRegex.test(nameInput.value.trim())) {
                nameError.style.display = 'block';
                nameInput.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                emailInput.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate phone
            if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneError.style.display = 'block';
                phoneInput.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                messageError.style.display = 'block';
                messageInput.parentElement.classList.add('error');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
        
        // Real-time validation
        nameInput.addEventListener('input', function() {
            // Remove any numbers from the name field
            this.value = this.value.replace(/[0-9]/g, '');
            
            if (!nameRegex.test(this.value.trim())) {
                nameError.style.display = 'block';
                this.parentElement.classList.add('error');
            } else {
                nameError.style.display = 'none';
                this.parentElement.classList.remove('error');
            }
        });
        
        emailInput.addEventListener('blur', function() {
            if (!emailRegex.test(this.value.trim())) {
                emailError.style.display = 'block';
                this.parentElement.classList.add('error');
            } else {
                emailError.style.display = 'none';
                this.parentElement.classList.remove('error');
            }
        });
        
        phoneInput.addEventListener('blur', function() {
            if (!phoneRegex.test(this.value.trim())) {
                phoneError.style.display = 'block';
                this.parentElement.classList.add('error');
            } else {
                phoneError.style.display = 'none';
                this.parentElement.classList.remove('error');
            }
        });
        
        messageInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                messageError.style.display = 'block';
                this.parentElement.classList.add('error');
            } else {
                messageError.style.display = 'none';
                this.parentElement.classList.remove('error');
            }
        });
        
        // Prevent numbers from being entered in the name field
        nameInput.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            // Allow only letters and spaces
            if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) {
                e.preventDefault();
            }
        });
        