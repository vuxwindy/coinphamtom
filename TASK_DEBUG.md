# Task System Debug Guide

## Vấn đề đã được sửa

### 1. **Task ID Mismatch**
**Vấn đề:** Home.vue sử dụng task ID khác với useTaskSystem.js
- Home.vue: `telegramGroup`, `telegramChannel`, `facebookPage`, `twitterFollow`, `socialShare`
- useTaskSystem.js: `joinTelegram`, `joinX`, `joinYoutube`

**Đã sửa:** Cập nhật useTaskSystem.js để đồng bộ với Home.vue

### 2. **Thêm Debug Logs**
Đã thêm console.log để theo dõi:
- `🔄 Loading user tasks...` - Bắt đầu load tasks
- `🔄 Current user:` - Thông tin user hiện tại
- `🔄 Tasks after localStorage load:` - Tasks sau khi load từ localStorage
- `🔄 User data from Firebase:` - Dữ liệu user từ Firebase
- `🔄 Completed task IDs from Firebase:` - Danh sách task đã hoàn thành
- `🎯 Completing task:` - Khi bấm nút task
- `🎯 Available tasks:` - Danh sách task hiện có

## Cách test

### 1. **Mở Developer Tools** (F12)
### 2. **Vào tab Console**
### 3. **Refresh trang và kiểm tra logs:**

```
🔄 Loading user tasks...
🔄 Current user: [user object or null]
🔄 Saved tasks from localStorage: [data or null]
🔄 Tasks after localStorage load: [...]
🔄 User data from Firebase: [data or null]
🔄 Final tasks state: [...]
```

### 4. **Bấm nút task và kiểm tra:**

```
🎯 Completing task: checkIn
🎯 Available tasks: [...]
```

## Các task ID hiện tại

1. **checkIn** - Daily Check-in (1 PPO)
2. **telegramGroup** - Join Telegram Group (2 PPO)
3. **telegramChannel** - Subscribe Channel (2 PPO)
4. **facebookPage** - Like Facebook Page (2 PPO)
5. **twitterFollow** - Follow on Twitter (2 PPO)
6. **socialShare** - Share on Social Media (2 PPO)
7. **connect_wallet** - Connect Wallet (5 PPO)

## Kiểm tra localStorage

Mở Developer Tools > Application > Local Storage > [your-domain] > userTasks

Dữ liệu sẽ có dạng:
```json
[
  {"id":"checkIn","completed":false,"lastCompleted":null},
  {"id":"telegramGroup","completed":false,"lastCompleted":null},
  ...
]
```

## Troubleshooting

### Nếu nút không hoạt động:

1. **Kiểm tra console errors**
2. **Kiểm tra wallet connection**
3. **Kiểm tra user login status**
4. **Kiểm tra task completion status**

### Nếu task không được lưu:

1. **Kiểm tra Firebase connection**
2. **Kiểm tra localStorage permissions**
3. **Kiểm tra user authentication**

## Expected Behavior

1. **Nút task hiển thị đúng trạng thái** (Available/Completed/On Cooldown)
2. **Bấm nút mở link** (cho social tasks)
3. **Task được đánh dấu completed**
4. **Reward được cộng vào balance**
5. **Dữ liệu được lưu vào Firebase và localStorage**
