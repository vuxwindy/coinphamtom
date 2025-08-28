# 🔍 PHÂN TÍCH KẾT NỐI WALLET VÀ POPUP WUI

## 📋 TỔNG QUAN

Dự án sử dụng **Reown AppKit** để kết nối wallet, với popup WUI (Web3Modal) được tạo tự động từ thư viện này.

## 🔗 LUỒNG KẾT NỐI WALLET

### 1. **Component ReownWalletButton.vue**
```vue
<appkit-button
  v-if="!isWalletConnected"
  :features="{ chain: false }"
/>
```

- **Nguồn**: `src/components/ReownWalletButton.vue`
- **Chức năng**: Hiển thị nút "Connect Wallet" khi chưa kết nối
- **Component**: `<appkit-button>` từ thư viện `@reown/appkit/vue`

### 2. **App.vue - Khởi tạo AppKit**
```javascript
import { createAppKit } from "@reown/appkit/vue";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
});
```

- **Project ID**: `02a231b2406ed316c861abefc95c5e59`
- **Networks**: BSC, BSC Testnet
- **Adapter**: WagmiAdapter

## 🎯 POPUP WUI - NGUỒN GỐC VÀ CSS

### 1. **Nguồn gốc Popup WUI**
- **Thư viện**: `@reown/appkit/vue` (dựa trên Web3Modal)
- **File build**: `build/assets/w3m-modal-B5UR1fii.js`
- **Component**: `<w3m-modal>` được tạo tự động

### 2. **CSS của Popup WUI**
```css
/* Từ file build/assets/w3m-modal-B5UR1fii.js */

:host {
  z-index: var(--w3m-z-index);
  display: block;
  backface-visibility: hidden;
  will-change: opacity;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  background-color: var(--wui-cover);
  transition: opacity 0.2s var(--wui-ease-out-power-2);
}

:host(.open) {
  opacity: 1;
}

:host(.appkit-modal) {
  position: relative;
  pointer-events: unset;
  background: none;
  width: 100%;
  opacity: 1;
}

wui-card {
  max-width: var(--w3m-modal-width);
  width: 100%;
  position: relative;
  animation: zoom-in 0.2s var(--wui-ease-out-power-2);
  animation-fill-mode: backwards;
  outline: none;
  transition:
    border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
    background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
  will-change: border-radius, background-color;
}

:host(.appkit-modal) wui-card {
  max-width: 400px;
}
```

### 3. **Z-Index của WUI Modal**
- **CSS Variable**: `--w3m-z-index`
- **Giá trị mặc định**: Thường là `9999` hoặc cao hơn
- **Position**: `fixed` với `top: 0, left: 0, right: 0, bottom: 0`

## 🚨 VẤN ĐỀ Z-INDEX TRÊN HOME PAGE

### 1. **Các Element có Z-Index cao trên Home.vue**

#### **Modal Overlay** (Z-Index: 9999)
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;  /* ⚠️ XUNG ĐỘT VỚI WUI */
  padding: 20px;
}
```

#### **Toast Notification** (Z-Index: 10000)
```css
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px 20px;
  color: #ffffff;
  z-index: 10000;  /* ⚠️ CAO HƠN WUI */
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 300px;
  animation: slideInRight 0.3s ease;
}
```

### 2. **So sánh với các trang khác**

#### **Swap.vue**
- Toast notification: `z-index: 9999` ✅
- Không có modal overlay với z-index cao

#### **Marketplace.vue**
- Toast notification: `z-index: 10000` ⚠️
- Không có modal overlay với z-index cao

#### **Dashboard.vue**
- Không có element nào với z-index cao ✅

## 🎯 NGUYÊN NHÂN CHÍNH

### 1. **Xung đột Z-Index**
- **WUI Modal**: `z-index: 9999` (mặc định)
- **Home.vue Modal Overlay**: `z-index: 9999` (xung đột)
- **Home.vue Toast**: `z-index: 10000` (che phủ WUI)

### 2. **Vị trí xuất hiện**
- **Home.vue**: Có nhiều modal và toast notification
- **Các trang khác**: Ít modal hơn, ít xung đột

### 3. **Thời điểm xuất hiện**
- **Modal Overlay**: Xuất hiện khi mua NFT
- **Toast Notification**: Xuất hiện sau các action
- **WUI Modal**: Xuất hiện khi click "Connect Wallet"

## 🔧 GIẢI PHÁP ĐỀ XUẤT

### 1. **Giảm Z-Index của Home.vue elements**
```css
/* Giảm z-index của modal overlay */
.modal-overlay {
  z-index: 9998; /* Thấp hơn WUI */
}

/* Giảm z-index của toast notification */
.toast-notification {
  z-index: 9998; /* Thấp hơn WUI */
}
```

### 2. **Tăng Z-Index của WUI Modal**
```css
/* Thêm CSS global để tăng z-index của WUI */
:root {
  --w3m-z-index: 10001;
}

/* Hoặc override trực tiếp */
w3m-modal {
  z-index: 10001 !important;
}
```

### 3. **Conditional Rendering**
- Ẩn modal overlay và toast khi WUI modal đang mở
- Sử dụng event listener để detect WUI modal state

### 4. **Portal Rendering**
- Render WUI modal trong portal riêng biệt
- Tránh xung đột với các element khác

## 📊 KẾT LUẬN

**Nguyên nhân chính**: Toast notification trên Home.vue có `z-index: 10000` cao hơn WUI modal (`z-index: 9999`), khiến popup wallet bị che khuất.

**Giải pháp tối ưu**: Giảm z-index của các element trên Home.vue xuống dưới 9999, hoặc tăng z-index của WUI modal lên trên 10000.

