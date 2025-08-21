# Hệ Thống Nhiệm Vụ & Phần Thưởng - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Hệ thống nhiệm vụ mới đã được tích hợp hoàn chỉnh với:
- **Kết nối ví** (ThirdWeb)
- **Hoàn thành nhiệm vụ** 
- **Nhận phần thưởng** (PPO tokens)
- **Đồng bộ số dư** giữa ví và ứng dụng

## 🚀 Tính Năng Chính

### 1. **Kết Nối Ví**
- Hỗ trợ nhiều ví: MetaMask, Coinbase Wallet, Rainbow, Rabby, Zerion
- Hiển thị số dư PPO trong header
- Nhiệm vụ "Connect Wallet" phải được hoàn thành thủ công

### 2. **Hệ Thống Nhiệm Vụ**
- **Nhiệm vụ hàng ngày**: Reset mỗi 24 giờ
- **Nhiệm vụ một lần**: Chỉ hoàn thành được 1 lần
- **Cooldown system**: Tránh spam nhiệm vụ
- **Progress tracking**: Theo dõi tiến độ hàng ngày

### 3. **Phần Thưởng**
- Nhận PPO tokens khi hoàn thành nhiệm vụ
- Tự động cập nhật số dư
- Thông báo real-time khi nhận thưởng
- Lưu trữ lịch sử trong Firebase

### 4. **Đồng Bộ Số Dư**
- Hiển thị số dư PPO trong header
- Nút "Sync Wallet" để đồng bộ với ví
- Tự động đồng bộ khi hoàn thành nhiệm vụ

## 📋 Danh Sách Nhiệm Vụ

### Nhiệm Vụ Hàng Ngày
| Nhiệm Vụ | Phần Thưởng | Mô Tả |
|----------|-------------|-------|
| Daily Check-in | 1 PPO | Check-in hàng ngày (reset mỗi 24h) |

### Nhiệm Vụ Một Lần
| Nhiệm Vụ | Phần Thưởng | Mô Tả |
|----------|-------------|-------|
| Connect Wallet | 5 PPO | Kết nối ví và hoàn thành nhiệm vụ thủ công |
| Join Telegram Group | 2 PPO | Tham gia nhóm Telegram |
| Join Telegram Channel | 2 PPO | Theo dõi kênh Telegram |
| Like Facebook Page | 2 PPO | Thích trang Facebook |
| Follow Twitter | 2 PPO | Theo dõi Twitter |
| Social Share | 3 PPO | Chia sẻ lên mạng xã hội |

## 🎮 Cách Sử Dụng

### 1. **Truy Cập Hệ Thống Nhiệm Vụ**
- Vào menu **Tasks** trong header
- Hoặc truy cập trực tiếp: `/tasks`

### 2. **Kết Nối Ví**
- Click nút **"Connect Wallet"** trong header
- Chọn ví bạn muốn kết nối
- Xác nhận kết nối trong ví
- **Lưu ý**: Sau khi kết nối ví, bạn cần hoàn thành nhiệm vụ "Connect Wallet" thủ công để nhận 5 PPO

### 3. **Hoàn Thành Nhiệm Vụ**
- Xem danh sách nhiệm vụ có sẵn
- Click **"Complete Task"** cho nhiệm vụ muốn làm
- Nhận thông báo và phần thưởng

### 4. **Nhận Phần Thưởng**
- Hoàn thành từng nhiệm vụ riêng lẻ
- Hoặc click **"Claim All Rewards"** để nhận tất cả
- Số dư sẽ tự động cập nhật

## 💰 Hệ Thống Phần Thưởng

### Cách Tính Phần Thưởng
- **Nhiệm vụ hàng ngày**: Reset mỗi 24 giờ
- **Nhiệm vụ một lần**: Chỉ nhận được 1 lần
- **Tổng phần thưởng tối đa/ngày**: 1 PPO (daily check-in)
- **Tổng phần thưởng tối đa**: 17 PPO (tất cả nhiệm vụ)

### Lưu Trữ Dữ Liệu
- Số dư PPO: Lưu trong Firebase
- Lịch sử nhiệm vụ: Theo dõi thời gian hoàn thành
- Tiến độ hàng ngày: Reset tự động lúc 00:00

## 🔧 Tính Năng Kỹ Thuật

### Auto-Connect
- Tự động kết nối ví khi vào trang
- Đồng bộ số dư khi kết nối
- Nhiệm vụ "Connect Wallet" phải được hoàn thành thủ công

### Cooldown System
- Nhiệm vụ hàng ngày: Daily Check-in reset mỗi 24 giờ
- Nhiệm vụ một lần: Không có cooldown, chỉ làm được 1 lần
- Hiển thị thời gian còn lại cho daily tasks
- Tránh spam và lạm dụng

### Real-time Updates
- Cập nhật số dư ngay lập tức
- Thông báo hoàn thành nhiệm vụ
- Progress bar tiến độ hàng ngày

## 📱 Responsive Design

### Desktop
- Grid layout cho nhiệm vụ
- Sidebar hiển thị thông tin
- Hover effects và animations

### Mobile
- Single column layout
- Touch-friendly buttons
- Optimized for small screens

## 🔒 Bảo Mật

### Wallet Integration
- Chỉ sử dụng Client ID (không có Secret Key)
- Kết nối an toàn qua ThirdWeb
- Không lưu private keys

### Data Protection
- Dữ liệu lưu trong Firebase
- Xác thực người dùng
- Backup và recovery

## 🐛 Troubleshooting

### Vấn Đề Thường Gặp

1. **"Wallet not connected"**
   - Đảm bảo đã kết nối ví
   - Kiểm tra extension ví có hoạt động không
   - Thử refresh trang

2. **"Task already completed"**
   - Nhiệm vụ một lần chỉ làm được 1 lần
   - Nhiệm vụ hàng ngày reset lúc 00:00

3. **"Task on cooldown"**
   - Chờ hết thời gian cooldown
   - Kiểm tra thời gian còn lại

4. **Balance not syncing**
   - Click nút "Sync Wallet"
   - Kiểm tra kết nối mạng
   - Refresh trang

### Debug Mode
```javascript
// Mở console và gõ:
localStorage.setItem('task-debug', 'true')
```

## 📈 Analytics & Tracking

### Metrics Theo Dõi
- Số nhiệm vụ hoàn thành
- Tổng phần thưởng nhận được
- Thời gian hoạt động
- Tỷ lệ hoàn thành nhiệm vụ

### Reports
- Daily progress reports
- Weekly/monthly summaries
- User engagement metrics

## 🎉 Kết Luận

Hệ thống nhiệm vụ mới cung cấp:
- ✅ **Trải nghiệm người dùng tốt**
- ✅ **Tích hợp ví hoàn chỉnh**
- ✅ **Hệ thống phần thưởng công bằng**
- ✅ **Đồng bộ số dư real-time**
- ✅ **Bảo mật và ổn định**

### Next Steps
1. Test tất cả tính năng
2. Tùy chỉnh phần thưởng
3. Thêm nhiệm vụ mới
4. Tối ưu performance
5. A/B testing

---

**Happy Tasking! 🚀**
