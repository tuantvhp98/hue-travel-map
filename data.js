// Dữ liệu các địa điểm tại Huế
const locations = [
    {
        name: "Bánh ép Huệ",
        address: "118 Lê Ng. Cát, Thủy Xuân, Huế, Thành phố Huế, Việt Nam",
        englishName: "Bánh ép Huệ",
        coordinates: [107.56302420717991, 16.435924391204498],
        type: "food",
        icon: "🥙"
    },
    {
        name: "Cơm Hến Đập Đá 01 Hàn Mặc Tử",
        address: "01 Hàn Mặc Tử, Vỹ Dạ, Huế, Thành phố Huế 530000, Việt Nam",
        englishName: "Cơm Hến Đập Đá 01 Hàn Mặc Tử",
        coordinates: [107.59549500873997, 16.47455304119459],
        type: "food",
        icon: "🍚"
    },
    {
        name: "Chè bột lọc heo quay tại chè hẻm",
        address: "1 kiệt, 29 Hùng Vương, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Chè Hẻm",
        coordinates: [107.59356644672897, 16.46511413255796],
        type: "food",
        icon: "🍮"
    },
    {
        name: "Hoàng Thành Huế",
        address: "Phú Hậu, Huế, Thành phố Huế, Việt Nam",
        englishName: "Hue Imperial City",
        coordinates: [107.57731720420121, 16.46973210727893],
        type: "historical",
        icon: "🏛️"
    },
    {
        name: "Lăng vua Gia Long",
        address: "phường Long Hồ, quận Phú Xuân, Thành phố Huế, Việt Nam",
        englishName: "Mausoleum of Emperor Gia Long",
        coordinates: [107.5968900602124, 16.362097492997346],
        type: "historical",
        icon: "⚱️"
    },
    {
        name: "Tư Lăng - Lăng mộ vua Đồng Khánh",
        address: "CHH9+XXH, Đoàn Nhữ Hải, Thủy Xuân, Huế, Thành phố Huế, Việt Nam",
        englishName: "Mausoleum of Emperor Dong Khanh",
        coordinates: [107.5700056427624, 16.42994840675925],
        type: "historical",
        icon: "⚱️"
    },
    {
        name: "Lăng vua Minh Mạng",
        address: "ấp An Bằng, phường Long Hồ, quận Phú Xuân, Thành phố Huế, Việt Nam",
        englishName: "Tomb of Minh Mang",
        coordinates: [107.570225238466, 16.387703271968558],
        type: "historical",
        icon: "⚱️"
    },
    {
        name: "Đồi Thiên An",
        address: "Thủy Bằng, Tx. Hương Thủy, Thành phố Huế, Việt Nam",
        englishName: "đồi Thiên An",
        coordinates: [107.58462676045215, 16.41262876090156],
        type: "attraction",
        icon: "🏔️"
    },
    {
        name: "Bánh ép La Cà, 58 Nguyễn Hữu Thọ",
        address: "58 Nguyễn Hữu Thọ, tổ 17, Huế, Thành phố Huế 46000, Việt Nam",
        englishName: "Bánh ép La Cà, 58 Nguyễn Hữu Thọ",
        coordinates: [107.60220920184415, 16.46030382501078],
        type: "food",
        icon: "🥙"
    },
    {
        name: "Lăng Khải Định",
        address: "Núi, Châu Chữ, quận Thuận Hóa, Thành phố Huế 530000, Việt Nam",
        englishName: "Mausoleum of Emperor Khai Dinh",
        coordinates: [107.59030622497067, 16.39912845467529],
        type: "historical",
        icon: "⚱️"
    },
    {
        name: "Lăng Tự Đức",
        address: "Cầu Đông Ba, thôn Thượng, Huế, Thành phố Huế 530000, Việt Nam",
        englishName: "Mausoleum of Emperor Tu Duc",
        coordinates: [107.56641065994296, 16.433084797247776],
        type: "historical",
        icon: "⚱️"
    },
    {
        name: "Cung An Định",
        address: "179 Phan Đình Phùng, Phú Nhuận, Huế, Thành phố Huế, Việt Nam",
        englishName: "An Dinh Palace",
        coordinates: [107.59828157556282, 16.456913076647464],
        type: "historical",
        icon: "🏰"
    },
    {
        name: "Cafe Hạt Đậu Nhỏ",
        address: "102/16 Huyền Trân Công Chúa, Thủy Biều, Huế, Thành phố Huế, Việt Nam",
        englishName: "Tiệm cà phê Hạt Đậu Nhỏ",
        coordinates: [107.56489070778728, 16.426216630708034],
        type: "food",
        icon: "☕"
    },
    {
        name: "Làng hương Thủy Xuân - Cô Hoa",
        address: "84 Huyền Trân Công Chúa, Thủy Xuân, Huế, Thành phố Huế, Việt Nam",
        englishName: "Làng hương Thủy Xuân - Cô Hoa",
        coordinates: [107.56267795380604, 16.433628104713048],
        type: "attraction",
        icon: "🏭"
    },
    {
        name: "Đường đi bộ Nguyễn Đình Chiểu",
        address: "Nguyễn Đình Chiểu, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Nguyen Dinh Chieu Walking Street",
        coordinates: [107.5890000480035, 16.467017584323763],
        type: "attraction",
        icon: "🚶"
    },
    {
        name: "Nem Lụi Bà Tý",
        address: "81 Đào Duy Từ, tổ 1, Huế, Thành phố Huế, Việt Nam",
        englishName: "Nem Lụi Bà Tý",
        coordinates: [107.58332965196252, 16.480134305460865],
        type: "food",
        icon: "🍢"
    },
    {
        name: "Bánh Canh Cá Lóc Sen Xù",
        address: "2 Hải Triều, An Cựu, Huế, Thành phố Huế, Việt Nam",
        englishName: "Bánh Canh Cá Lóc Sen Xù",
        coordinates: [107.60067126545754, 16.456791581362893],
        type: "food",
        icon: "🍜"
    },
    {
        name: "Bánh Ướt - Bún Thịt Nướng Huyền Anh",
        address: "50 Kim Long, Huế, Thành phố Huế, Việt Nam",
        englishName: "Huyen Anh Wet Cake - Grilled Meat Bun Dinner",
        coordinates: [107.56317506730167, 16.45897942232464],
        type: "food",
        icon: "🍜"
    },
    {
        name: "Nhà hàng 52 Bao Vinh",
        address: "52 Bao Vinh, Street, Hue City, Hương Trà, Thành phố Huế, Việt Nam",
        englishName: "52 Bao Vinh Restaurant",
        coordinates: [107.57735933508103, 16.49441109010396],
        type: "food",
        icon: "🍽️"
    },
    {
        name: "Bánh Ép Cây Xoài (gốc)",
        address: "75 Hoàng Quang, Thuận An, Phú Vang, Thành phố Huế, Việt Nam",
        englishName: "Bánh Ép Cây Xoài (gốc)",
        coordinates: [107.65318986607717, 16.55385995114053],
        type: "food",
        icon: "🥙"
    },
    {
        name: "Bún Bò Bà Nga",
        address: "62 Nguyễn Chí Diểu, Phú Hậu, Huế, Thành phố Huế, Việt Nam",
        englishName: "Bún Bò Bà Nga",
        coordinates: [107.58274003846705, 16.474800886449408],
        type: "food",
        icon: "🍜"
    },
    {
        name: "Bánh Mì Trường Tiền O Tho",
        address: "14 Trần Cao Vân, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Bánh Mì Trường Tiền O Tho",
        coordinates: [107.59164932497154, 16.465693894361863],
        type: "food",
        icon: "🥖"
    },
    {
        name: "Vịt lộn um bầu bé Đen",
        address: "101 Phan Đình Phùng, Vĩnh Ninh, Huế, Thành phố Huế, Việt Nam",
        englishName: "Vịt lộn um bầu bé Đen",
        coordinates: [107.59234277202306, 16.456994120800307],
        type: "food",
        icon: "🥚"
    },
    {
        name: "Cà Phê Muối cs1",
        address: "142 Đặng Thái Thân, Thuận Hoà, Huế, Thành phố Huế, Việt Nam",
        englishName: "Cà Phê Muối",
        coordinates: [107.57288098079731, 16.47139378952778],
        type: "food",
        icon: "☕"
    },
    {
        name: "Chè mợ tôn đích",
        address: "20 Đinh Tiên Hoàng, Phú Hoà, Huế, Thành phố Huế 49000, Việt Nam",
        englishName: "Chè Mợ Tôn Đích",
        coordinates: [107.58500496730194, 16.46926264610564],
        type: "food",
        icon: "🍮"
    },
    {
        name: "Chè Thanh 4.7 sao",
        address: "76-78 Mai Thúc Loan, Phú Hậu, Huế, Thành phố Huế, Việt Nam",
        englishName: "Chè Thanh",
        coordinates: [107.5824849789531, 16.477009549208105],
        type: "food",
        icon: "🍮"
    },
    {
        name: "Chùa Thiên Mụ",
        address: "Huyện Hương Thủy, Thành phố Huế, Việt Nam",
        englishName: "Thien Mu Pagoda",
        coordinates: [107.55644, 16.45583],
        type: "historical",
        icon: "🏯"
    },
    {
        name: "Cầu Trường Tiền",
        address: "Cầu Trường Tiền, Huế, Thành phố Huế, Việt Nam",
        englishName: "Trang Tien Bridge",
        coordinates: [107.59234, 16.46511],
        type: "attraction",
        icon: "🌉"
    },
    {
        name: "Bún Bò Huế Hồng Mai",
        address: "Trần Cao Vân, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Hong Mai Bun Bo Hue",
        coordinates: [107.59164, 16.46569],
        type: "food",
        icon: "🍜"
    },
    {
        name: "Đồi Vọng Cảnh",
        address: "Hương Thủy, Thành phố Huế, Việt Nam",
        englishName: "Vong Canh Hill",
        coordinates: [107.56789, 16.43456],
        type: "attraction",
        icon: "⛰️"
    },
    {
        name: "Bến Xưa Vĩ Dạ",
        address: "Vĩ Dạ, Huế, Thành phố Huế, Việt Nam",
        englishName: "Vi Da Old Wharf",
        coordinates: [107.59549, 16.47455],
        type: "historical",
        icon: "⚓"
    },
    {
        name: "Trường Quốc Học Huế",
        address: "12 Lê Lợi, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Quoc Hoc High School",
        coordinates: [107.59164, 16.46379],
        type: "historical",
        icon: "🏫"
    },
    {
        name: "Cầu Gỗ Lim",
        address: "Thanh Toàn, Hương Thủy, Thành phố Huế, Việt Nam",
        englishName: "Thanh Toan Covered Bridge",
        coordinates: [107.62345, 16.43456],
        type: "attraction",
        icon: "🌉"
    },
    {
        name: "Bún Thịt Nướng Huế",
        address: "48 Trần Cao Vân, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Hue Grilled Pork Noodles",
        coordinates: [107.59134, 16.46589],
        type: "food",
        icon: "🍜"
    },
    {
        name: "Bánh Bèo Bánh Nậm Cô Ba",
        address: "11 Lý Thường Kiệt, Phú Hội, Huế, Thành phố Huế, Việt Nam",
        englishName: "Co Ba Banh Beo Banh Nam",
        coordinates: [107.58934, 16.46449],
        type: "food",
        icon: "🥟"
    }
];

