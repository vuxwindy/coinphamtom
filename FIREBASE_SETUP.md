# 🔥 Firebase Setup Guide - CoinPhantom

## ✅ Firebase đã được cấu hình thành công!

### 📋 Thông tin Project:
- **Project ID**: `coinphantom-e995b`
- **Project Name**: CoinPhantom
- **Firebase Console**: https://console.firebase.google.com/project/coinphantom-e995b

### 🔧 Services đã được kích hoạt:

#### ✅ Authentication
- **Provider**: Email/Password
- **Status**: ✅ Active
- **Features**: 
  - Sign up/Sign in
  - Password reset
  - User profile management

#### ✅ Firestore Database
- **Status**: ✅ Active
- **Collections**:
  - `users` - User data, balance, tasks
  - `tasks` - Task definitions and completion
  - `referrals` - Referral system data

#### ✅ Analytics
- **Status**: ✅ Active
- **Measurement ID**: `G-ZPL33FRZNP`
- **Features**: User behavior tracking

### 🚀 Cách test Firebase:

#### 1. Test file đơn giản:
```bash
# Mở file test
open test-firebase.html
```

#### 2. Test trong Vue app:
```bash
# Chạy dev server
npm run dev

# Mở browser và kiểm tra console
# Firebase sẽ tự động initialize
```

#### 3. Test Authentication:
- Vào `/signup` để tạo tài khoản
- Vào `/tasks` để test task system
- Kiểm tra Firestore để xem data

### 📊 Database Schema:

#### Users Collection:
```javascript
{
  uid: "user_id",
  email: "user@example.com",
  displayName: "User Name",
  photoURL: "profile_pic_url",
  createdAt: timestamp,
  updatedAt: timestamp,
  tokenBalance: 0,
  nftBalance: 0,
  totalEarned: 0,
  referralEarnings: 0,
  referralCode: "ABC123",
  referralCount: 0,
  level: "F0",
  dailyTasks: {
    checkIn: { completed: false, lastCompleted: null },
    // ... other tasks
  },
  completedTasks: ["task_id_1", "task_id_2"]
}
```

#### Tasks Collection:
```javascript
{
  id: "task_id",
  name: "Connect Wallet",
  description: "Connect your wallet to earn rewards",
  reward: 5,
  type: "one_time", // or "daily"
  category: "wallet",
  icon: "fas fa-wallet",
  url: "/wallet-test"
}
```

### 🔐 Security Rules (Firestore):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tasks are readable by all authenticated users
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can modify tasks
    }
    
    // Referrals are readable by all authenticated users
    match /referrals/{referralId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### 🛠️ Troubleshooting:

#### Lỗi thường gặp:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - Giải pháp: Firebase đã được initialize, không cần lo lắng

2. **"Permission denied"**
   - Giải pháp: Kiểm tra Firestore Security Rules

3. **"Network error"**
   - Giải pháp: Kiểm tra internet connection

4. **"Invalid API key"**
   - Giải pháp: Kiểm tra lại config trong `src/config/firebase.js`

### 📱 Mobile Testing:

```bash
# Test trên mobile device
npm run dev
# Mở IP address trên mobile browser
# Ví dụ: http://192.168.1.100:5173
```

### 🎯 Next Steps:

1. **Enable Authentication Providers** (nếu cần):
   - Google Sign-in
   - Facebook Sign-in
   - Twitter Sign-in

2. **Setup Cloud Functions** (nếu cần):
   - Automated task rewards
   - Referral bonuses
   - Email notifications

3. **Setup Storage** (nếu cần):
   - User profile pictures
   - NFT images
   - Game assets

### 🔗 Useful Links:

- **Firebase Console**: https://console.firebase.google.com/project/coinphantom-e995b
- **Firebase Docs**: https://firebase.google.com/docs
- **Firestore Rules**: https://firebase.google.com/docs/firestore/security/get-started
- **Authentication**: https://firebase.google.com/docs/auth

---

## 🎉 Firebase đã sẵn sàng cho CoinPhantom!

Tất cả tính năng Firebase đã được tích hợp và hoạt động:
- ✅ Authentication
- ✅ Firestore Database  
- ✅ Analytics
- ✅ Real-time updates
- ✅ Task system
- ✅ User management
- ✅ Referral system
