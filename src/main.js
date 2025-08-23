// Node.js polyfills for browser environment
import 'buffer'
import 'process'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useTaskSystem } from './composables/useTaskSystem'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createConfig, http } from '@wagmi/vue'
import { bsc, bscTestnet } from '@wagmi/vue/chains'

// Global CSS
import './style.css'

// Initialize task system globally
const { initializeTaskSystem } = useTaskSystem()

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [bsc, createConfig],
  transports: {
    [bsc.id]: http(),
    [createConfig.id]: http(),
  },
})

const app = createApp(App)
  .use(WagmiPlugin, { config })
  .use(VueQueryPlugin, { queryClient })
  // .mount('#app')

// Global properties
app.config.globalProperties.$taskSystem = useTaskSystem()

// Use router
app.use(router)

// Mount app
app.mount('#app')
