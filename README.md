# Ticker Pro - Advanced Signage System

A professional-grade, real-time web-based ticker/scrolling text system designed for digital signage, lobby displays, and live streaming overlays (OBS).

---

## 🇻🇳 Tiếng Việt (Vietnamese)

### 🚀 Tính năng chính

- **Đồng bộ thời gian thực**: Điều khiển nhiều màn hình hiển thị ngay lập tức thông qua WebSockets.
- **Chế độ Standalone (Độc lập)**: Màn hình hiển thị tự động lưu nội dung cuối cùng vào `localStorage`. Chữ vẫn chạy ngay cả khi mất mạng hoặc server bị sập.
- **Tự động kết nối lại**: Client tự động thử kết nối lại với server mà không cần thao tác thủ công.
- **Điều khiển nâng cao**:
    - Gửi tin nhắn riêng biệt cho từng máy hoặc phát sóng cho tất cả (broadcast).
    - Chế độ nền trong suốt (hoàn hảo cho OBS/livestream).
    - Tùy chỉnh vị trí (Trên cùng, Ở giữa, Dưới cùng).
    - Thay đổi tốc độ, cỡ chữ và màu sắc linh hoạt.
- **Đa ngôn ngữ (i18n)**: Hỗ trợ đầy đủ tiếng Anh và tiếng Trung Phồn thể (繁體中文).
- **Lưu cài đặt**: Bảng điều khiển nhớ màu sắc, văn bản và ngôn ngữ cuối cùng bạn đã sử dụng.

### 🛠️ Cài đặt

1. **Yêu cầu**: Đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/).
2. **Thiết lập**:
   ```bash
   npm install ws
   ```
3. **Chạy Server**:
   ```bash
   node server.js
   ```

### 📖 Cách sử dụng

- **Bảng điều khiển**: Mở `http://localhost:3000` trên trình duyệt.
- **Màn hình hiển thị**: Mở `http://localhost:3000/display` trên màn hình quảng cáo hoặc thêm vào Browser Source trong OBS.
- **Hướng dẫn chi tiết**: Truy cập `http://localhost:3000/manual` để xem hướng dẫn chi tiết (Tiếng Trung).

---

## 🇺🇸 English

### 🚀 Key Features

- **Real-time Sync**: Control multiple display clients instantly via WebSockets.
- **Standalone Mode**: Display clients persist last-received content in `localStorage`. They continue scrolling even if the network or server goes down.
- **Auto-Reconnect**: Clients automatically attempt to reconnect to the server without manual intervention.
- **Advanced Controls**:
    - Individual or broadcast messaging.
    - Transparent background toggle (perfect for OBS).
    - Vertical positioning (Top, Middle, Bottom).
    - Dynamic speed, font size, and color adjustment.
- **Localization (i18n)**: Full support for English and Traditional Chinese (繁體中文).
- **Settings Persistence**: The control panel remembers your last used colors, text, and language.

### 🛠️ Installation

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Setup**:
   ```bash
   npm install ws
   ```
3. **Run Server**:
   ```bash
   node server.js
   ```

### 📖 Usage

- **Control Panel**: Open `http://localhost:3000` in your browser.
- **Signage Display**: Open `http://localhost:3000/display` on any display screen or as a Browser Source in OBS.
- **Manual**: Access `http://localhost:3000/manual` for a detailed guide in Chinese.

## 🌐 LAN Access

To access the system from other devices on your network:
1. Find your local IP (Windows: `ipconfig`, Linux/Mac: `ifconfig`).
2. Use `http://[YOUR-IP]:3000` to control or display content.

## ⚖️ License

MIT License. Feel free to use and modify for personal or commercial projects.
