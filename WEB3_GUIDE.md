# 🔗 Web3 Integration Guide - CoinPhantom

## 🎯 Tổng Quan

Dự án Vue CoinPhantom đã được tích hợp **Web3 hoàn chỉnh** với MetaMask, đảm bảo tất cả chức năng blockchain hoạt động mượt mà.

## ✅ Tính Năng Web3 Đã Tích Hợp

### **1. MetaMask Integration**
- ✅ **Connection Management**: Kết nối/ngắt kết nối MetaMask
- ✅ **Account Switching**: Tự động phát hiện khi user chuyển account
- ✅ **Chain Switching**: Tự động reload khi chuyển network
- ✅ **Balance Checking**: Hiển thị balance real-time
- ✅ **Error Handling**: Xử lý tất cả lỗi MetaMask gracefully

### **2. Web3 Functionality**
- ✅ **Transaction Support**: Gửi giao dịch ETH
- ✅ **Contract Interaction**: Tương tác với smart contracts
- ✅ **Event Listening**: Lắng nghe blockchain events
- ✅ **Gas Estimation**: Ước tính gas fees
- ✅ **Network Detection**: Phát hiện network hiện tại

### **3. User Experience**
- ✅ **Real-time Updates**: Cập nhật trạng thái real-time
- ✅ **Loading States**: Hiển thị trạng thái loading
- ✅ **Error Messages**: Thông báo lỗi thân thiện
- ✅ **Success Feedback**: Thông báo thành công
- ✅ **Responsive Design**: Hoạt động trên mọi thiết bị

## 🚀 Cách Sử Dụng

### **1. Kết Nối MetaMask**

```vue
<template>
  <div class="wallet-section">
    <WalletConnect />
  </div>
</template>

<script setup>
import WalletConnect from '../components/WalletConnect.vue'
</script>
```

### **2. Sử Dụng Web3 Composables**

```vue
<script setup>
import { useWeb3 } from '../composables/useWeb3.js'

const {
  isWeb3Ready,
  isWalletConnected,
  walletAddress,
  walletBalance,
  connectWallet,
  disconnectWallet,
  sendTransaction
} = useWeb3()

// Kết nối ví
const handleConnect = async () => {
  const result = await connectWallet()
  if (result.success) {
    console.log('✅ Connected:', result.address)
  }
}

// Gửi giao dịch
const handleSendTransaction = async () => {
  const result = await sendTransaction(
    '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // to address
    '0.1', // amount in ETH
  )
  if (result.success) {
    console.log('✅ Transaction sent:', result.hash)
  }
}
</script>
```

### **3. Sử Dụng Firebase + Web3**

```vue
<script setup>
import { useFirebase } from '../composables/useFirebase.js'
import { useWeb3 } from '../composables/useWeb3.js'

const { currentUser, signIn } = useFirebase()
const { isWalletConnected, walletAddress } = useWeb3()

// Kết hợp authentication với wallet
const handleLoginWithWallet = async () => {
  if (isWalletConnected.value && currentUser.value) {
    // Lưu wallet address vào user profile
    console.log('User logged in with wallet:', walletAddress.value)
  }
}
</script>
```

## 🔧 Cấu Hình

### **1. MetaMask Setup**

1. **Cài đặt MetaMask**: Từ Chrome Web Store
2. **Tạo Wallet**: Tạo ví mới hoặc import existing
3. **Chọn Network**: Ethereum Mainnet hoặc Testnet
4. **Có ETH**: Đảm bảo có ETH để test

### **2. Development Environment**

```bash
# Chạy dự án
cd coinpayot
npm run dev

# Mở browser với MetaMask
# Truy cập: http://localhost:5173
```

### **3. Testing Networks**

- **Ethereum Mainnet**: Network thật
- **Goerli Testnet**: Test network
- **Sepolia Testnet**: Test network mới
- **Local Hardhat**: Development network

## 📱 Component WalletConnect

### **Features:**
- **Connect Button**: Kết nối MetaMask
- **Address Display**: Hiển thị địa chỉ ví
- **Balance Display**: Hiển thị balance ETH
- **Refresh Button**: Cập nhật balance
- **Disconnect Button**: Ngắt kết nối
- **Status Indicators**: Trạng thái kết nối

### **States:**
- **Loading**: Đang khởi tạo Web3
- **Not Connected**: Chưa kết nối MetaMask
- **Connected**: Đã kết nối thành công
- **Error**: Có lỗi xảy ra

## 🔍 Debug & Troubleshooting

### **1. Console Logs**

```javascript
// Kiểm tra Web3
console.log('Web3 available:', typeof Web3 !== 'undefined')
console.log('MetaMask available:', typeof window.ethereum !== 'undefined')

// Kiểm tra connection
console.log('Wallet connected:', isWalletConnected.value)
console.log('Wallet address:', walletAddress.value)
console.log('Wallet balance:', walletBalance.value)
```

### **2. Common Issues**

**MetaMask not detected:**
- Đảm bảo MetaMask đã cài đặt
- Đảm bảo MetaMask đã unlock
- Refresh trang

**Connection failed:**
- Kiểm tra MetaMask popup
- Approve connection request
- Check network connection

**Balance not showing:**
- Kiểm tra network
- Đảm bảo có ETH trong ví
- Click refresh balance

### **3. Error Handling**

```javascript
// Tất cả errors được handle gracefully
try {
  const result = await connectWallet()
  if (!result.success) {
    console.log('Connection failed:', result.error)
  }
} catch (error) {
  console.log('Unexpected error:', error)
}
```

## 🎨 Customization

### **1. Styling WalletConnect**

```vue
<style scoped>
.wallet-connect {
  /* Custom styles */
}

.btn-connect {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}
</style>
```

### **2. Adding New Features**

```javascript
// Thêm tính năng mới vào useWeb3
const getNetworkInfo = async () => {
  if (web3Instance.value) {
    const networkId = await web3Instance.value.eth.net.getId()
    const networkType = await web3Instance.value.eth.net.getNetworkType()
    return { networkId, networkType }
  }
  return null
}
```

## 🚀 Production Deployment

### **1. Environment Variables**

```env
# .env.production
VITE_ETHEREUM_NETWORK=mainnet
VITE_CONTRACT_ADDRESS=0x...
VITE_RPC_URL=https://mainnet.infura.io/v3/...
```

### **2. Network Configuration**

```javascript
// config/networks.js
export const networks = {
  mainnet: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/...',
    explorer: 'https://etherscan.io'
  },
  goerli: {
    chainId: 5,
    name: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/...',
    explorer: 'https://goerli.etherscan.io'
  }
}
```

## 📚 Resources

### **Documentation:**
- [Web3.js Documentation](https://web3js.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Ethereum Developer Resources](https://ethereum.org/developers/)

### **Tools:**
- [Etherscan](https://etherscan.io/) - Blockchain explorer
- [Infura](https://infura.io/) - RPC provider
- [Hardhat](https://hardhat.org/) - Development framework

### **Testing:**
- [Goerli Faucet](https://goerlifaucet.com/) - Get test ETH
- [Sepolia Faucet](https://sepoliafaucet.com/) - Get test ETH

## 🎯 Kết Luận

Dự án CoinPhantom đã được tích hợp **Web3 hoàn chỉnh** với:

- ✅ **MetaMask Integration**: Hoạt động 100%
- ✅ **User Experience**: Smooth và intuitive
- ✅ **Error Handling**: Robust và graceful
- ✅ **Development Ready**: Dễ dàng mở rộng
- ✅ **Production Ready**: Sẵn sàng deploy

**Web3 functionality đã sẵn sàng cho production!** 🚀
