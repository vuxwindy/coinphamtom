<template>
  <div class="wallet-test">
    <h1>Wallet Connection Test</h1>
    
    <div class="test-section">
      <h2>ThirdWeb Connect Components</h2>
      <div class="components-demo">
        <div class="component-demo">
          <h3>WalletStatus Component</h3>
          <WalletStatus />
        </div>
        <div class="component-demo">
          <h3>ThirdWebConnect Component</h3>
          <ThirdWebConnect />
        </div>
      </div>
    </div>

    <div class="test-section">
      <h2>Connection Events</h2>
      <div class="events-log">
        <div v-for="(event, index) in events" :key="index" class="event-item" :class="event.type">
          <span class="event-time">{{ event.time }}</span>
          <span class="event-message">{{ event.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import ThirdWebConnect from '@/components/ThirdWebConnect.vue'
import WalletStatus from '@/components/WalletStatus.vue'

export default {
  name: 'WalletTest',
  components: {
    ThirdWebConnect,
    WalletStatus
  },
  setup() {
    const events = ref([])

    const addEvent = (type, message) => {
      events.value.unshift({
        type,
        message,
        time: new Date().toLocaleTimeString()
      })
      
      // Keep only last 10 events
      if (events.value.length > 10) {
        events.value = events.value.slice(0, 10)
      }
    }

    const handleWalletConnected = (event) => {
      const { address, wallet } = event.detail
      addEvent('success', `Connected to ${wallet}: ${address}`)
    }

    const handleWalletDisconnected = () => {
      addEvent('info', 'Wallet disconnected')
    }

    onMounted(() => {
      window.addEventListener('wallet-connected', handleWalletConnected)
      window.addEventListener('wallet-disconnected', handleWalletDisconnected)
      addEvent('info', 'Wallet test page loaded')
    })

    onUnmounted(() => {
      window.removeEventListener('wallet-connected', handleWalletConnected)
      window.removeEventListener('wallet-disconnected', handleWalletDisconnected)
    })

    return {
      events
    }
  }
}
</script>

<style scoped>
.wallet-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.test-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.test-section h2 {
  margin-top: 0;
  color: #333;
}

.components-demo {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.component-demo {
  flex: 1;
  min-width: 200px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
}

.component-demo h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #555;
  font-size: 14px;
}

.events-log {
  max-height: 300px;
  overflow-y: auto;
  background: #f4f4f4;
  border-radius: 4px;
  padding: 10px;
}

.event-item {
  display: flex;
  gap: 10px;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
}

.event-item.success {
  background: #d4edda;
  color: #155724;
  border-left: 3px solid #28a745;
}

.event-item.info {
  background: #d1ecf1;
  color: #0c5460;
  border-left: 3px solid #17a2b8;
}

.event-item.error {
  background: #f8d7da;
  color: #721c24;
  border-left: 3px solid #dc3545;
}

.event-time {
  color: #666;
  min-width: 80px;
}

.event-message {
  flex: 1;
  word-break: break-all;
}

@media (max-width: 600px) {
  .components-demo {
    flex-direction: column;
  }
  
  .component-demo {
    min-width: auto;
  }
}
</style>
