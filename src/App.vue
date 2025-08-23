<script setup>
import ConsoleStatus from "./components/ConsoleStatus.vue";
import { createAppKit } from "@reown/appkit/vue";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { bsc, bscTestnet } from "@reown/appkit/networks";

// 1. Get projectId from https://dashboard.reown.com
const projectId = "02a231b2406ed316c861abefc95c5e59";

// 2. Create a metadata object
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks = [bsc, bscTestnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

// 5. Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
});
</script>

<template>
  <div id="app">
    <!-- <ConsoleStatus /> -->
    <router-view />
  </div>
</template>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background: #000;
  color: #fff;
}

#app {
  min-height: 100vh;
}
</style>
