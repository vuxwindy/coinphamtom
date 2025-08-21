<template>
  <div class="simple-connect">
    <button @click="connect" class="connect-btn">
      <i class="fas fa-wallet"></i>
      Connect Wallet
    </button>
  </div>
</template>

<script>
export default {
  name: 'SimpleConnect',
  setup() {
    const connect = () => {
      // Simulate connection
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40)
      
      // Emit connection event
      window.dispatchEvent(new CustomEvent('wallet-connected', {
        detail: {
          address: mockAddress,
          wallet: 'metamask',
          connection: { address: mockAddress }
        }
      }))
      
      // Show notification
      alert('Wallet connected: ' + mockAddress)
    }
    
    return {
      connect
    }
  }
}
</script>

<style scoped>
.simple-connect {
  display: inline-block;
}

.connect-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.connect-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
