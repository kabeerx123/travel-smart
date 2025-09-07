// Global variable to store trips data
let tripsData = null;

// Function to fetch trips data from JSON file
async function fetchTripsData() {
    try {
        const response = await fetch('/assets/data/trips-data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch trips data');
        }
        tripsData = await response.json();
        return tripsData;
    } catch (error) {
        console.error('Error fetching trips data:', error);
        // Fallback to empty data structure
        return { trips: [] };
    }
}

// Function to display trips
function displayTrips(trips) {
    const tripCatalog = document.getElementById('trip-catalog');
    tripCatalog.innerHTML = '';

    if (trips.length === 0) {
        tripCatalog.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No trips found</h3>
                <p>Try adjusting your filters to find more options.</p>
                <button class="trip-btn reset-filters-btn">Reset Filters</button>
            </div>
        `;

        document.querySelector('.reset-filters-btn').addEventListener('click', () => {
            document.querySelectorAll('.filter-group select').forEach(select => {
                select.value = '';
            });
            if (tripsData) {
                displayTrips(tripsData.trips);
            }
        });

        return;
    }

    trips.forEach(trip => {
        const stars = generateStarRating(trip.rating);

        const tripCard = document.createElement('div');
        tripCard.className = 'trip-card';
        tripCard.innerHTML = `
            <div class="trip-gallery">
                <img src="${trip.images[0]}" alt="${trip.destination}" class="trip-main-image">
                <div class="trip-thumbnails">
                    ${trip.images.map((img, index) => `
                        <img src="${img}" alt="Thumbnail ${index + 1}" class="trip-thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                    `).join('')}
                </div>
                <div class="trip-price">From $${trip.price}</div>
            </div>
            <div class="trip-content">
                <h3 class="trip-title">${trip.destination}</h3>
                <p class="trip-description">${trip.description}</p>
                
                <div class="trip-details">
                    <div class="trip-detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Duration: ${trip.duration}</span>
                    </div>
                    <div class="trip-detail-item">
                        <i class="fas fa-calendar-check"></i>
                        <span>Best Time: ${trip.bestTime}</span>
                    </div>
                </div>
                
                <div class="trip-activities">
                    <h4 class="trip-subtitle">Activities</h4>
                    <div class="trip-tags">
                        ${trip.activities.map(activity => `
                            <span class="trip-tag">${activity}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="trip-attractions">
                    <h4 class="trip-subtitle">Attractions</h4>
                    <div class="trip-tags">
                        ${trip.attractions.map(attraction => `
                            <span class="trip-tag">${attraction}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="trip-actions">
                    <div class="trip-rating">
                        ${stars}
                    </div>
                    <button class="trip-btn">Book Now</button>
                </div>
            </div>
        `;

        tripCatalog.appendChild(tripCard);

        // Add event listeners for thumbnail images
        const thumbnails = tripCard.querySelectorAll('.trip-thumbnail');
        const mainImage = tripCard.querySelector('.trip-main-image');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.dataset.image;

                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    });
}

// Function to generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Function to filter trips
function filterTrips() {
    if (!tripsData) return;
    
    const destinationFilter = document.getElementById('destination').value;
    const priceFilter = document.getElementById('price-range').value;
    const activityFilter = document.getElementById('activities').value;

    const filteredTrips = tripsData.trips.filter(trip => {
        // Filter by destination
        if (destinationFilter && !trip.destination.toLowerCase().includes(destinationFilter)) {
            return false;
        }

        // Filter by price
        if (priceFilter) {
            const [min, max] = priceFilter.split('-');
            if (max === '+') {
                if (trip.price < parseInt(min)) return false;
            } else {
                if (trip.price < parseInt(min) || trip.price > parseInt(max)) return false;
            }
        }

        // Filter by activity
        if (activityFilter && !trip.activities.some(activity =>
            activity.toLowerCase().includes(activityFilter))) {
            return false;
        }

        return true;
    });

    displayTrips(filteredTrips);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    // Show loading state
    const tripCatalog = document.getElementById('trip-catalog');
    tripCatalog.innerHTML = `
        <div class="loading-indicator" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #D4AF37;"></i>
            <p style="color: #b0b0b0; margin-top: 20px;">Loading trips...</p>
        </div>
    `;
    
    // Fetch trips data
    tripsData = await fetchTripsData();
    
    // Display all trips
    displayTrips(tripsData.trips);

    // Add event listeners for filters
    document.querySelector('.apply-btn').addEventListener('click', filterTrips);
    document.querySelector('.reset-btn').addEventListener('click', () => {
        document.querySelectorAll('.filter-group select').forEach(select => {
            select.value = '';
        });
        displayTrips(tripsData.trips);
    });

    // Mobile menu toggle
    document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
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
});