# CoinPayot - Modern GameFi Platform

Một nền tảng GameFi hiện đại với hệ thống menu responsive, Web3 integration và backend API hoàn chỉnh.

## 🚀 Tính năng chính

### Frontend (Vue.js 3)
- ✅ **Menu Responsive Hiện đại**: Thiết kế menu hoàn toàn mới với animation mượt mà
- ✅ **Web3 Integration**: Kết nối MetaMask và quản lý wallet
- ✅ **Firebase Integration**: Authentication và database real-time
- ✅ **Router System**: Hệ thống routing hoàn chỉnh với lazy loading
- ✅ **Error Handling**: Xử lý lỗi thông minh không làm crash app
- ✅ **Mobile First**: Responsive design cho mọi thiết bị

### Backend (Node.js + Express)
- ✅ **RESTful API**: API endpoints hoàn chỉnh
- ✅ **Authentication**: JWT-based authentication
- ✅ **Database**: MongoDB với Mongoose ODM
- ✅ **Security**: Helmet, CORS, Rate limiting
- ✅ **Validation**: Input validation với express-validator
- ✅ **File Upload**: Hỗ trợ upload ảnh và file

## 📁 Cấu trúc dự án

```
coinpayot/
├── src/
│   ├── components/
│   │   ├── Header.vue          # Menu responsive mới
│   │   ├── Footer.vue          # Footer component
│   │   └── WalletConnect.vue   # Wallet connection
│   ├── composables/
│   │   ├── useWeb3.js          # Web3 management
│   │   └── useFirebase.js      # Firebase management
│   ├── views/                  # Page components
│   ├── router/
│   │   └── index.js           # Vue Router config
│   └── config/
│       └── firebase.js        # Firebase config
├── backend/
│   ├── server.js              # Express server
│   ├── routes/                # API routes
│   ├── models/                # Database models
│   └── middleware/            # Custom middleware
└── package.json
```

## 🛠️ Cài đặt và chạy

### Frontend
```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

### Backend
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Chạy production
npm start
```

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env` trong thư mục gốc:

```env
# Frontend
VITE_API_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Backend
PORT=3000
MONGODB_URI=mongodb://localhost:27017/coinpayot
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 🎮 Tính năng Game

### Daily Tasks
- ✅ Daily Check-in (1 PPO)
- ✅ Join Telegram Group (2 PPO)
- ✅ Subscribe Telegram Channel (2 PPO)
- ✅ Like Facebook Page (2 PPO)
- ✅ Follow Twitter (2 PPO)
- ✅ Social Share (3 PPO)

### Referral System
- ✅ Referral code generation
- ✅ Referral tracking
- ✅ Referral rewards (5 PPO per referral)
- ✅ Level system (F0, F1, F2, etc.)

### NFT System
- ✅ NFT collection management
- ✅ Rarity system (Common, Rare, Epic, Legendary)
- ✅ NFT marketplace integration

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Reset mật khẩu

### User Management
- `GET /api/user/profile` - Lấy profile user
- `PUT /api/user/profile` - Cập nhật profile
- `GET /api/user/stats` - Lấy thống kê game
- `POST /api/user/update-wallet` - Cập nhật wallet address

### Tasks & Rewards
- `GET /api/tasks/daily` - Lấy danh sách daily tasks
- `POST /api/tasks/claim` - Claim task reward
- `GET /api/tasks/progress` - Lấy tiến độ tasks

### Referral System
- `GET /api/referral/info` - Lấy thông tin referral
- `POST /api/referral/use` - Sử dụng referral code
- `GET /api/referral/rewards` - Lấy referral rewards

### Game & NFT
- `POST /api/game/result` - Lưu kết quả game
- `GET /api/nft/collection` - Lấy NFT collection
- `POST /api/nft/mint` - Mint NFT mới
- `GET /api/nft/marketplace` - Lấy marketplace data

## 🎨 Menu System

### Desktop Menu
- **Home**: Trang chủ
- **Game**: Chơi game
- **Marketplace**: NFT marketplace
- **Collection**: NFT collection
- **Investment**: Investment features
- **Profile** (Dropdown):
  - My Profile
  - Dashboard
  - Daily Tasks
  - Referral
- **More** (Dropdown):
  - Blindbox
  - Swap
  - Creators
  - Whitepaper

### Mobile Menu
- Slide-in menu từ bên phải
- Hamburger animation
- Touch-friendly design
- Auto-close sau khi click

## 🔐 Security Features

### Frontend
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure Web3 integration

### Backend
- ✅ Helmet security headers
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ JWT authentication
- ✅ Password hashing
- ✅ Input sanitization

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 991px

### Features
- ✅ Mobile-first approach
- ✅ Touch-friendly interactions
- ✅ Optimized images
- ✅ Fast loading times
- ✅ Progressive enhancement

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy to platform
```

## 🐛 Troubleshooting

### Common Issues

1. **Menu không hiển thị**
   - Kiểm tra CSS imports
   - Kiểm tra Vue Router setup

2. **Web3 không kết nối**
   - Kiểm tra MetaMask installation
   - Kiểm tra network connection

3. **Firebase errors**
   - Kiểm tra Firebase config
   - Kiểm tra API keys

4. **Backend không start**
   - Kiểm tra MongoDB connection
   - Kiểm tra environment variables

## 📞 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console logs
2. Kiểm tra network tab
3. Kiểm tra environment variables
4. Tạo issue với thông tin chi tiết

## 🔄 Updates

### Version 2.0.0
- ✅ Complete menu redesign
- ✅ New backend API
- ✅ Enhanced security
- ✅ Better error handling
- ✅ Mobile optimization

---

**Made with ❤️ by CoinPayot Team**
