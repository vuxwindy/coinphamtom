<script setup>
import ConsoleStatus from './components/ConsoleStatus.vue'
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
  font-family: 'Arial', sans-serif;
  background: #000;
  color: #fff;
}

#app {
  min-height: 100vh;
}
</style>
