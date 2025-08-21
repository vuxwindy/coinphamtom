// Node.js polyfills for browser environment
import 'buffer'
import 'process'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useTaskSystem } from './composables/useTaskSystem'

// Global CSS
import './style.css'

// Initialize task system globally
const { initializeTaskSystem } = useTaskSystem()

const app = createApp(App)

// Global properties
app.config.globalProperties.$taskSystem = useTaskSystem()

// Use router
app.use(router)

// Mount app
app.mount('#app')
