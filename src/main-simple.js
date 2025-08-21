import { createApp } from 'vue'
import App from './App-simple.vue'
import router from './router'

// Global CSS
import './style.css'

const app = createApp(App)

// Use router
app.use(router)

// Mount app
app.mount('#app')
