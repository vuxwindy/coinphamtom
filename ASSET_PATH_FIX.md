# Asset Path Fix - Giải quyết lỗi URL sau build

## Vấn đề
Các hình ảnh sử dụng đường dẫn `/src/assets/images/` sẽ không hoạt động sau khi build vì Vite không include chúng trong build output.

## Giải pháp

### 1. **Chạy script fix tự động:**
```bash
npm run fix-assets
```

Script này sẽ:
- ✅ Tự động thay thế tất cả đường dẫn `/src/assets/` 
- ✅ Chuyển đổi sang đường dẫn public folder
- ✅ Cập nhật tất cả file Vue

### 2. **Cấu trúc thư mục public mới:**
```
public/
├── token/
│   ├── bnb.png
│   ├── ppo.png
│   ├── usdt.png
│   └── usdc.webp
├── nft/
│   ├── nft1.jpg
│   ├── nft2.jpg
│   ├── nft3.jpg
│   ├── nft4.jpg
│   ├── nft5.jpg
│   ├── nft6.jpg
│   ├── nft-item1.jpg
│   ├── nft-item2.jpg
│   ├── nft-item3.jpg
│   ├── nft-item4.jpg
│   ├── collection1.jpg
│   ├── collection2.jpg
│   ├── collection3.jpg
│   ├── collection4.jpg
│   ├── collection-item1.jpg
│   ├── collection-item2.jpg
│   ├── collection-item3.jpg
│   ├── collection-item4.jpg
│   ├── collection-item5.jpg
│   ├── collection-item6.jpg
│   └── collection-item7.jpg
├── creators/
│   ├── creator1.jpg
│   ├── creator2.jpg
│   ├── creator3.jpg
│   ├── creator4.jpg
│   ├── creator5.jpg
│   ├── creator6.jpg
│   ├── creator7.jpg
│   ├── creator8.jpg
│   ├── creator-banner1.jpg
│   ├── creator-banner2.jpg
│   └── creator-banner3.jpg
├── avatars/
│   ├── client1.jpg
│   ├── client2.jpg
│   ├── client3.jpg
│   ├── client4.jpg
│   ├── client-lg1.jpg
│   ├── client-lg2.jpg
│   ├── client-lg3.jpg
│   ├── client-lg4.jpg
│   └── default-avatar.png
├── games/
│   ├── arrow-game-preview.png
│   ├── arrow-game-modern-preview.png
│   ├── plinko-preview.png
│   ├── snake-preview.png
│   └── fishing-preview.png
└── images/
    ├── banner-lg1.jpg
    ├── spotlight-artwork.jpg
    ├── footer-pattern.png
    └── header-icon.png
```

### 3. **Mapping đường dẫn:**

#### **Token Icons:**
- `/src/assets/images/bnb-icon.png` → `/token/bnb.png`
- `/src/assets/images/ppo-icon.png` → `/token/ppo.png`
- `/src/assets/images/usdt-icon.png` → `/token/usdt.png`
- `/src/assets/images/usdc-icon.png` → `/token/usdc.webp`

#### **NFT Images:**
- `/src/assets/images/nft1.jpg` → `/nft/nft1.jpg`
- `/src/assets/images/nft2.jpg` → `/nft/nft2.jpg`
- `/src/assets/images/nft3.jpg` → `/nft/nft3.jpg`
- `/src/assets/images/nft4.jpg` → `/nft/nft4.jpg`
- `/src/assets/images/nft5.jpg` → `/nft/nft5.jpg`
- `/src/assets/images/nft6.jpg` → `/nft/nft6.jpg`

#### **NFT Items:**
- `/src/assets/images/nft-item1.jpg` → `/nft/nft-item1.jpg`
- `/src/assets/images/nft-item2.jpg` → `/nft/nft-item2.jpg`
- `/src/assets/images/nft-item3.jpg` → `/nft/nft-item3.jpg`
- `/src/assets/images/nft-item4.jpg` → `/nft/nft-item4.jpg`

#### **Collections:**
- `/src/assets/images/collection1.jpg` → `/nft/collection1.jpg`
- `/src/assets/images/collection2.jpg` → `/nft/collection2.jpg`
- `/src/assets/images/collection3.jpg` → `/nft/collection3.jpg`
- `/src/assets/images/collection4.jpg` → `/nft/collection4.jpg`

#### **Creators:**
- `/src/assets/images/creator1.jpg` → `/creators/creator1.jpg`
- `/src/assets/images/creator2.jpg` → `/creators/creator2.jpg`
- `/src/assets/images/creator3.jpg` → `/creators/creator3.jpg`
- `/src/assets/images/creator4.jpg` → `/creators/creator4.jpg`

#### **Avatars:**
- `/src/assets/images/clients-item1.jpg` → `/avatars/client1.jpg`
- `/src/assets/images/clients-item2.jpg` → `/avatars/client2.jpg`
- `/src/assets/images/clients-item3.jpg` → `/avatars/client3.jpg`
- `/src/assets/images/clients-item4.jpg` → `/avatars/client4.jpg`

#### **Games:**
- `/src/assets/images/arrow-game-preview.png` → `/games/arrow-game-preview.png`
- `/src/assets/images/arrow-game-modern-preview.png` → `/games/arrow-game-modern-preview.png`
- `/src/assets/images/plinko-preview.png` → `/games/plinko-preview.png`
- `/src/assets/images/snake-preview.png` → `/games/snake-preview.png`
- `/src/assets/images/fishing-preview.png` → `/games/fishing-preview.png`

## Các bước thực hiện

### **Bước 1: Chạy script fix**
```bash
npm run fix-assets
```

### **Bước 2: Di chuyển hình ảnh**
```bash
# Tạo thư mục trong public
mkdir -p public/token public/nft public/creators public/avatars public/games public/images

# Di chuyển hình ảnh từ src/assets/images/ sang public/
# (Thực hiện thủ công hoặc sử dụng script)
```

### **Bước 3: Kiểm tra build**
```bash
npm run build
npm run preview
```

## Files được cập nhật

Script sẽ tự động cập nhật các file sau:
- `src/views/Swap.vue`
- `src/views/Home.vue`
- `src/views/Blindbox.vue`
- `src/views/Collection.vue`
- `src/views/Creators.vue`
- `src/views/NFTInvestment.vue`
- `src/views/Leaderboard.vue`
- `src/views/Referral.vue`
- `src/views/Profile.vue`
- `src/views/Marketplace.vue`
- `src/views/Game.vue`
- `src/components/NFTCollection.vue`
- `src/components/Footer.vue`

## Kết quả

Sau khi chạy script:
- ✅ Tất cả đường dẫn `/src/assets/` được thay thế
- ✅ Hình ảnh sử dụng đường dẫn public folder
- ✅ Build sẽ include tất cả hình ảnh
- ✅ Không còn lỗi 404 sau khi deploy

## Lưu ý

1. **Backup trước khi chạy script**
2. **Kiểm tra kết quả sau khi chạy**
3. **Đảm bảo tất cả hình ảnh được di chuyển đúng vị trí**
4. **Test build và preview trước khi deploy**

Chạy `npm run fix-assets` để tự động sửa tất cả đường dẫn! 🎉
