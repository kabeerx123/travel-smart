   // Sample JSON data for transport options
        const transportData = {
            "flights": [
                {
                    "id": 1,
                    "airline": "Sky Airways",
                    "flightNo": "SA231",
                    "from": "New York (JFK)",
                    "to": "Paris (CDG)",
                    "departure": "2023-12-15T08:30:00",
                    "arrival": "2023-12-15T21:45:00",
                    "duration": "8h 15m",
                    "price": 549,
                    "stops": 0,
                    "aircraft": "Boeing 787"
                },
                {
                    "id": 2,
                    "airline": "Ocean Airlines",
                    "flightNo": "OA456",
                    "from": "London (LHR)",
                    "to": "Bali (DPS)",
                    "departure": "2023-12-18T14:20:00",
                    "arrival": "2023-12-19T13:10:00",
                    "duration": "16h 50m",
                    "price": 789,
                    "stops": 1,
                    "aircraft": "Airbus A350"
                },
                {
                    "id": 3,
                    "airline": "Global Flyers",
                    "flightNo": "GF789",
                    "from": "Los Angeles (LAX)",
                    "to": "Tokyo (HND)",
                    "departure": "2023-12-20T10:15:00",
                    "arrival": "2023-12-21T14:30:00",
                    "duration": "12h 15m",
                    "price": 675,
                    "stops": 0,
                    "aircraft": "Boeing 777"
                },
                {
                    "id": 4,
                    "airline": "Euro Wings",
                    "flightNo": "EW101",
                    "from": "Berlin (BER)",
                    "to": "Rome (FCO)",
                    "departure": "2023-12-22T09:45:00",
                    "arrival": "2023-12-22T11:30:00",
                    "duration": "1h 45m",
                    "price": 129,
                    "stops": 0,
                    "aircraft": "Airbus A320"
                }
            ],
            "trains": [
                {
                    "id": 1,
                    "operator": "EuroRail Express",
                    "trainNo": "EE345",
                    "from": "Paris Nord",
                    "to": "Brussels Midi",
                    "departure": "2023-12-15T09:15:00",
                    "arrival": "2023-12-15T11:30:00",
                    "duration": "2h 15m",
                    "price": 89,
                    "class": "First Class",
                    "trainType": "High Speed"
                },
                {
                    "id": 2,
                    "operator": "Alpine Railways",
                    "trainNo": "AR672",
                    "from": "Zurich HB",
                    "to": "Vienna HBF",
                    "departure": "2023-12-17T08:00:00",
                    "arrival": "2023-12-17T13:45:00",
                    "duration": "5h 45m",
                    "price": 145,
                    "class": "First Class",
                    "trainType": "Intercity"
                },
                {
                    "id": 3,
                    "operator": "UK Rail",
                    "trainNo": "UK891",
                    "from": "London Kings Cross",
                    "to": "Edinburgh Waverley",
                    "departure": "2023-12-19T07:30:00",
                    "arrival": "2023-12-19T11:45:00",
                    "duration": "4h 15m",
                    "price": 125,
                    "class": "Standard",
                    "trainType": "High Speed"
                },
                {
                    "id": 4,
                    "operator": "Sunset Express",
                    "trainNo": "SE223",
                    "from": "San Francisco",
                    "to": "Los Angeles",
                    "departure": "2023-12-21T10:00:00",
                    "arrival": "2023-12-21T18:30:00",
                    "duration": "8h 30m",
                    "price": 99,
                    "class": "Business",
                    "trainType": "Coastal"
                }
            ],
            "buses": [
                {
                    "id": 1,
                    "operator": "GreenLine Bus",
                    "busNo": "GL101",
                    "from": "New York Port Authority",
                    "to": "Boston South Station",
                    "departure": "2023-12-16T08:00:00",
                    "arrival": "2023-12-16T12:30:00",
                    "duration": "4h 30m",
                    "price": 35,
                    "amenities": ["WiFi", "Power Outlets", "Restroom"]
                },
                {
                    "id": 2,
                    "operator": "EuroLines",
                    "busNo": "EL205",
                    "from": "Amsterdam Sloterdijk",
                    "to": "Berlin ZOB",
                    "departure": "2023-12-18T10:30:00",
                    "arrival": "2023-12-18T18:45:00",
                    "duration": "8h 15m",
                    "price": 49,
                    "amenities": ["WiFi", "Power Outlets", "Restroom", "Snacks"]
                },
                {
                    "id": 3,
                    "operator": "Sunshine Coaches",
                    "busNo": "SC409",
                    "from": "Los Angeles Downtown",
                    "to": "Las Vegas Strip",
                    "departure": "2023-12-20T09:00:00",
                    "arrival": "2023-12-20T14:15:00",
                    "duration": "5h 15m",
                    "price": 45,
                    "amenities": ["WiFi", "Power Outlets", "Restroom", "Entertainment"]
                },
                {
                    "id": 4,
                    "operator": "Mountain Express",
                    "busNo": "ME512",
                    "from": "Denver Union Station",
                    "to": "Salt Lake City Central",
                    "departure": "2023-12-22T07:45:00",
                    "arrival": "2023-12-22T16:30:00",
                    "duration": "8h 45m",
                    "price": 65,
                    "amenities": ["WiFi", "Power Outlets", "Restroom", "Comfort Seats"]
                }
            ]
        };

        // Function to display transport options
        function displayTransport(type) {
            const gridElement = document.getElementById(`${type}-grid`);
            gridElement.innerHTML = '';
            
            transportData[type].forEach(item => {
                const card = document.createElement('div');
                card.className = 'transport-card';
                
                if (type === 'flights') {
                    card.innerHTML = `
                        <div class="transport-header">
                            <div class="transport-icon">
                                <i class="fas fa-plane"></i>
                            </div>
                            <div>
                                <h3 class="transport-title">${item.airline}</h3>
                                <p class="transport-company">Flight ${item.flightNo}</p>
                            </div>
                        </div>
                        
                        <div class="transport-details">
                            <div class="transport-detail">
                                <span class="detail-label">Route</span>
                                <span class="detail-value">${item.from} → ${item.to}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Departure</span>
                                <span class="detail-value">${new Date(item.departure).toLocaleString()}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Arrival</span>
                                <span class="detail-value">${new Date(item.arrival).toLocaleString()}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Duration</span>
                                <span class="detail-value">${item.duration}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Aircraft</span>
                                <span class="detail-value">${item.aircraft}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Stops</span>
                                <span class="detail-value">${item.stops} ${item.stops === 1 ? 'stop' : 'stops'}</span>
                            </div>
                        </div>
                        
                        <div class="transport-detail">
                            <span class="detail-label">Price</span>
                            <span class="price">$${item.price}</span>
                        </div>
                        
                        <button class="btn">Book Flight</button>
                    `;
                } else if (type === 'trains') {
                    card.innerHTML = `
                        <div class="transport-header">
                            <div class="transport-icon">
                                <i class="fas fa-train"></i>
                            </div>
                            <div>
                                <h3 class="transport-title">${item.operator}</h3>
                                <p class="transport-company">Train ${item.trainNo}</p>
                            </div>
                        </div>
                        
                        <div class="transport-details">
                            <div class="transport-detail">
                                <span class="detail-label">Route</span>
                                <span class="detail-value">${item.from} → ${item.to}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Departure</span>
                                <span class="detail-value">${new Date(item.departure).toLocaleString()}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Arrival</span>
                                <span class="detail-value">${new Date(item.arrival).toLocaleString()}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Duration</span>
                                <span class="detail-value">${item.duration}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Class</span>
                                <span class="detail-value">${item.class}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Train Type</span>
                                <span class="detail-value">${item.trainType}</span>
                            </div>
                        </div>
                        
                        <div class="transport-detail">
                            <span class="detail-label">Price</span>
                            <span class="price">$${item.price}</span>
                        </div>
                        
                        <button class="btn">Book Train</button>
                    `;
                } else if (type === 'buses') {
                    card.innerHTML = `
                        <div class="transport-header">
                            <div class="transport-icon">
                                <i class="fas fa-bus"></i>
                            </div>
                            <div>
                                <h3 class="transport-title">${item.operator}</h3>
                                <p class="transport-company">Bus ${item.busNo}</p>
                            </div>
                        </div>
                        
                        <div class="transport-details">
                            <div class="transport-detail">
                                <span class="detail-label">Route</span>
                                <span class="detail-value">${item.from} → ${item.to}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Departure</span>
                                <span class="detail-value">${new Date(item.departure).toLocaleString()}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Arrival</span>
                                <span class="detail-value">${new Date(item.arrival).toLocaleString()}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Duration</span>
                                <span class="detail-value">${item.duration}</span>
                            </div>
                            <div class="transport-detail">
                                <span class="detail-label">Amenities</span>
                                <span class="detail-value">${item.amenities.join(', ')}</span>
                            </div>
                        </div>
                        
                        <div class="transport-detail">
                            <span class="detail-label">Price</span>
                            <span class="price">$${item.price}</span>
                        </div>
                        
                        <button class="btn">Book Bus</button>
                    `;
                }
                
                gridElement.appendChild(card);
            });
        }
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            // Display flights by default
            displayTransport('flights');
            
            // Add event listeners for tabs
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.transport-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.dataset.tab;
                    
                    // Update active tab
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Show active content
                    tabContents.forEach(content => content.classList.remove('active'));
                    document.getElementById(`${tabId}-content`).classList.add('active');
                    
                    // Load data for the selected tab
                    displayTransport(tabId);
                });
            });
            
            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
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