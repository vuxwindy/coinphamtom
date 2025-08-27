// Node.js polyfills for browser environment
import "buffer";
import "process";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { WagmiPlugin } from "@wagmi/vue";
import { wagmiConfig } from "./config/wagmi";
import Toast from "vue-toastification";
import { POSITION } from "vue-toastification";

// Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Global CSS
import "./style.css";
import "./assets/css/icon-fixes.css";

import "vue-toastification/dist/index.css";

const queryClient = new QueryClient();

const app = createApp(App)
  .use(WagmiPlugin, { config: wagmiConfig })
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
  });

app.mount("#app");
