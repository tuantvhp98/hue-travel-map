// Ứng dụng bản đồ Huế sử dụng OpenStreetMap và Leaflet.js
class HueMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.currentFilter = 'all';
        this.activePopup = null;
        this.markersLayer = null;
        this.routeLines = [];
        this.currentDay = 'day1';
        this.currentTab = 'locations';
        this.currentItinerary = 'classic';
        this.init();
    }

    init() {
        this.createMap();
        this.renderLocationsList();
        this.renderItinerary();
        this.addMarkersToMap();
        this.setupEventListeners();
    }

    createMap() {
        // Tạo bản đồ với trung tâm tại Huế
        this.map = L.map('map').setView([16.4637, 107.5847], 12);

        // Thêm tile layer OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Tạo layer group cho markers
        this.markersLayer = L.layerGroup().addTo(this.map);

        console.log('Map loaded successfully with OpenStreetMap');
    }

    addMarkersToMap() {
        // Xóa tất cả markers cũ
        this.markersLayer.clearLayers();
        this.markers = [];

        // Lọc địa điểm theo bộ lọc hiện tại
        const filteredLocations = this.currentFilter === 'all' 
            ? locations 
            : locations.filter(loc => loc.type === this.currentFilter);

        // Tạo markers cho từng địa điểm
        filteredLocations.forEach((location, index) => {
            this.createMarker(location, index);
        });

        // Fit bounds nếu có markers
        if (this.markers.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1), { maxZoom: 14 });
        }
    }

    createMarker(location, index) {
        // Tạo custom icon
        const customIcon = this.createCustomIcon(location);

        // Tạo marker với Leaflet
        const marker = L.marker([location.coordinates[1], location.coordinates[0]], {
            icon: customIcon,
            title: location.name
        });

        // Tạo popup content
        const popupContent = `
            <div class="popup-content">
                <h3 class="popup-title">${location.icon} ${location.name}</h3>
                <p class="popup-address">${location.address}</p>
                <div class="popup-actions">
                    <button class="btn-directions" onclick="getDirections(${location.coordinates[0]}, ${location.coordinates[1]}, '${location.name.replace(/'/g, "\\'")}')">
                        🧭 Chỉ đường
                    </button>
                </div>
            </div>
        `;

        // Bind popup
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });

        // Xử lý click vào marker
        marker.on('click', (e) => {
            // Highlight item trong danh sách
            this.highlightLocationItem(index);

            // Di chuyển camera đến marker
            this.map.setView([location.coordinates[1], location.coordinates[0]], 16, {
                animate: true,
                duration: 1
            });
        });

        // Hover effects với tooltip
        marker.on('mouseover', (e) => {
            // Tạo tooltip với thông tin địa điểm
            const tooltip = L.tooltip({
                permanent: false,
                direction: 'top',
                offset: [0, -50],
                className: 'custom-tooltip'
            }).setContent(`
                <div class="tooltip-content">
                    <strong>${location.icon} ${location.name}</strong>
                    <br>
                    <span class="tooltip-address">${location.address}</span>
                    <br>
                    <span class="tooltip-type type-${location.type}">${locationTypes[location.type]}</span>
                </div>
            `);
            
            marker.bindTooltip(tooltip).openTooltip();
            
            // Thêm class hover thay vì thay đổi style trực tiếp
            const markerElement = marker.getElement();
            if (markerElement) {
                markerElement.classList.add('marker-hover');
            }
        });

        marker.on('mouseout', (e) => {
            // Xóa tooltip
            marker.unbindTooltip();
            
            // Xóa class hover
            const markerElement = marker.getElement();
            if (markerElement) {
                markerElement.classList.remove('marker-hover');
            }
        });

        // Thêm marker vào layer và array
        this.markersLayer.addLayer(marker);
        this.markers.push(marker);
    }

    createCustomIcon(location) {
        // Tạo HTML cho icon
        const iconHtml = `
            <div class="custom-marker marker-${location.type}">
                <span class="marker-icon">${location.icon}</span>
            </div>
        `;

        // Tạo DivIcon
        return L.divIcon({
            html: iconHtml,
            className: 'custom-marker-container',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
    }

    renderLocationsList() {
        const listContainer = document.getElementById('locations-list');
        
        // Lọc địa điểm
        const filteredLocations = this.currentFilter === 'all' 
            ? locations 
            : locations.filter(loc => loc.type === this.currentFilter);

        if (filteredLocations.length === 0) {
            listContainer.innerHTML = '<div class="no-results">Không có địa điểm nào phù hợp</div>';
            return;
        }

        // Tạo HTML cho danh sách
        listContainer.innerHTML = filteredLocations.map((location, index) => `
            <div class="location-item" data-index="${index}" onclick="selectLocation(${index})">
                <div class="location-name">${location.icon} ${location.name}</div>
                <div class="location-address">${location.address}</div>
                <span class="location-type type-${location.type}">${locationTypes[location.type]}</span>
            </div>
        `).join('');
    }

    highlightLocationItem(index) {
        // Xóa highlight cũ
        document.querySelectorAll('.location-item').forEach(item => {
            item.classList.remove('active');
        });

        // Thêm highlight mới
        const item = document.querySelector(`[data-index="${index}"]`);
        if (item) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // Re-render
        this.renderLocationsList();
        this.addMarkersToMap();
    }

    selectLocation(index) {
        const filteredLocations = this.currentFilter === 'all' 
            ? locations 
            : locations.filter(loc => loc.type === this.currentFilter);
        
        const location = filteredLocations[index];
        if (!location) return;

        // Di chuyển đến địa điểm
        this.map.setView([location.coordinates[1], location.coordinates[0]], 16, {
            animate: true,
            duration: 1.5
        });

        // Mở popup của marker tương ứng
        setTimeout(() => {
            if (this.markers[index]) {
                this.markers[index].openPopup();
                this.highlightLocationItem(index);
            }
        }, 800);
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });

        // Itinerary day buttons - sẽ được setup trong setupItineraryEventListeners
        
        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all tabs
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                e.target.classList.add('active');
                const tabName = e.target.dataset.tab;
                document.getElementById(`${tabName}-tab`).classList.add('active');
                
                this.currentTab = tabName;
                
                if (tabName === 'itinerary') {
                    this.showItineraryRoute();
                } else {
                    this.clearRoutes();
                    this.addMarkersToMap();
                }
            });
        });

        // Itinerary selector - sẽ được setup trong setupItineraryEventListeners

        // Đóng highlight khi click vào bản đồ
        this.map.on('click', (e) => {
            // Chỉ xóa highlight nếu không click vào marker
            if (!e.originalEvent.target.closest('.custom-marker-container')) {
                document.querySelectorAll('.location-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }

    renderItinerary() {
        this.updateItineraryDescription();
        this.renderItineraryContent();
        this.setupItineraryEventListeners();
    }

    setupItineraryEventListeners() {
        // Setup itinerary day buttons
        document.querySelectorAll('.itinerary-btn').forEach(btn => {
            btn.removeEventListener('click', this.handleItineraryBtnClick);
            btn.addEventListener('click', this.handleItineraryBtnClick.bind(this));
        });

        // Setup itinerary selector
        const itinerarySelect = document.getElementById('itinerary-select');
        if (itinerarySelect) {
            itinerarySelect.removeEventListener('change', this.handleItinerarySelectChange);
            itinerarySelect.addEventListener('change', this.handleItinerarySelectChange.bind(this));
        }
    }

    handleItineraryBtnClick(e) {
        // Remove active class from all buttons
        document.querySelectorAll('.itinerary-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        
        this.currentDay = e.target.dataset.day;
        this.showItineraryRoute();
        this.updateItineraryContent();
    }

    handleItinerarySelectChange(e) {
        this.currentItinerary = e.target.value;
        this.updateItineraryDescription();
        this.updateItineraryContent();
        if (this.currentTab === 'itinerary') {
            this.showItineraryRoute();
        }
    }

    updateItineraryContent() {
        const container = document.getElementById('itinerary-content');
        if (!container) return;

        const currentItinerary = itineraries[this.currentItinerary];
        if (!currentItinerary) return;

        let html = '';

        if (this.currentDay === 'all-days') {
            // Hiển thị tất cả các ngày
            Object.keys(currentItinerary.itinerary).forEach(dayKey => {
                html += this.renderDayContent(dayKey, currentItinerary.itinerary[dayKey]);
            });
        } else {
            // Hiển thị ngày cụ thể
            const dayData = currentItinerary.itinerary[this.currentDay];
            if (dayData) {
                html = this.renderDayContent(this.currentDay, dayData);
            }
        }

        container.innerHTML = html;

        // Add click events to itinerary locations
        container.querySelectorAll('.itinerary-location').forEach(item => {
            item.addEventListener('click', () => {
                const locationName = item.dataset.location;
                this.focusOnLocation(locationName);
            });
        });
    }

    updateItineraryDescription() {
        const descContainer = document.getElementById('itinerary-description');
        if (descContainer && itineraries[this.currentItinerary]) {
            descContainer.textContent = itineraries[this.currentItinerary].description;
        }
    }

    renderItineraryContent() {
        const container = document.getElementById('itinerary-content');
        if (!container) return;

        const currentItinerary = itineraries[this.currentItinerary];
        if (!currentItinerary) return;

        let html = '';

        if (this.currentDay === 'all-days') {
            // Hiển thị tất cả các ngày
            Object.keys(currentItinerary.itinerary).forEach(dayKey => {
                html += this.renderDayContent(dayKey, currentItinerary.itinerary[dayKey]);
            });
        } else {
            // Hiển thị ngày cụ thể
            const dayData = currentItinerary.itinerary[this.currentDay];
            if (dayData) {
                html = this.renderDayContent(this.currentDay, dayData);
            }
        }

        container.innerHTML = html;

        // Add click events to itinerary locations
        container.querySelectorAll('.itinerary-location').forEach(item => {
            item.addEventListener('click', () => {
                const locationName = item.dataset.location;
                this.focusOnLocation(locationName);
            });
        });
    }

    renderDayContent(dayKey, dayData) {
        const dayNumber = dayKey.replace('day', '');
        const dayColors = {
            '1': '#e74c3c',
            '2': '#f39c12',
            '3': '#27ae60'
        };

        return `
            <div class="itinerary-day">
                <div class="itinerary-header" style="background: linear-gradient(45deg, ${dayColors[dayNumber]}, ${dayColors[dayNumber]}dd);">
                    <div class="itinerary-title">${dayData.title}</div>
                    <div class="itinerary-description">${dayData.description}</div>
                </div>
                ${dayData.locations.map((location, index) => {
                    let distanceInfo = '';
                    
                    // Tính khoảng cách đến địa điểm tiếp theo
                    if (index < dayData.locations.length - 1) {
                        const currentLocation = locations.find(loc => loc.name === location.location);
                        const nextLocation = locations.find(loc => loc.name === dayData.locations[index + 1].location);
                        
                        if (currentLocation && nextLocation) {
                            const distance = this.calculateDistance(
                                currentLocation.coordinates[1], currentLocation.coordinates[0],
                                nextLocation.coordinates[1], nextLocation.coordinates[0]
                            );
                            const travelTime = this.estimateTravelTime(distance);
                            distanceInfo = `
                                <div class="distance-info">
                                    <span class="distance">📍 ${this.formatDistance(distance)}</span>
                                    <span class="travel-time">🚗 ${travelTime}</span>
                                </div>
                            `;
                        }
                    }
                    
                    return `
                        <div class="itinerary-location" data-location="${location.location}">
                            <div class="itinerary-marker">${index + 1}</div>
                            <div class="itinerary-time">${location.time}</div>
                            <div class="itinerary-info">
                                <div class="itinerary-location-name">${location.location}</div>
                                <div class="itinerary-note">${location.note}</div>
                                <div class="itinerary-duration">⏱️ ${location.duration}</div>
                                ${distanceInfo}
                            </div>
                        </div>
                        ${index < dayData.locations.length - 1 && distanceInfo ? `
                            <div class="travel-indicator">
                                <div class="travel-line"></div>
                                <div class="travel-arrow">⬇️</div>
                            </div>
                        ` : ''}
                    `;
                }).join('')}
            </div>
        `;
    }

    showItineraryRoute() {
        this.clearRoutes();
        this.markersLayer.clearLayers();

        const currentItinerary = itineraries[this.currentItinerary];
        if (!currentItinerary) return;

        const dayColors = {
            'day1': '#e74c3c',
            'day2': '#f39c12',
            'day3': '#27ae60'
        };

        if (this.currentDay === 'all-days') {
            // Hiển thị tất cả các tuyến đường
            Object.keys(currentItinerary.itinerary).forEach(dayKey => {
                this.drawDayRoute(dayKey, currentItinerary.itinerary[dayKey], dayColors[dayKey]);
            });
        } else {
            // Hiển thị tuyến đường của ngày cụ thể
            const dayData = currentItinerary.itinerary[this.currentDay];
            if (dayData) {
                this.drawDayRoute(this.currentDay, dayData, dayColors[this.currentDay]);
            }
        }
    }

    drawDayRoute(dayKey, dayData, color) {
        const dayNumber = dayKey.replace('day', '');
        const routeCoordinates = [];
        
        dayData.locations.forEach((itineraryLocation, index) => {
            // Tìm địa điểm trong danh sách locations
            const location = locations.find(loc => loc.name === itineraryLocation.location);
            if (location) {
                routeCoordinates.push([location.coordinates[1], location.coordinates[0]]);
                
                // Tạo marker với số thứ tự
                const customIcon = L.divIcon({
                    html: `
                        <div class="custom-marker route-marker ${dayKey}" style="background-color: ${color};">
                            <span class="marker-number">${index + 1}</span>
                        </div>
                    `,
                    className: 'custom-marker-container',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                const marker = L.marker([location.coordinates[1], location.coordinates[0]], { 
                    icon: customIcon 
                }).addTo(this.markersLayer);

                // Popup với thông tin lịch trình
                marker.bindPopup(`
                    <div class="popup-content">
                        <h3>${location.icon} ${location.name}</h3>
                        <p><strong>Thời gian:</strong> ${itineraryLocation.time}</p>
                        <p><strong>Thời lượng:</strong> ${itineraryLocation.duration}</p>
                        <p><strong>Ghi chú:</strong> ${itineraryLocation.note}</p>
                        <div class="popup-actions">
                            <button onclick="getDirections(${location.coordinates[0]}, ${location.coordinates[1]}, '${location.name}')">Chỉ đường</button>
                        </div>
                    </div>
                `);
            }
        });

        // Vẽ đường nối các điểm
        if (routeCoordinates.length > 1) {
            const routeLine = L.polyline(routeCoordinates, {
                color: color,
                weight: 4,
                opacity: 0.8,
                dashArray: '5, 10',
                lineJoin: 'round'
            }).addTo(this.map);

            this.routeLines.push(routeLine);
        }

        // Fit map to show all route points
        if (routeCoordinates.length > 0) {
            const group = new L.featureGroup(this.routeLines);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    clearRoutes() {
        this.routeLines.forEach(line => {
            this.map.removeLayer(line);
        });
        this.routeLines = [];
    }

    focusOnLocation(locationName) {
        const location = locations.find(loc => loc.name === locationName);
        if (location) {
            this.map.setView([location.coordinates[1], location.coordinates[0]], 16);
            
            // Tìm và mở popup của marker tương ứng
            this.markersLayer.eachLayer(marker => {
                if (marker.getPopup() && marker.getPopup().getContent().includes(locationName)) {
                    marker.openPopup();
                }
            });
        }
    }

    // Hàm tính khoảng cách giữa 2 điểm (Haversine formula)
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Bán kính Trái Đất (km)
        const dLat = this.toRadians(lat2 - lat1);
        const dLng = this.toRadians(lng2 - lng1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    formatDistance(distance) {
        if (distance < 1) {
            return Math.round(distance * 1000) + 'm';
        } else {
            return distance.toFixed(1) + 'km';
        }
    }

    estimateTravelTime(distance) {
        // Giả sử tốc độ trung bình 25km/h (bao gồm xe máy, ôtô trong thành phố)
        const avgSpeed = 25;
        const timeInHours = distance / avgSpeed;
        const timeInMinutes = Math.round(timeInHours * 60);
        
        if (timeInMinutes < 5) {
            return "< 5 phút";
        } else {
            return timeInMinutes + " phút";
        }
    }
}

// Khởi tạo bản đồ
let hueMap;

// Đợi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    hueMap = new HueMap();
});

// Global functions
function selectLocation(index) {
    if (hueMap) {
        hueMap.selectLocation(index);
    }
}

function getDirections(lng, lat, name) {
    // Mở Google Maps với chỉ đường
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
}

// Responsive sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', () => {
        const menuBtn = document.createElement('button');
        menuBtn.innerHTML = '☰';
        menuBtn.id = 'mobile-menu';
        menuBtn.style.cssText = `
            position: fixed;
            top: 130px;
            left: 20px;
            z-index: 1001;
            background: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        menuBtn.onclick = toggleSidebar;
        document.body.appendChild(menuBtn);
    });
}
