 // Initialize Swiper
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        
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
        
        // Countdown timer
        function updateCountdown() {
            const days = document.getElementById('days');
            const hours = document.getElementById('hours');
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            
            let daysVal = parseInt(days.textContent);
            let hoursVal = parseInt(hours.textContent);
            let minutesVal = parseInt(minutes.textContent);
            let secondsVal = parseInt(seconds.textContent);
            
            secondsVal--;
            
            if (secondsVal < 0) {
                secondsVal = 59;
                minutesVal--;
                
                if (minutesVal < 0) {
                    minutesVal = 59;
                    hoursVal--;
                    
                    if (hoursVal < 0) {
                        hoursVal = 23;
                        daysVal--;
                        
                        if (daysVal < 0) {
                            daysVal = 0;
                            hoursVal = 0;
                            minutesVal = 0;
                            secondsVal = 0;
                        }
                    }
                }
            }
            
            days.textContent = daysVal.toString().padStart(2, '0');
            hours.textContent = hoursVal.toString().padStart(2, '0');
            minutes.textContent = minutesVal.toString().padStart(2, '0');
            seconds.textContent = secondsVal.toString().padStart(2, '0');
        }
        
        setInterval(updateCountdown, 1000);
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchResults = document.getElementById('searchResults');
        
        // Sample search data
        const searchData = [
            { title: "Bali Vacation Package", category: "Destination", url: "#" },
            { title: "Paris City Tour", category: "Activity", url: "#" },
            { title: "Santorini Luxury Resort", category: "Accommodation", url: "#" },
            { title: "Tokyo Flight Deals", category: "Transport", url: "#" },
            { title: "Beach Getaway Specials", category: "Trip", url: "#" },
            { title: "Adventure Travel Guide", category: "Blog", url: "#" },
            { title: "Family Vacation Ideas", category: "Tips", url: "#" },
            { title: "Romantic Honeymoon Packages", category: "Trip", url: "#" }
        ];
        
        // Function to perform search
        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            
            if (query === '') {
                searchResults.classList.remove('active');
                return;
            }
            
            const filteredResults = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );
            
            if (filteredResults.length > 0) {
                filteredResults.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `
                        <h4>${result.title}</h4>
                        <span>${result.category}</span>
                    `;
                    resultItem.addEventListener('click', () => {
                        window.location.href = result.url;
                    });
                    searchResults.appendChild(resultItem);
                });
                searchResults.classList.add('active');
            } else {
                const noResults = document.createElement('div');
                noResults.className = 'search-result-item';
                noResults.textContent = 'No results found';
                searchResults.appendChild(noResults);
                searchResults.classList.add('active');
            }
        }
        
        // Event listeners for search
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.search-box')) {
                searchResults.classList.remove('active');
            }
        });