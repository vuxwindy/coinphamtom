# Assets Build Guide - Fix Missing Images

## Vấn đề
Khi build project, một số hình ảnh bị mất hoặc không được include trong build.

## Giải pháp đã triển khai

### 1. Cấu hình Vite được cập nhật (`vite.config.js`)

#### ✅ **Asset Handling**
- Tất cả hình ảnh được xử lý đúng cách
- Tổ chức file theo loại: `images/`, `fonts/`, `media/`
- Hash naming để cache busting

#### ✅ **Build Output Structure**
```
dist/
├── assets/
│   ├── images/
│   │   ├── [name]-[hash].png
│   │   ├── [name]-[hash].jpg
│   │   └── [name]-[hash].svg
│   ├── fonts/
│   │   └── [name]-[hash].woff2
│   ├── media/
│   │   └── [name]-[hash].mp4
│   └── js/
│       └── [name]-[hash].js
└── index.html
```

### 2. Asset Configuration (`vite.assets.config.js`)

#### ✅ **Supported Formats**
- **Images**: PNG, JPG, JPEG, GIF, SVG, WebP, ICO, BMP, TIFF
- **Fonts**: WOFF, WOFF2, TTF, EOT, OTF
- **Media**: MP4, WebM, OGG, MP3, WAV, FLAC, AAC

#### ✅ **Asset Directories**
- `src/assets/images/`
- `src/assets/fonts/`
- `src/assets/media/`
- `public/`
- `public/images/`
- `public/token/`
- `public/nft/`

### 3. Build Script (`build-assets.js`)

#### ✅ **Pre-build Check**
- Kiểm tra tất cả assets trước khi build
- Báo lỗi nếu có file bị thiếu
- Đảm bảo tất cả files có thể truy cập

## Cách sử dụng

### Build với kiểm tra assets
```bash
npm run build
```

### Chỉ kiểm tra assets
```bash
npm run build:check
```

### Build thủ công
```bash
# 1. Kiểm tra assets
node build-assets.js

# 2. Build project
vite build
```

## Cấu trúc thư mục assets

### ✅ **Đúng cách**
```
src/
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── icons/
│   │       └── arrow.svg
│   ├── fonts/
│   │   └── custom-font.woff2
│   └── media/
│       └── video.mp4
public/
├── favicon.ico
├── token/
│   ├── ppo.png
│   └── eth.svg
└── nft/
    ├── bronze.png
    ├── silver.png
    └── gold.png
```

### ❌ **Sai cách**
```
src/
├── images/          # Không nên đặt ở đây
├── img/            # Không nên đặt ở đây
└── assets/
    └── random/     # Không có cấu trúc rõ ràng
```

## Import hình ảnh trong Vue

### ✅ **Cách đúng**
```vue
<template>
  <!-- Import từ src/assets -->
  <img :src="logoImage" alt="Logo" />
  
  <!-- Sử dụng public folder -->
  <img src="/token/ppo.png" alt="PPO Token" />
  
  <!-- Dynamic import -->
  <img :src="getImageUrl('hero-bg.jpg')" alt="Hero Background" />
</template>

<script setup>
// Import static assets
import logoImage from '@/assets/images/logo.png'

// Dynamic import function
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>
```

### ❌ **Cách sai**
```vue
<template>
  <!-- Không nên dùng đường dẫn tuyệt đối -->
  <img src="/src/assets/images/logo.png" alt="Logo" />
  
  <!-- Không nên dùng đường dẫn tương đối không chính xác -->
  <img src="../../assets/images/logo.png" alt="Logo" />
</template>
```

## Troubleshooting

### 1. Hình ảnh không hiển thị sau build

#### **Kiểm tra:**
```bash
# Chạy kiểm tra assets
npm run build:check
```

#### **Giải pháp:**
1. Đảm bảo file tồn tại trong đúng thư mục
2. Kiểm tra quyền truy cập file
3. Sử dụng đúng cách import

### 2. Hình ảnh bị 404

#### **Nguyên nhân:**
- File không được include trong build
- Đường dẫn không chính xác
- File bị xóa hoặc di chuyển

#### **Giải pháp:**
1. Chạy `npm run build:check` để kiểm tra
2. Đảm bảo file trong thư mục `src/assets/` hoặc `public/`
3. Kiểm tra lại đường dẫn import

### 3. Hình ảnh bị mất khi deploy

#### **Nguyên nhân:**
- Server không serve static files đúng cách
- Base path không chính xác
- File permissions

#### **Giải pháp:**
1. Kiểm tra cấu hình server
2. Đảm bảo base path đúng
3. Kiểm tra file permissions trên server

## Best Practices

### 1. **Tổ chức file**
- Đặt tất cả assets trong `src/assets/`
- Sử dụng cấu trúc thư mục rõ ràng
- Đặt tên file có ý nghĩa

### 2. **Import assets**
- Sử dụng `@/assets/` alias
- Import static assets khi cần thiết
- Sử dụng dynamic import cho assets lớn

### 3. **Optimization**
- Sử dụng format phù hợp (WebP cho web)
- Nén hình ảnh trước khi import
- Sử dụng lazy loading cho hình ảnh lớn

### 4. **Build process**
- Luôn chạy `npm run build:check` trước khi build
- Kiểm tra output trong `dist/` folder
- Test build locally trước khi deploy

## Monitoring

### Build Logs
```bash
npm run build
# Sẽ hiển thị:
# 🔍 Checking assets...
# 📁 Checking directory: src/assets/images
#    Found 15 assets
# ✅ All assets are accessible!
```

### Asset Summary
- Tổng số assets được tìm thấy
- Số assets bị thiếu/inaccessible
- Danh sách files có vấn đề

## Kết luận

Với cấu hình mới này:
- ✅ Tất cả assets được xử lý đúng cách
- ✅ Build process an toàn và kiểm tra được
- ✅ Cấu trúc output rõ ràng và tổ chức
- ✅ Hỗ trợ đầy đủ các format file
- ✅ Error handling và troubleshooting

Chạy `npm run build` để build project với kiểm tra assets tự động!
