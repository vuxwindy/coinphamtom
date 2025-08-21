# Wallet Connection Fix Guide

## Vấn đề thường gặp và cách khắc phục

### 1. Lỗi "scheme does not have a registered handler"

**Nguyên nhân:** Ứng dụng ví chưa được cài đặt trên thiết bị

**Cách khắc phục:**
- Cài đặt ứng dụng ví tương ứng (MetaMask, Coinbase Wallet, etc.)
- Đảm bảo ứng dụng ví đã được mở và đăng nhập
- Thử kết nối lại

### 2. Lỗi "User rejected" hoặc "User denied"

**Nguyên nhân:** Người dùng đã hủy bỏ quá trình kết nối

**Cách khắc phục:**
- Kiểm tra xem có popup nào bị chặn không
- Cho phép popup từ trang web
- Thử kết nối lại và chấp nhận kết nối

### 3. Lỗi "No wallet found" hoặc "Wallet not found"

**Nguyên nhân:** Không tìm thấy ví được hỗ trợ

**Cách khắc phục:**
- Cài đặt một trong các ví được hỗ trợ:
  - MetaMask (khuyến nghị)
  - Coinbase Wallet
  - Binance Wallet
  - OKX Wallet
  - Trust Wallet
- Đảm bảo ví đã được cài đặt và cấu hình đúng

### 4. Lỗi "Network error" hoặc "Failed to fetch"

**Nguyên nhân:** Vấn đề kết nối mạng hoặc RPC

**Cách khắc phục:**
- Kiểm tra kết nối internet
- Thử refresh trang
- Kiểm tra xem có firewall nào chặn không
- Thử kết nối lại sau vài phút

### 5. Lỗi "Already processing"

**Nguyên nhân:** Đang có một kết nối đang xử lý

**Cách khắc phục:**
- Đợi vài giây để kết nối hiện tại hoàn thành
- Refresh trang nếu cần
- Thử kết nối lại

## Các bước kiểm tra cơ bản

### 1. Kiểm tra trình duyệt
- Sử dụng Chrome, Firefox, hoặc Edge phiên bản mới nhất
- Đảm bảo JavaScript được bật
- Kiểm tra xem có extension nào chặn không

### 2. Kiểm tra ví
- Đảm bảo ví đã được cài đặt và đăng nhập
- Kiểm tra xem có tài khoản nào trong ví không
- Đảm bảo ví hỗ trợ mạng Ethereum (hoặc mạng tương ứng)

### 3. Kiểm tra mạng
- Đảm bảo kết nối internet ổn định
- Thử tắt VPN nếu đang sử dụng
- Kiểm tra firewall

## Hướng dẫn cài đặt ví

### MetaMask (Khuyến nghị)
1. Truy cập https://metamask.io/download/
2. Cài đặt extension cho trình duyệt
3. Tạo ví mới hoặc import ví cũ
4. Đảm bảo có ít nhất một tài khoản
5. Thử kết nối lại

### Coinbase Wallet
1. Truy cập https://wallet.coinbase.com/
2. Cài đặt ứng dụng mobile hoặc extension
3. Tạo ví và backup seed phrase
4. Thử kết nối lại

## Debug và Test

### Sử dụng trang Wallet Test
1. Truy cập `/wallet-test` để test kết nối
2. Kiểm tra trạng thái kết nối
3. Xem thông tin chi tiết về lỗi
4. Thử các chức năng khác nhau

### Console Debug
1. Mở Developer Tools (F12)
2. Kiểm tra Console tab
3. Tìm các lỗi liên quan đến wallet
4. Báo cáo lỗi cụ thể nếu cần

## Cấu hình ThirdWeb

### Client ID
- Đảm bảo Client ID hợp lệ trong `src/config/thirdweb.js`
- Kiểm tra xem có bị block không

### Supported Chains
- Hiện tại hỗ trợ: Ethereum, BSC, Polygon
- Đảm bảo ví hỗ trợ mạng tương ứng

### Auto-connect
- Tự động kết nối ví đã kết nối trước đó
- Có thể tắt trong cấu hình nếu cần

## Liên hệ hỗ trợ

Nếu vẫn gặp vấn đề:
1. Chụp màn hình lỗi
2. Ghi lại các bước thực hiện
3. Báo cáo lỗi với thông tin chi tiết
4. Cung cấp thông tin trình duyệt và hệ điều hành

## Cập nhật mới nhất

### Phiên bản hiện tại
- ThirdWeb SDK: Latest
- Vue.js: 3.x
- Hỗ trợ đa ví
- Giao diện cải thiện
- Xử lý lỗi tốt hơn

### Tính năng mới
- Trang test wallet riêng biệt
- Hiển thị lỗi chi tiết hơn
- Giao diện responsive
- Auto-retry connection
- Better error handling
