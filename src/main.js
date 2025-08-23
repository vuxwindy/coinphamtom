// Node.js polyfills for browser environment
import "buffer";
import "process";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useTaskSystem } from "./composables/useTaskSystem";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { WagmiPlugin } from "@wagmi/vue";
import { wagmiConfig } from "./config/wagmi";
import Toast from "vue-toastification";
import { POSITION } from "vue-toastification";

// Global CSS
import "./style.css";

import "vue-toastification/dist/index.css";

// Initialize task system globally
const { initializeTaskSystem } = useTaskSystem();

const queryClient = new QueryClient();

const app = createApp(App)
  .use(WagmiPlugin, { config: wagmiConfig })
  .use(VueQueryPlugin, { queryClient });
// .mount('#app')

app.config.globalProperties.$taskSystem = useTaskSystem();

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
})

// Global properties

// Use router
app.use(router);

// Mount app
app.mount("#app");
