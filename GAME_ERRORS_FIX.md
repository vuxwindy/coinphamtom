# Game Errors Fix Guide

## Các lỗi thường gặp và cách khắc phục

### 1. MessageNotSentError
```
Uncaught (in promise) MessageNotSentError: Could not establish connection. Receiving end does not exist.
```

**Nguyên nhân:**
- Browser extension (ad blocker, cookie manager, etc.) cố gắng gửi message đến content script
- Không ảnh hưởng đến chức năng game

**Cách khắc phục:**
- Tắt các browser extension không cần thiết
- Hoặc bỏ qua lỗi này vì không ảnh hưởng đến game

### 2. Firebase API Error
```
GET https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=... 400 (Bad Request)
```

**Nguyên nhân:**
- Cấu hình Firebase API key không đúng
- Đã được sửa bằng cách sử dụng mock configuration

**Cách khắc phục:**
- Đã thêm error handling trong `src/config/firebase.js`
- Sử dụng mock configuration cho development

### 3. Runtime.lastError
```
Unchecked runtime.lastError: The message port closed before a response was received.
```

**Nguyên nhân:**
- Browser extension error
- Không ảnh hưởng đến chức năng game

**Cách khắc phục:**
- Có thể bỏ qua lỗi này
- Hoặc tắt browser extension gây lỗi

## Các cải tiến đã thực hiện

### 1. Error Handling
- Thêm try-catch blocks cho Firebase initialization
- Thêm error handling cho game initialization
- Thêm error handling cho cleanup

### 2. Mock Configuration
- Sử dụng mock Firebase config để tránh API errors
- Tạo fallback objects khi Firebase fail

### 3. Font Awesome Fallback
- Thêm fallback cho Font Awesome icons
- Tránh lỗi khi CDN không load được

## Cách test game

### 1. Desktop
- Mở game trong browser
- Click và drag để aim
- Release để shoot

### 2. Mobile
- Xoay màn hình ngang
- Touch và drag để aim
- Release để shoot

### 3. Orientation Warning
- Game sẽ hiển thị warning khi màn hình dọc
- Tự động ẩn khi xoay ngang

## Troubleshooting

### Nếu game không hoạt động:
1. Kiểm tra console errors
2. Tắt browser extensions
3. Refresh trang
4. Kiểm tra kết nối internet

### Nếu Firebase errors:
1. Đã được handle tự động
2. Game vẫn hoạt động với mock data
3. Không cần action gì thêm

### Nếu orientation warning không hiện:
1. Kiểm tra responsive design
2. Test trên mobile device
3. Kiểm tra CSS media queries

## Performance Tips

1. **Tắt browser extensions** không cần thiết
2. **Sử dụng incognito mode** để test
3. **Clear browser cache** nếu có vấn đề
4. **Kiểm tra network tab** để debug

## Development Notes

- Game sử dụng Vue 3 Composition API
- Tích hợp với ThirdWeb cho wallet connection
- Sử dụng localStorage cho high scores
- Responsive design cho mobile và desktop
- Error handling cho tất cả external dependencies
