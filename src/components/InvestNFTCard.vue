<template>
  <div class="rounded-xl bg-white/10 p-6 shadow flex flex-col gap-4">
    <div class="flex items-center gap-4 mb-2">
      <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
        <i :class="pool.icon"></i>
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-lg text-white">{{ pool.name }}</h3>
        <p class="text-sm text-white/70">{{ pool.description }}</p>
      </div>
      <div :class="['px-3 py-1 rounded-full text-xs font-semibold', pool.status === 'active' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700']">
        {{ pool.status }}
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 text-sm mb-2">
      <div class="flex justify-between"><span class="text-white/70">APY</span><span class="font-bold text-purple-400">{{ pool.apy }}%</span></div>
      <div class="flex justify-between"><span class="text-white/70">Lock Period</span><span class="font-bold text-purple-400">{{ pool.lockPeriod }}</span></div>
      <div class="flex justify-between"><span class="text-white/70">Min Stake</span><span class="font-bold text-purple-400">{{ pool.minStake }} PPO</span></div>
      <div class="flex justify-between"><span class="text-white/70">Total Staked</span><span class="font-bold text-purple-400">{{ pool.totalStaked }} PPO</span></div>
    </div>
    <div class="flex gap-2 mt-2">
      <button 
        class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg transition hover:from-pink-500 hover:to-purple-500 disabled:opacity-50"
        @click="$emit('stake', pool)"
        :disabled="pool.status === 'coming-soon'"
      >
        <i class="fas fa-lock mr-2"></i>Stake Now
      </button>
      <button 
        class="flex-1 border border-purple-400 text-purple-400 font-semibold py-2 rounded-lg transition hover:bg-purple-400 hover:text-white"
        @click="$emit('details', pool.id)"
      >
        <i class="fas fa-info-circle mr-2"></i>Details
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  pool: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['stake', 'details']);
</script>
