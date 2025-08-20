# Bản đồ Du lịch Huế

Ứng dụng bản đồ tương tác hiển thị các địa điểm du lịch và ẩm thực nổi tiếng tại Huế, Việt Nam sử dụng **OpenStreetMap** và **Leaflet.js** - hoàn toàn miễn phí, không cần API key.

## 🚀 Tính năng

- **Hiển thị bản đồ tương tác** sử dụng OpenStreetMap và Leaflet.js
- **26 địa điểm** bao gồm:
  - 🍜 Các địa điểm ẩm thực nổi tiếng (bánh ép, bún bò, chè, cà phê...)
  - 🏛️ Di tích lịch sử (Hoàng Thành, các lăng tẩm...)
  - 🏔️ Điểm tham quan (Đồi Thiên An, đường đi bộ...)
- **Bộ lọc thông minh** theo loại địa điểm
- **Giao diện responsive** hoạt động tốt trên mọi thiết bị
- **Popup thông tin** chi tiết cho từng địa điểm
- **Chỉ đường** tích hợp Google Maps
- **Marker tùy chỉnh** với icon và màu sắc phân loại
- **Hoàn toàn miễn phí** - không cần đăng ký hay API key

## 📋 Yêu cầu

- Trình duyệt web hiện đại hỗ trợ ES6+
- Kết nối internet để tải bản đồ
- **Không cần API key hay đăng ký** - sử dụng OpenStreetMap miễn phí

## 🛠️ Cài đặt

### Cách sử dụng đơn giản

1. **Tải về** tất cả các file trong project
2. **Mở file** `index.html` trong trình duyệt web
3. **Sử dụng ngay** - không cần cấu hình gì thêm!

### Chạy trên web server (tùy chọn)

```bash
# Sử dụng Python
python -m http.server 8000

# Sử dụng Node.js
npx serve .

# Sử dụng PHP
php -S localhost:8000
```

## 📁 Cấu trúc Project

```
Map/
├── index.html      # File HTML chính
├── styles.css      # CSS styling
├── map.js          # Logic bản đồ và tương tác
├── data.js         # Dữ liệu các địa điểm
└── README.md       # Tài liệu này
```

## 🎨 Tùy chỉnh

### Thêm địa điểm mới

Trong `data.js`, thêm object mới vào array `locations`:

```javascript
{
    name: "Tên địa điểm",
    address: "Địa chỉ đầy đủ",
    englishName: "English name",
    coordinates: [longitude, latitude],
    type: "food|historical|attraction",
    icon: "🏛️"
}
```

### Thay đổi style bản đồ

OpenStreetMap cung cấp nhiều tile layers khác nhau. Trong `map.js`, bạn có thể thay đổi:

```javascript
// Bản đồ mặc định
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

// Bản đồ đen trắng
L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png')

// Bản đồ địa hình
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png')

// CartoDB Positron (sáng)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png')

// CartoDB Dark Matter (tối)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')
```

### Tùy chỉnh màu sắc

Trong `styles.css`, chỉnh sửa các class `.marker-food`, `.marker-historical`, `.marker-attraction`

## 🌐 Demo

Ứng dụng hoạt động hoàn toàn sau khi tải về, chỉ cần:
- Mở file `index.html` trong trình duyệr
- Kết nối internet để tải tiles bản đồ OpenStreetMap
- Sử dụng tính năng chỉ đường qua Google Maps

## 📱 Responsive

- **Desktop**: Hiển thị sidebar bên trái
- **Mobile**: Sidebar ẩn, có nút menu
- **Tablet**: Tự động điều chỉnh layout

## 🔧 Troubleshooting

### Bản đồ không hiển thị
- Kiểm tra kết nối internet
- Mở Developer Tools xem có lỗi gì không
- Đảm bảo các file CSS và JS được tải đúng

### Markers không hiện
- Kiểm tra dữ liệu trong `data.js`
- Đảm bảo coordinates đúng định dạng [lng, lat]
- Kiểm tra console để xem có lỗi JavaScript không

## 🆚 So sánh với Mapbox

| Tính năng | OpenStreetMap + Leaflet | Mapbox |
|-----------|------------------------|---------|
| **Chi phí** | Hoàn toàn miễn phí | Miễn phí đến 50,000 lượt/tháng |
| **Đăng ký** | Không cần | Cần tài khoản |
| **API Key** | Không cần | Cần Access Token |
| **Tùy chỉnh** | Hạn chế | Cao |
| **Hiệu năng** | Tốt | Rất tốt |
| **Cộng đồng** | Lớn | Lớn |

## 🌟 Ưu điểm OpenStreetMap

- ✅ **Miễn phí hoàn toàn** - không có giới hạn requests
- ✅ **Không cần đăng ký** - sử dụng ngay lập tức  
- ✅ **Dữ liệu mở** - cộng đồng cập nhật liên tục
- ✅ **Độ tin cậy cao** - ít bị lỗi dịch vụ
- ✅ **Hỗ trợ offline** - có thể cache tiles
- ✅ **Tuân thủ privacy** - không thu thập dữ liệu người dùng

## 📄 License

Dự án này được phát hành dưới giấy phép MIT. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối.

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy:

1. Fork repository
2. Tạo feature branch
3. Commit thay đổi
4. Push và tạo Pull Request

## 📞 Liên hệ

Nếu có thắc mắc hoặc cần hỗ trợ, vui lòng tạo issue trong repository.

---

**Chúc bạn khám phá Huế vui vẻ! 🏛️🍜**
