# Task System Synchronization Fix

## Vấn đề đã được sửa

### 1. **Logic tổng điểm Claim sai**
- **Trước**: Hiển thị tổng điểm của tất cả task (đã hoàn thành + chưa hoàn thành)
- **Sau**: Chỉ hiển thị điểm từ các task đã hoàn thành (`earnedRewards`)

### 2. **Task system không đồng bộ**
- **Trước**: `useTaskSystem.js` có 7 task cũ với điểm sai
- **Sau**: Đồng bộ với `Home.vue` - chỉ 4 task với điểm chính xác

## Các thay đổi chính

### **1. Cập nhật Task Definitions (`useTaskSystem.js`)**

#### **Trước:**
```javascript
const tasks = ref([
  { id: 'checkIn', reward: 1, type: 'daily' },
  { id: 'connect_wallet', reward: 5, type: 'one_time' },
  { id: 'telegramGroup', reward: 2, type: 'one_time' },
  { id: 'telegramChannel', reward: 2, type: 'one_time' },
  { id: 'facebookPage', reward: 2, type: 'one_time' },
  { id: 'twitterFollow', reward: 2, type: 'one_time' },
  { id: 'socialShare', reward: 3, type: 'one_time' },
])
```

#### **Sau:**
```javascript
const tasks = ref([
  { id: 'checkIn', reward: 1, type: 'daily' },
  { id: 'joinTelegram', reward: 2, type: 'one-time', href: 'https://t.me/PixelpayotChannels' },
  { id: 'joinX', reward: 2, type: 'one-time', href: 'https://x.com/TetMinh46256' },
  { id: 'joinYoutube', reward: 2, type: 'one-time', href: 'https://www.youtube.com/@minhtet-q2r9o' },
])
```

### **2. Sửa Logic Tính Điểm**

#### **Trước:**
```javascript
const totalRewards = computed(() => {
  return tasks.value.reduce((total, task) => {
    if (!task.completed) return total + task.reward
    return total
  }, 0)
})
```

#### **Sau:**
```javascript
// Điểm có thể kiếm được từ task chưa hoàn thành
const totalRewards = computed(() => {
  return tasks.value.reduce((total, task) => {
    if (!task.completed) {
      return total + task.reward
    }
    return total
  }, 0)
})

// Điểm đã kiếm được từ task đã hoàn thành
const earnedRewards = computed(() => {
  return tasks.value.reduce((total, task) => {
    if (task.completed) {
      return total + task.reward
    }
    return total
  }, 0)
})
```

### **3. Cập nhật Home.vue**

#### **Trước:**
```vue
<span class="rewards-amount">{{ totalRewards }} PPO</span>
<button :disabled="totalRewards <= 0">
```

#### **Sau:**
```vue
<span class="rewards-amount">{{ earnedRewards }} PPO</span>
<button :disabled="earnedRewards <= 0">
```

### **4. Cập nhật Firebase Task Rewards**

#### **Trước:**
```javascript
const taskRewards = {
  checkIn: 1,
  telegramGroup: 2,
  telegramChannel: 2,
  facebookPage: 2,
  twitterFollow: 2,
  socialShare: 3,
  connect_wallet: 5,
}
```

#### **Sau:**
```javascript
const taskRewards = {
  checkIn: 1,
  joinTelegram: 2,
  joinX: 2,
  joinYoutube: 2,
  connect_wallet: 5,
}
```

## Kết quả

### ✅ **Đã sửa:**
1. **Logic tổng điểm**: Chỉ hiển thị điểm từ task đã hoàn thành
2. **Đồng bộ task**: 4 task chính xác với Home.vue
3. **Điểm chính xác**: 1 PPO cho check-in, 2 PPO cho social tasks
4. **URL links**: Tự động mở link khi click task
5. **Daily reset**: Chỉ reset check-in task mỗi ngày

### 📊 **Task System mới:**
- **Daily Check-in**: 1 PPO (reset hàng ngày)
- **Join Telegram**: 2 PPO (1 lần duy nhất)
- **Follow X**: 2 PPO (1 lần duy nhất)  
- **Watch YouTube**: 2 PPO (1 lần duy nhất)

### 🎯 **Logic hoạt động:**
1. **Chưa làm task**: Hiển thị 0 PPO
2. **Làm 1 task**: Hiển thị điểm của task đó
3. **Làm tất cả**: Hiển thị tổng 7 PPO (1+2+2+2)
4. **Reset daily**: Chỉ reset check-in, giữ nguyên social tasks

## Cách sử dụng

### **1. Kiểm tra task system:**
```javascript
const { tasks, earnedRewards, totalRewards } = useTaskSystem()
console.log('Tasks:', tasks.value)
console.log('Earned:', earnedRewards.value)
console.log('Available:', totalRewards.value)
```

### **2. Complete task:**
```javascript
const result = await completeTask('checkIn')
if (result.success) {
  console.log(`Earned ${result.reward} PPO`)
}
```

### **3. Reset daily:**
```javascript
resetDailyTasks() // Chỉ reset check-in task
```

## Lưu ý

1. **Backup data** trước khi deploy
2. **Test thoroughly** với user thực tế
3. **Monitor Firebase** để đảm bảo data consistency
4. **Clear localStorage** nếu cần reset hoàn toàn

Task system đã được đồng bộ và sửa lỗi logic! 🎉
