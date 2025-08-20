// Ứng dụng bản đồ Huế sử dụng OpenStreetMap và Leaflet.js
class HueMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.currentFilter = 'all';
        this.activePopup = null;
        this.markersLayer = null;
        this.init();
    }

    init() {
        this.createMap();
        this.setupEventListeners();
        this.renderLocationsList();
        this.addMarkersToMap();
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
