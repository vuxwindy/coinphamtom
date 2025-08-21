<template>
  <div class="debug-connect" style="border: 2px solid red; padding: 10px; margin: 5px;">
    <h4 style="color: red; margin: 0;">DEBUG: Connect Component</h4>
    <button @click="testClick" style="background: red; color: white; border: none; padding: 5px 10px; margin: 5px;">
      Test Button
    </button>
    <span style="color: red;">Component loaded at: {{ loadTime }}</span>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'DebugConnect',
  setup() {
    const loadTime = ref('')
    
    onMounted(() => {
      loadTime.value = new Date().toLocaleTimeString()
    })
    
    const testClick = () => {
      alert('Debug button clicked!')
    }
    
    return {
      loadTime,
      testClick
    }
  }
}
</script>

<style scoped>
.debug-connect {
  display: inline-block;
  background: #fff3cd;
}
</style>
