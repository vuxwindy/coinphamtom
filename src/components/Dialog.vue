<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[9999] flex justify-center bg-purple-900/60 max-h-[100vh] overflow-y-auto pt-[80px]"
    @click.self="close"
  >
    <div
      class="relative text-white rounded-2xl shadow-2xl min-w-[320px] max-w-[90vw] h-min"
    >
      <slot />
      <button
        class="absolute top-4 right-4 bg-purple-600 hover:bg-purple-800 text-white rounded-lg! px-4 font-semibold transition focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
        @click="close"
      >
        X
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  open: Boolean,
})
const emit = defineEmits(['close'])
const close = () => emit('close')
</script>
