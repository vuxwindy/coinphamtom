<template>
  <div class="test-connect">
    <h3>Test Wallet Connection</h3>
    <button @click="showModal = true" class="test-btn">
      Test Connect Wallet
    </button>
    
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal" @click.stop>
        <h3>Test Modal</h3>
        <p>This is a test modal to check if it displays.</p>
        <button @click="showModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TestConnect',
  setup() {
    const showModal = ref(false)
    
    return {
      showModal
    }
  }
}
</script>

<style scoped>
.test-connect {
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin: 20px;
}

.test-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
}
</style>
