# Daily Tasks Update - 4 Tasks Implementation

## Overview
Updated the daily tasks system to include exactly 4 tasks as requested by the user:
- **1 Daily Task**: Daily Check-in (resets every day)
- **3 One-time Tasks**: Telegram, X, YouTube (can only be completed once per account)

## Updated Tasks

### 1. Daily Check-in (Daily Task)
- **ID**: `checkIn`
- **Reward**: 1 PPO
- **Type**: Daily (resets every 24 hours)
- **Icon**: `fas fa-calendar-check`
- **Description**: Complete daily check-in to earn rewards

### 2. Join Telegram Channel (One-time Task)
- **ID**: `joinTelegram`
- **Reward**: 2 PPO
- **Type**: One-time (can only be completed once per account)
- **Icon**: `fab fa-telegram`
- **Description**: Join our official Telegram channel
- **Href**: `https://t.me/PixelpayotChannels`

### 3. Follow on X (One-time Task)
- **ID**: `joinX`
- **Reward**: 2 PPO
- **Type**: One-time (can only be completed once per account)
- **Icon**: `fab fa-twitter`
- **Description**: Follow us on X (Twitter)
- **Href**: `https://x.com/TetMinh46256`

### 4. Watch YouTube Video (One-time Task)
- **ID**: `joinYoutube`
- **Reward**: 2 PPO
- **Type**: One-time (can only be completed once per account)
- **Icon**: `fab fa-youtube`
- **Description**: Watch our latest video on YouTube
- **Href**: `https://www.youtube.com/@minhtet-q2r9o`

## Key Features

### Task Types
- **Daily Task**: Only "Daily Check-in" resets every day at midnight
- **One-time Tasks**: Telegram, X, and YouTube can only be completed once per account
- **URL Handling**: Social media links open in new tabs when clicked
- **No URL Display**: URLs are not shown in the UI for better aesthetics

### Task Completion Flow
1. User clicks task button
2. If task has href, opens link in new tab
3. Claims reward from Firebase
4. Updates task completion status
5. Shows success toast notification

### Daily Reset System
- Only "Daily Check-in" resets daily at midnight
- One-time tasks remain completed permanently
- Uses the same daily reset mechanism for check-in only
- Tracks completion in Firebase appropriately

## Files Modified

### 1. `src/composables/useTaskSystem.js`
- Updated tasks array with 1 daily + 3 one-time tasks
- Added href properties for social media links
- Modified task completion logic to handle href links
- Updated daily reset logic for check-in only
- Modified task loading logic for different task types

### 2. `src/composables/useFirebase.js`
- Updated task rewards mapping
- Modified Firebase update logic for different task types
- Daily check-in stored in `dailyTasks` object
- One-time tasks stored in `completedTasks` array

### 3. `src/views/Home.vue`
- Updated task display template
- Fixed progress counter to show actual completion
- Updated task buttons with correct IDs and icons
- Removed old task items

## Technical Implementation

### Task Structure
```javascript
// Daily Task
{
  id: 'checkIn',
  name: 'Daily Check-in',
  description: 'Complete daily check-in to earn rewards',
  reward: 1,
  type: 'daily',
  completed: false,
  cooldown: 24 * 60 * 60 * 1000, // 24 hours
  lastCompleted: null,
  icon: 'fas fa-calendar-check'
}

// One-time Task
{
  id: 'joinTelegram',
  name: 'Join Telegram Channel',
  description: 'Join our official Telegram channel',
  reward: 2,
  type: 'one-time',
  completed: false,
  cooldown: 0,
  lastCompleted: null,
  icon: 'fab fa-telegram',
  href: 'https://t.me/PixelpayotChannels'
}
```

### Task Completion Logic
```javascript
// For tasks with href links, open the link first
if (task.href) {
  window.open(task.href, '_blank')
}

// Then claim reward and update status
const result = await claimTaskReward(taskId)

// Only save date for daily check-in
if (taskId === 'checkIn') {
  const currentDate = new Date().toDateString()
  lastCheckInDate.value = currentDate
  localStorage.setItem('lastCheckInDate', currentDate)
}
```

### Firebase Integration
```javascript
// Daily check-in task
if (taskType === 'checkIn') {
  updateData[`dailyTasks.${taskType}`] = true
  updateData.lastCheckIn = new Date()
} else {
  // One-time tasks (Telegram, X, YouTube)
  const completedTasks = userData.completedTasks || []
  if (!completedTasks.includes(taskType)) {
    updateData.completedTasks = [...completedTasks, taskType]
  }
}
```

## User Experience

### Visual Design
- Clean task cards with proper icons
- Progress indicator shows completion status
- Hover effects and smooth animations
- Consistent styling across all tasks

### Functionality
- **Daily Check-in**: Click → Claim reward → Reset daily
- **One-time Tasks**: Click → Opens link → Claim reward → Never reset
- Toast notifications for success/error
- Proper disabled states for completed tasks

### Mobile Responsive
- Tasks adapt to mobile screen sizes
- Touch-friendly button sizes
- Proper spacing and layout

## Testing

### Manual Testing Steps
1. Navigate to home page
2. Connect wallet and sign in
3. Click each task button
4. Verify links open in new tabs
5. Check reward claiming works
6. Verify daily reset only affects check-in
7. Test on mobile devices

### Expected Behavior
- All 4 tasks should be visible
- Progress counter should show completion status
- **Daily Check-in**: Resets daily, can be completed again
- **One-time Tasks**: Once completed, stay completed permanently
- Clicking tasks should open links and claim rewards
- Completed tasks should show checkmark and be disabled

## Reward System

### Total Possible Rewards
- **Daily Check-in**: 1 PPO (daily)
- **Telegram**: 2 PPO (one-time)
- **X**: 2 PPO (one-time)
- **YouTube**: 2 PPO (one-time)

### Per Account
- **One-time rewards**: 6 PPO total (2+2+2)
- **Daily rewards**: 1 PPO per day
- **Maximum first day**: 7 PPO (6 one-time + 1 daily)
- **Daily ongoing**: 1 PPO per day

## Future Enhancements

1. **Analytics**: Track task completion patterns
2. **Notifications**: Remind users about daily check-in
3. **Streaks**: Track consecutive daily check-in streaks
4. **Achievements**: Reward users for completing all one-time tasks
5. **Social Features**: Share completion status