// Phân loại địa điểm theo loại
const locationTypes = {
    all: "Tất cả",
    food: "Ẩm thực",
    historical: "Di tích",
    attraction: "Điểm tham quan"
};

// Lịch trình 3 ngày 2 đêm tại Huế
const itinerary = {
    day1: {
        title: "Ngày 1: Đại Nội – Chùa Thiên Mụ – Sông Hương",
        description: "Khám phá trung tâm di sản văn hóa thế giới và thưởng thức ẩm thực địa phương",
        locations: [
            {
                time: "08:00",
                location: "Bún Bò Huế Hồng Mai",
                duration: "30 phút",
                note: "Ăn sáng bún bò Huế authentic trước khi tham quan"
            },
            {
                time: "08:30",
                location: "Hoàng Thành Huế",
                duration: "3 giờ",
                note: "Tham quan Đại Nội (Kinh thành Huế) - khu rộng lớn, chụp ảnh tốn ~3h"
            },
            {
                time: "11:30",
                location: "Cơm Hến Đập Đá 01 Hàn Mặc Tử",
                duration: "1 giờ",
                note: "Ăn trưa cơm hến đặc sản Huế"
            },
            {
                time: "15:00",
                location: "Chùa Thiên Mụ",
                duration: "2 giờ",
                note: "Tham quan chùa cổ, ngắm cảnh và chụp ảnh hoàng hôn siêu đẹp"
            },
            {
                time: "17:00",
                location: "Cầu Trường Tiền",
                duration: "1 giờ",
                note: "Dạo sông Hương và cầu Trường Tiền, ngắm cảnh hoàng hôn"
            },
            {
                time: "19:00",
                location: "Bún Thịt Nướng Huế",
                duration: "1 giờ",
                note: "Ăn tối bún thịt nướng đặc sản"
            },
            {
                time: "20:00",
                location: "Bánh Bèo Bánh Nậm Cô Ba",
                duration: "45 phút",
                note: "Thưởng thức bánh bèo, bánh nậm và dạo phố Tây"
            }
        ]
    },
    day2: {
        title: "Ngày 2: Lăng tẩm – Cung An Định – Đồi Vọng Cảnh",
        description: "Khám phá kiến trúc hoàng gia và ngắm cảnh sông Hương từ trên cao",
        locations: [
            {
                time: "07:30",
                location: "Bánh Canh Cá Lóc Sen Xù",
                duration: "45 phút",
                note: "Ăn sáng bánh canh Huế"
            },
            {
                time: "08:00",
                location: "Lăng Khải Định",
                duration: "3 giờ",
                note: "Tham quan lăng có kiến trúc độc đáo Đông Tây kết hợp, chụp ảnh đẹp"
            },
            {
                time: "13:30",
                location: "Đồi Vọng Cảnh",
                duration: "2 giờ",
                note: "Ngắm sông Hương từ trên cao, view panorama tuyệt đẹp"
            },
            {
                time: "16:00",
                location: "Cung An Định",
                duration: "1.5 giờ",
                note: "Tham quan cung điện nhà Nguyễn, kiến trúc cổ điển"
            },
            {
                time: "19:00",
                location: "Chè Thanh 4.7 sao",
                duration: "1 giờ",
                note: "Ăn tối và trải nghiệm chè Huế đặc sắc"
            },
            {
                time: "20:30",
                location: "Cầu Trường Tiền",
                duration: "1 giờ",
                note: "Tự do dạo phố, ngắm cầu Trường Tiền về đêm lên đèn rất chill"
            }
        ]
    },
    day3: {
        title: "Ngày 3: Thơ mộng xứ Huế – Bến Xưa – Trường Quốc Học",
        description: "Khám phá những nét đẹp thơ mộng, văn hóa và lịch sử giáo dục Huế",
        locations: [
            {
                time: "07:00",
                location: "Cơm Hến Đập Đá 01 Hàn Mặc Tử",
                duration: "45 phút",
                note: "Ăn sáng cơm hến lần cuối"
            },
            {
                time: "08:00",
                location: "Bến Xưa Vĩ Dạ",
                duration: "2 giờ",
                note: "Tham quan bến xưa gắn với thơ Hàn Mặc Tử, không gian thơ mộng"
            },
            {
                time: "10:30",
                location: "Trường Quốc Học Huế",
                duration: "1.5 giờ",
                note: "Thăm trường cổ kính, nhiều góc chụp hình đẹp"
            },
            {
                time: "14:00",
                location: "Cầu Gỗ Lim",
                duration: "1.5 giờ",
                note: "Check-in cầu gỗ lim cổ kính, trải nghiệm làng quê"
            },
            {
                time: "15:30",
                location: "Trường Quốc Học Huế",
                duration: "1.5 giờ",
                note: "Quay lại khu trường, gần đó có bãi cỏ hồng chụp hoàng hôn rất đẹp"
            },
            {
                time: "17:30",
                location: "Chè mợ tôn đích",
                duration: "1 giờ",
                note: "Ăn uống nhẹ, thưởng thức chè truyền thống trước khi kết thúc hành trình"
            }
        ]
    }
};
