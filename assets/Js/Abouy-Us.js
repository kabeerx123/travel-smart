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
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Timeline animation
        function checkTimelineItems() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (itemTop < windowHeight * 0.85) {
                    item.classList.add('visible');
                }
            });
        }
        
        // Initial check on page load
        window.addEventListener('load', checkTimelineItems);
        
        // Check on scroll
        window.addEventListener('scroll', checkTimelineItems);
        
        // Counter animation for stats
        function animateCounter(element, target, duration) {
            let startTime = null;
            const startValue = 0;
            
            function animationStep(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * (target - startValue) + startValue);
                element.textContent = value.toLocaleString() + (element.id === 'stat4' ? '%' : '');
                
                if (progress < 1) {
                    window.requestAnimationFrame(animationStep);
                }
            }
            
            window.requestAnimationFrame(animationStep);
        }
        
        function checkStats() {
            const statSection = document.querySelector('.stats-section');
            const statSectionTop = statSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (statSectionTop < windowHeight * 0.75) {
                animateCounter(document.getElementById('stat1'), 13, 2000);
                animateCounter(document.getElementById('stat2'), 2500000, 2000);
                animateCounter(document.getElementById('stat3'), 120, 2000);
                animateCounter(document.getElementById('stat4'), 98, 2000);
                
                // Remove the event listener after animation triggers
                window.removeEventListener('scroll', checkStats);
            }
        }
        
        window.addEventListener('scroll', checkStats);