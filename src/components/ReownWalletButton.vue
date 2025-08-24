<template>
  <appkit-button v-if="!isWalletConnected" :features="{ chain: false }" />
  <div
    class="wallet-container"
    ref="walletContainer"
    v-else
    @mouseenter="showDropdown = true"
    @mouseleave="showDropdown = false"
  >
    <!-- Hiển thị nút Connect Wallet nếu chưa kết nối -->

    <!-- Hiển thị địa chỉ ví nếu đã kết nối -->
    <div class="wallet-info" @click="toggleDropdown">
      <span class="wallet-address">{{ walletAddressFormatted }}</span>
      <div class="wallet-dropdown" v-if="showDropdown">
        <div class="dropdown-content">
          <p class="wallet-detail">Connected Wallet</p>
          <!-- <p class="wallet-address-full">{{ address }}</p> -->
          <button class="wallet-disconnect" @click="disconnect">Disconnect</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAppKit } from '@reown/appkit/vue';
import { useAccount, useDisconnect } from '@wagmi/vue';

const { open } = useAppKit();
const { address } = useAccount();
const { disconnect } = useDisconnect();

const showDropdown = ref(false);
const walletContainer = ref(null);

const isWalletConnected = computed(() => !!address?.value);

const walletAddressFormatted = computed(() => {
  if (!address.value) return '';
  return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
});

// Toggle dropdown visibility
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (walletContainer.value && !walletContainer.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.wallet-container {
  display: flex;
  align-items: center;
  position: relative;
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
}

.wallet-address {
  color: white;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #333;
  padding: 4px 12px;
  border-radius: 9999px;
}

.wallet-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: #050505;
  color: #eceff3;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  width: 220px;
  animation: fadeIn 0.2s ease-in-out;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wallet-detail {
  font-size: 12px;
  color: #d1d4da;
  margin: 0;
}

.wallet-address-full {
  font-size: 14px;
  font-weight: 500;
  word-break: break-word;
  color: #b6babe;
}

.wallet-disconnect {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.wallet-disconnect:hover {
  background: #dc2626;
}

/* Animation for dropdown */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
