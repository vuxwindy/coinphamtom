# Accumulated Rewards System - Hệ thống tích lũy rewards

## Tổng quan

Hệ thống accumulated rewards cho phép người dùng tích lũy rewards từ các task và chỉ claim khi đạt đủ 220 PPO.

## Cấu trúc Database

### User Document Fields
```javascript
{
  // ... existing fields ...
  
  // Accumulated rewards system
  accumulatedRewards: 0, // Tổng rewards đã kiếm được từ tasks
  claimedRewards: 0,     // Tổng rewards đã claim
  pendingRewards: 0,     // Rewards đang chờ claim (accumulatedRewards - claimedRewards)
  lastClaimDate: null,   // Ngày claim cuối cùng
}
```

## Logic hoạt động

### 1. **Task Completion**
- Khi hoàn thành task, rewards được cộng vào `accumulatedRewards` và `pendingRewards`
- **KHÔNG** cộng trực tiếp vào `tokenBalance`
- User chỉ nhận được thông báo về rewards đã tích lũy

### 2. **Claim Requirements**
- **Minimum**: 220 PPO để có thể claim
- **Formula**: `pendingRewards >= 220`
- **Status**: Hiển thị "✅ Ready to claim!" hoặc "⏳ Need X more PPO"

### 3. **Claim Process**
- Khi claim thành công:
  - `tokenBalance += pendingRewards`
  - `claimedRewards += pendingRewards`
  - `pendingRewards = 0`
  - `lastClaimDate = currentDate`

## Task Rewards

| Task | Reward | Type |
|------|--------|------|
| Daily Check-in | 1 PPO | Daily |
| Join Telegram Group | 2 PPO | One-time |
| Subscribe Channel | 2 PPO | One-time |
| Like Facebook Page | 2 PPO | One-time |
| Follow on Twitter | 2 PPO | One-time |
| Share on Social Media | 2 PPO | One-time |
| Connect Wallet | 5 PPO | One-time |

## UI Components

### 1. **Available Rewards Section**
```vue
<div class="claim-section">
  <div class="rewards-summary">
    <h4>Available Rewards</h4>
    <span>{{ pendingRewards }} PPO</span>
    <small>{{ canClaimRewards ? '✅ Ready to claim!' : `⏳ Need ${220 - pendingRewards} more PPO` }}</small>
    <button :disabled="!canClaimRewards || !isUserReady" @click="claimAccumulatedRewards">
      Claim
    </button>
  </div>
  
  <div class="rewards-details">
    <div class="reward-stat">
      <span>Total Earned:</span>
      <span>{{ accumulatedRewards }} PPO</span>
    </div>
    <div class="reward-stat">
      <span>Already Claimed:</span>
      <span>{{ claimedRewards }} PPO</span>
    </div>
    <div class="reward-stat">
      <span>Pending:</span>
      <span>{{ pendingRewards }} PPO</span>
    </div>
  </div>
</div>
```

### 2. **Task Completion Message**
```
Task completed! You earned 2 PPO

Total accumulated: 15 PPO
Pending rewards: 15 PPO
⏳ Need 205 more PPO to claim
```

## Functions

### 1. **claimTaskReward(taskType)**
- Cộng rewards vào `accumulatedRewards` và `pendingRewards`
- Trả về thông tin về việc có thể claim hay không

### 2. **claimAccumulatedRewards()**
- Kiểm tra `pendingRewards >= 220`
- Chuyển `pendingRewards` vào `tokenBalance`
- Reset `pendingRewards = 0`

### 3. **loadUserTasks()**
- Load dữ liệu accumulated rewards từ Firebase
- Cập nhật local state

## State Management

### useTaskSystem.js
```javascript
// Accumulated rewards state
const accumulatedRewards = ref(0)
const claimedRewards = ref(0)
const pendingRewards = ref(0)
const canClaimRewards = ref(false)

// Methods
const claimRewards = async () => { /* ... */ }
```

### Home.vue
```javascript
const {
  accumulatedRewards,
  claimedRewards,
  pendingRewards,
  canClaimRewards,
  claimRewards,
} = useTaskSystem()

const claimAccumulatedRewards = async () => { /* ... */ }
```

## Database Operations

### 1. **Create User Document**
```javascript
const userData = {
  // ... existing fields ...
  accumulatedRewards: 0,
  claimedRewards: 0,
  pendingRewards: 0,
  lastClaimDate: null,
}
```

### 2. **Update Task Completion**
```javascript
const updateData = {
  accumulatedRewards: newAccumulated,
  pendingRewards: newPending,
  totalEarned: userData.totalEarned + reward,
}
```

### 3. **Claim Rewards**
```javascript
const updateData = {
  tokenBalance: newBalance,
  claimedRewards: newClaimed,
  pendingRewards: 0,
  lastClaimDate: new Date(),
}
```

## Benefits

1. **User Engagement**: Khuyến khích user hoàn thành nhiều task để đạt 220 PPO
2. **Data Tracking**: Theo dõi được tổng rewards đã kiếm và đã claim
3. **Flexible Claiming**: User có thể tích lũy và claim khi muốn
4. **Clear Progress**: Hiển thị rõ ràng tiến độ tích lũy

## Testing

### 1. **Complete Tasks**
- Hoàn thành các task và kiểm tra `pendingRewards` tăng
- Kiểm tra thông báo "Need X more PPO"

### 2. **Claim Rewards**
- Tích lũy đủ 220 PPO
- Bấm nút Claim và kiểm tra `tokenBalance` tăng
- Kiểm tra `pendingRewards` reset về 0

### 3. **Database Verification**
- Kiểm tra Firebase để đảm bảo dữ liệu được lưu đúng
- Verify transaction history
