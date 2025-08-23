<template>
  <div>
    <button 
      v-if="!isWalletConnected" 
      @click="open" 
      class="wallet-button connect"
    >
      Connect Wallet
    </button>
    <div v-else style="color: white; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
      <i class="fas fa-wallet" style="font-size: 16px;"></i>
      {{ walletAddressFormatted }}
      <button 
        @click="disconnect" 
        style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 500; margin-left: 10px;">
        Disconnect
      </button>
    </div>

  </div>
</template>


<script>
import { computed } from 'vue';
import { useAppKit } from '@reown/appkit/vue';
import { useAccount, useDisconnect } from '@wagmi/vue';

export default {
  name: 'ReownWalletButton',
  setup() {
    const { open } = useAppKit();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const isWalletConnected = computed(() => !!address.value);

    const walletAddressFormatted = computed(() => {
      if (!address.value) return ''
      return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
    })

    return {
      isWalletConnected,
      open,
      disconnect,
      walletAddressFormatted
    };
  },
};
</script>

<style scoped>
.wallet-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.wallet-button.connect {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.wallet-button.connect:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.wallet-button.disconnect {
  background: #ef4444;
  color: white;
}

.wallet-button.disconnect:hover {
  background: #dc2626;
}
</style>
