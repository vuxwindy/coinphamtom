<template>
  <div class="pool-card">
    <div class="pool-header">
      <div class="pool-icon">
        <img
          v-if="props.nft.tier === 0"
          src="/nft/ppo-bronze.png"
          alt="Bronze NFT"
          class="w-full h-full object-cover rounded-full"
        />
        <img
          v-else-if="props.nft.tier === 1"
          src="/nft/ppo-silver.png"
          alt="Silver NFT"
          class="w-full h-full object-cover rounded-full"
        />
        <img
          v-else-if="props.nft.tier === 2"
          src="/nft/ppo-gold.png"
          alt="Gold NFT"
          class="w-full h-full object-cover rounded-full"
        />
      </div>
      <div class="pool-info">
        <h3 class="pool-name">{{ tier }}</h3>
      </div>
      <div :class="['pool-status', isActive ? 'active' : 'inactive']">
        {{ isActive ? "Active" : "Inactive" }}
      </div>
    </div>
    <div class="pool-stats">
      <div class="stat-row">
        <span class="stat-label">Lock Period</span>
        <span class="stat-value">{{ lockPeriod }} days</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Min Stake</span>
        <span class="stat-value">{{ mintStake }} BNB</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">PPO per day</span>
        <span class="stat-value">{{ ppoPerDay }} PPO</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Pending PPO</span>
        <span class="stat-value">{{ pendingPPO }} PPO</span>
      </div>
    </div>
    <div class="pool-actions">
      <button
        class="btn btn-linear"
        @click="handleClaim"
        :disabled="!isActive || isClaiming"
      >
        <i class="fas fa-lock me-2"></i>
        {{ isClaiming ? "Claiming..." : "Claim Now" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ethers } from "ethers";
import { defineProps, defineEmits, computed, ref, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import { useAccount, useChainId } from "@wagmi/vue";
import { ppoPackageAbi } from "@/abis/ppoPackage.js";
import { wagmiConfig } from "../../config/wagmi";
import { useContractAddress } from "../../composables/useContractAddress";
import { floorFragment } from "@/utils/number";

const props = defineProps({
  nft: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["claimed", "details"]);

const { address } = useAccount();
const chainId = useChainId();
const toast = useToast();
const { ppoPackageAddress } = useContractAddress();

const tier = computed(() => {
  if (props.nft.tier === 0) return "Bozen NFT";
  if (props.nft.tier === 1) return "Silver NFT";
  if (props.nft.tier === 2) return "Gold NFT";
  return "";
});

const isActive = computed(
  () =>
    dayjs().isAfter(dayjs(props.nft.startTime?.toString() * 1000)) &&
    dayjs().isBefore(dayjs(props.nft.endTime?.toString() * 1000))
);

const lockPeriod = computed(() =>
  dayjs(props.nft.endTime?.toString() * 1000).diff(
    dayjs(props.nft.startTime?.toString() * 1000),
    "day"
  )
);

const mintStake = computed(() =>
  ethers.formatUnits(props.nft.buyAmountBNB?.toString(), 18)
);
const ppoPerDay = computed(() =>
  floorFragment(ethers.formatUnits(props.nft.ppoPerDay?.toString(), 18), 5)
);

const pendingPPO = computed(() =>
  floorFragment(ethers.formatUnits(props.nft.pendingPPO?.toString(), 18), 5)
);

const isClaiming = ref(false);

async function handleClaim() {
  if (!address.value) {
    toast.error("Please connect your wallet first!");
    return;
  }
  isClaiming.value = true;
  try {
    const txHash = await writeContract(wagmiConfig, {
      account: address.value,
      chainId: chainId.value,
      abi: ppoPackageAbi,
      address: ppoPackageAddress.value,
      functionName: "claim",
      args: [+props.nft.tokenId?.toString()],
    });
    console.log("Claiming PPO...", +props.nft.tokenId?.toString());
    await waitForTransactionReceipt(wagmiConfig, {
      chainId: chainId.value,
      hash: txHash,
    });
    emit("claimed");
    toast.success("Claim successful!");
  } catch (err) {
    toast.error("Claim failed!");
    console.error(err);
  } finally {
    isClaiming.value = false;
  }
}
</script>

<style scoped>
.pool-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.pool-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.pool-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.pool-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
}

.pool-info {
  flex: 1;
}

.pool-name {
  color: white;
  margin-bottom: 5px;
  font-size: 1.2rem;
}

.pool-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.pool-status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.pool-status.active {
  background: rgba(81, 207, 102, 0.2);
  color: #51cf66;
  border: 1px solid rgba(81, 207, 102, 0.3);
}

.pool-status.inactive {
  background: rgba(255, 212, 59, 0.2);
  color: #ffd43b;
  border: 1px solid rgba(255, 212, 59, 0.3);
}

.pool-stats {
  margin-bottom: 25px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: white;
}

.stat-row .stat-label {
  color: rgba(255, 255, 255, 0.7);
}

.stat-row .stat-value {
  font-weight: 600;
  /* color: #cc00ff; */
  color: white;
}

.pool-actions {
  display: flex;
  gap: 10px;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
}

.btn-linear:hover:not(:disabled) {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  transform: translateY(-2px);
}

.btn-linear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline-linear {
  background: transparent;
  border: 2px solid #cc00ff;
  color: #cc00ff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
}

.btn-outline-linear:hover {
  background: #cc00ff;
  color: white;
}
</style>
