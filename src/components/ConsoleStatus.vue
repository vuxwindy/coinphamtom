<template>
  <div class="console-status" v-if="showConsoleStatus">
    <div class="console-panel">
             <div class="console-header">
         <h6>🔍 Console Status (MetaMask)</h6>
        <button @click="togglePanel" class="btn-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="console-body">
        <div class="status-item">
          <span class="status-label">Console Filter:</span>
          <span class="status-value" :class="{ 'active': filterActive }">
            {{ filterActive ? '✅ Active' : '❌ Inactive' }}
          </span>
        </div>
        
                 <div class="status-item">
           <span class="status-label">MetaMask Errors:</span>
           <span class="status-value hidden">🚫 Hidden</span>
         </div>
        
        <div class="status-item">
          <span class="status-label">App Errors:</span>
          <span class="status-value visible">👁️ Visible</span>
        </div>
        
                 <div class="status-item">
           <span class="status-label">Web3 Status:</span>
           <span class="status-value" :class="{ 'active': isWeb3Ready }">
             {{ isWeb3Ready ? '✅ Ready' : '⏳ Loading' }}
           </span>
         </div>
         
         <div class="status-item">
           <span class="status-label">MetaMask:</span>
           <span class="status-value" :class="{ 'active': isMetaMaskAvailable }">
             {{ isMetaMaskAvailable ? '✅ Available' : '❌ Not Found' }}
           </span>
         </div>
      </div>
      
      <div class="console-actions">
        <button @click="toggleFilter" class="btn btn-sm" :class="filterActive ? 'btn-warning' : 'btn-success'">
          {{ filterActive ? 'Disable Filter' : 'Enable Filter' }}
        </button>
        <button @click="clearConsole" class="btn btn-sm btn-secondary">
          Clear Console
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { toggleConsoleFilter } from '../utils/consoleFilter.js'

const showConsoleStatus = ref(true)
const filterActive = ref(true)

// Check MetaMask availability
const isMetaMaskAvailable = computed(() => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
})

// Check Web3 readiness
const isWeb3Ready = computed(() => {
  return typeof window !== 'undefined' && typeof window.Web3 !== 'undefined'
})

const togglePanel = () => {
  showConsoleStatus.value = !showConsoleStatus.value
}

const toggleFilter = () => {
  filterActive.value = !filterActive.value
  toggleConsoleFilter(filterActive.value)
}

const clearConsole = () => {
  if (typeof console !== 'undefined') {
    console.clear()
  }
}

onMounted(() => {
  // Auto-hide sau 5 giây
  setTimeout(() => {
    showConsoleStatus.value = false
  }, 5000)
})
</script>

<style scoped>
.console-status {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 300px;
}

.console-panel {
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  color: white;
  font-size: 12px;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(204, 0, 255, 0.1);
}

.console-header h6 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background 0.3s;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.console-body {
  padding: 15px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 5px 0;
}

.status-label {
  font-weight: 500;
}

.status-value {
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.status-value.active {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
}

.status-value.hidden {
  background: rgba(108, 117, 125, 0.2);
  color: #6c757d;
}

.status-value.visible {
  background: rgba(0, 123, 255, 0.2);
  color: #007bff;
}

.status-value.warning {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.console-actions {
  padding: 10px 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 8px;
}

.btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

@media (max-width: 768px) {
  .console-status {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>
