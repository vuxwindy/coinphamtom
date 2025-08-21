# 🔧 Khắc Phục Lỗi Chrome Extension

## 🚨 Vấn Đề

Bạn đang gặp lỗi **MetaMask extension** không liên quan đến code Vue:

```
Denying load of chrome-extension://gomekmidlodglbbmalcneegieacbdmki/client/gpcWindowSetting.js
GET chrome-extension://invalid/ net::ERR_FAILED
Unchecked runtime.lastError: The message port closed before a response was received
```

**Đây là lỗi MetaMask cố gắng inject script vào trang web của bạn.**

## ✅ Giải Pháp

### **Phương Pháp 1: Tắt Extension (Khuyến Nghị)**

1. **Mở Chrome Extensions**
   - Nhấn `Ctrl + Shift + E` (Windows) hoặc `Cmd + Shift + E` (Mac)
   - Hoặc vào `chrome://extensions/`

2. **Tìm MetaMask Extension**
   - Tìm extension có ID: `gomekmidlodglbbmalcneegieacbdmki`
   - Hoặc tìm extension có tên "MetaMask"
   - Icon màu cam với cáo

3. **Tắt Extension**
   - Click nút toggle để tắt extension
   - Hoặc click "Remove" để gỡ cài đặt

4. **Refresh Trang**
   - Nhấn `F5` hoặc `Ctrl + R`
   - Lỗi sẽ biến mất

### **Phương Pháp 2: Chế Độ Ẩn Danh**

1. **Mở Chrome Ẩn Danh**
   - Nhấn `Ctrl + Shift + N` (Windows) hoặc `Cmd + Shift + N` (Mac)

2. **Truy Cập Ứng Dụng**
   - Mở `http://localhost:5173` (hoặc port của bạn)
   - Extension sẽ không hoạt động trong chế độ ẩn danh

### **Phương Pháp 3: Tắt Tất Cả Extension**

1. **Vào Chrome Extensions**
   - `chrome://extensions/`

2. **Tắt Tất Cả**
   - Click "Developer mode" (góc phải)
   - Click "Load unpacked" để tắt tạm thời

3. **Test Ứng Dụng**
   - Refresh trang
   - Kiểm tra console

## 🔍 **Xác Định Extension Gây Lỗi**

### **MetaMask Lỗi Thường Gặp:**

1. **Script Injection Errors**
   - MetaMask cố gắng inject script vào trang web
   - Lỗi `web_accessible_resources` manifest
   - Lỗi `gpcWindowSetting.js` không load được

2. **Network Errors**
   - `chrome-extension://invalid/ net::ERR_FAILED`
   - MetaMask cố gắng truy cập URL không hợp lệ

3. **Message Port Errors**
   - `runtime.lastError: The message port closed`
   - MetaMask background script bị ngắt kết nối

4. **Developer Tools Conflicts**
   - MetaMask conflict với Vue DevTools
   - MetaMask conflict với React DevTools

## 🧪 **Test Không Có Extension**

### **Bước 1: Tắt Tất Cả Extension**
```bash
# Mở Chrome với flag tắt extension
chrome.exe --disable-extensions
```

### **Bước 2: Chạy Ứng Dụng**
```bash
cd coinpayot
npm run dev
```

### **Bước 3: Kiểm Tra Console**
- Mở DevTools (`F12`)
- Vào tab Console
- Không còn lỗi extension

## 📝 **Ghi Chú Quan Trọng**

### **Lỗi MetaMask KHÔNG Ảnh Hưởng:**
- ✅ Code Vue của bạn
- ✅ Firebase integration
- ✅ Web3 functionality (vẫn hoạt động bình thường)
- ✅ Ứng dụng hoạt động
- ✅ Kết nối ví MetaMask vẫn OK

### **Chỉ Ảnh Hưởng:**
- ❌ Console logs (gây nhiễu)
- ❌ Debugging experience
- ❌ MetaMask script injection (không cần thiết)

## 🎯 **Kết Luận**

**Lỗi MetaMask này hoàn toàn bình thường** và không ảnh hưởng đến ứng dụng Vue CoinPhantom của bạn. Đây chỉ là:

1. **MetaMask script injection** - MetaMask cố gắng inject script vào trang web
2. **MetaMask background script** - Background script bị ngắt kết nối
3. **MetaMask manifest issues** - Lỗi cấu hình manifest của MetaMask

### **Khuyến Nghị:**
- **Tắt extension** khi develop
- **Sử dụng chế độ ẩn danh** để test
- **Bỏ qua lỗi này** nếu không ảnh hưởng đến chức năng

## 🆘 **Nếu Vẫn Gặp Vấn Đề**

1. **Kiểm tra Console thật**
   - Lọc bỏ lỗi extension
   - Chỉ xem lỗi từ code của bạn

2. **Test trên trình duyệt khác**
   - Firefox
   - Safari
   - Edge

3. **Report lỗi extension**
   - Tìm extension gây lỗi
   - Báo cáo cho developer extension
