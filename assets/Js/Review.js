  // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Star rating interaction
        const stars = document.querySelectorAll('.star-rating label');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.previousElementSibling.value;
                highlightStars(rating);
                document.getElementById('ratingError').style.display = 'none';
            });
            
            star.addEventListener('mouseover', function() {
                const rating = this.previousElementSibling.value;
                highlightStars(rating);
            });
        });
        
        function highlightStars(rating) {
            stars.forEach(star => {
                const starValue = star.previousElementSibling.value;
                if (starValue <= rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
        
        // Form validation and submission handling
        const reviewForm = document.getElementById('reviewForm');
        const successNotification = document.getElementById('successNotification');
        const errorNotification = document.getElementById('errorNotification');
        const submitBtn = document.getElementById('submitBtn');
        
        // Ensure notifications are hidden on page load
        successNotification.style.display = 'none';
        errorNotification.style.display = 'none';
        
        // Helper function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Helper function to validate name (letters only)
        function isValidName(name) {
            const nameRegex = /^[A-Za-z\s]+$/;
            return nameRegex.test(name);
        }
        
        // Validate form on submit
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            hideAllErrors();
            errorNotification.style.display = 'none';
            
            // Get form values
            const name = document.getElementById('reviewerName').value.trim();
            const email = document.getElementById('reviewerEmail').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked');
            const title = document.getElementById('reviewTitle').value.trim();
            const reviewText = document.getElementById('reviewText').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('reviewerName', 'nameError', 'Please enter your name');
                isValid = false;
            } else if (!isValidName(name)) {
                showError('reviewerName', 'nameError', 'Name can only contain letters and spaces');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('reviewerEmail', 'emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('reviewerEmail', 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate rating
            if (!rating) {
                document.getElementById('ratingError').style.display = 'block';
                isValid = false;
            }
            
            // Validate title
            if (title === '') {
                showError('reviewTitle', 'titleError', 'Please enter a title for your review');
                isValid = false;
            }
            
            // Validate review text
            if (reviewText === '') {
                showError('reviewText', 'reviewError', 'Please write your review');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - show success message
                successNotification.style.display = 'block';
                errorNotification.style.display = 'none';
                
                // Disable submit button to prevent multiple submissions
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
                
                // Reset form after 3 seconds (simulate submission)
                setTimeout(function() {
                    reviewForm.reset();
                    stars.forEach(star => star.classList.remove('active'));
                    successNotification.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Review';
                }, 3000);
            } else {
                // Form has errors - show error message
                errorNotification.style.display = 'block';
                successNotification.style.display = 'none';
                
                // Scroll to first error
                const firstError = document.querySelector('.error-message[style="display: block"]') || 
                                  document.getElementById('ratingError');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Helper function to show error
        function showError(inputId, errorId, message) {
            document.getElementById(inputId).parentElement.classList.add('error');
            document.getElementById(errorId).textContent = message;
            document.getElementById(errorId).style.display = 'block';
        }
        
        // Helper function to hide all errors
        function hideAllErrors() {
            const errorElements = document.querySelectorAll('.error-message, .rating-error');
            errorElements.forEach(element => {
                element.style.display = 'none';
            });
            
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
            });
            
            document.getElementById('ratingError').style.display = 'none';
        }
        
        // Real-time validation for inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.parentElement.classList.remove('error');
                const errorId = this.id + 'Error';
                if (document.getElementById(errorId)) {
                    document.getElementById(errorId).style.display = 'none';
                }
                
                // Special case for email validation
                if (this.id === 'reviewerEmail' && this.value.trim() !== '' && !isValidEmail(this.value.trim())) {
                    showError('reviewerEmail', 'emailError', 'Please enter a valid email address');
                }
                
                // Special case for name validation
                if (this.id === 'reviewerName' && this.value.trim() !== '' && !isValidName(this.value.trim())) {
                    showError('reviewerName', 'nameError', 'Name can only contain letters and spaces');
                }
            });
        });