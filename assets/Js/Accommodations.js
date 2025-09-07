document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const destinationContents = document.querySelectorAll('.destination-content');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            destinationContents.forEach(content => content.classList.remove('active'));
            
            // Activate clicked button and corresponding content
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            button.classList.add('active');
            targetContent.classList.add('active');
        });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would normally filter the accommodations
            // For this example, we'll just show a message
            alert(`Filtering by: ${button.textContent}`);
        });
    });
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // If search is empty, show all cards and remove any "not found" messages
        if (searchTerm === '') {
            document.querySelectorAll('.accommodation-card').forEach(card => {
                card.style.display = 'block';
            });
            
            // Remove any existing "not found" messages
            document.querySelectorAll('.no-results-message').forEach(msg => {
                msg.remove();
            });
            
            return;
        }
        
        let foundResults = false;
        
        // Search through all accommodation cards
        document.querySelectorAll('.accommodation-card').forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            const cardType = card.querySelector('.accommodation-type').textContent.toLowerCase();
            const cardDestination = card.closest('.destination-content').querySelector('h3').textContent.toLowerCase();
            
            // Check if search term matches any of the card's content
            if (cardTitle.includes(searchTerm) || 
                cardDescription.includes(searchTerm) || 
                cardType.includes(searchTerm) ||
                cardDestination.includes(searchTerm)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Remove any existing "not found" messages
        document.querySelectorAll('.no-results-message').forEach(msg => {
            msg.remove();
        });
        
        // If no results found, display a message
        if (!foundResults) {
            const activeDestination = document.querySelector('.destination-content.active');
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #b0b0b0;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <h3>No accommodations found for "${searchTerm}"</h3>
                    <p>Try searching with different keywords or browse our destinations.</p>
                </div>
            `;
            
            // Insert the message after the destination title
            const destinationTitle = activeDestination.querySelector('h3');
            destinationTitle.parentNode.insertBefore(noResultsMessage, destinationTitle.nextSibling);
        }
    }
    
    // Add event listeners for search
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add input event listener to clear search when input is empty
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            performSearch();
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
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
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
});

// Add input event listener to clear search when input is empty
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        performSearch();
    }
});