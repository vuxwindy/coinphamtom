<template>
  <div
    class="w-[400px] shadow-2xl rounded-2xl border border-purple-500 bg-purple-800"
  >
    <div class="flex flex-col items-center p-8 space-y-4">
      <div
        class="w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl shadow-lg animate-pulse flex items-center justify-center"
      >
        <span v-if="isLoading" class="text-white text-3xl animate-spin">
          <svg
            class="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </span>
        <span v-else-if="mintResult" class="text-6xl">
          <svg
            v-if="mintResult.tier === 0"
            class="w-20 h-20"
            fill="#b87333"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C7.03 2 3 6.03 3 11c0 3.87 2.69 7.16 6.44 7.86L12 22l2.56-3.14C18.31 18.16 21 14.87 21 11c0-4.97-4.03-9-9-9zm0 16c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z"
            />
          </svg>
          <svg
            v-else-if="mintResult.tier === 1"
            class="w-20 h-20"
            fill="#C0C0C0"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C7.03 2 3 6.03 3 11c0 3.87 2.69 7.16 6.44 7.86L12 22l2.56-3.14C18.31 18.16 21 14.87 21 11c0-4.97-4.03-9-9-9zm0 16c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z"
            />
          </svg>
          <svg
            v-else-if="mintResult.tier === 2"
            class="w-20 h-20"
            fill="#FFD700"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C7.03 2 3 6.03 3 11c0 3.87 2.69 7.16 6.44 7.86L12 22l2.56-3.14C18.31 18.16 21 14.87 21 11c0-4.97-4.03-9-9-9zm0 16c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z"
            />
          </svg>
        </span>
      </div>
      <h2 class="!text-white text-2xl font-bold">Mystery Box</h2>
      <p class="text-purple-200 text-center text-sm">
        Enter BNB amount to open the box and receive NFT + PPO instantly
      </p>
      <input
        type="number"
        v-model.number="bnb"
        placeholder="Enter BNB amount"
        class="w-full px-5 py-3 rounded-2xl border-2 border-purple-400 bg-white text-purple-900 text-lg font-semibold shadow focus:border-purple-600 focus:shadow-lg transition duration-200 outline-none"
        :disabled="isLoading"
      />
      <button
        @click="handleOpenBox"
        class="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-700 text-white text-lg font-bold shadow hover:from-purple-700 hover:to-purple-400 hover:shadow-xl transition duration-200 flex items-center justify-center"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="mr-2">
          <svg
            class="w-6 h-6 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </span>
        {{ isLoading ? "Opening..." : "Open Box" }}
      </button>
      <transition name="fade">
        <div v-if="result" class="mt-4 text-center">
          <p class="text-lg text-white font-bold">You received: {{ result }}</p>
          <p v-if="ppo > 0" class="text-green-400 mt-2">
            PPO reward: {{ ppo.toLocaleString() }} PPO
          </p>
          <div v-if="mintResult" class="mt-2 text-purple-200 text-sm">
            <div>NFT ID: {{ mintResult.tokenId }}</div>
            <div>Tier: {{ ["Bronze", "Silver", "Gold"][mintResult.tier] }}</div>
            <div>BNB: {{ mintResult.amountBNB }}</div>
            <div>PPO/day: {{ mintResult.ppoPerDay }}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ethers } from "ethers";
import { useAccount, useChainId } from "@wagmi/vue";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { useToast } from "vue-toastification";
import { ppoPackageAbi } from "@/abis/ppoPackage.js";
import { wagmiConfig } from "../../config/wagmi";
import { useContractAddress } from "../../composables/useContractAddress";

const emit = defineEmits(["mint"]);

const bnb = ref(0);
const result = ref(null);
const ppo = ref(0);
const mintResult = ref(null);
const isLoading = ref(false);
const toast = useToast();
const { address } = useAccount();
const chainId = useChainId();

const exchangeRate = 870; // 1 BNB = 870 USD (example)
const ppoPrice = 0.05; // 1 PPO = 0.05 USD
const { ppoPackageAddress } = useContractAddress();

function getTier(amount) {
  if (amount >= 0.01 && amount < 0.025) return 0; // bronze
  if (amount >= 0.025 && amount < 0.1) return 1; // silver
  if (amount >= 0.1) return 2; // gold
  return -1;
}

async function handleOpenBox() {
  if (!address.value) {
    toast.error("Please connect your wallet first!");
    return;
  }
  if (bnb.value < 0.01) {
    toast.error("Minimum BNB is 0.01");
    return;
  }
  isLoading.value = true;
  try {
    const value = ethers.parseUnits(bnb.value.toString(), 18);
    const txHash = await writeContract(wagmiConfig, {
      chainId: chainId.value,
      abi: ppoPackageAbi,
      address: ppoPackageAddress.value,
      functionName: "mint",
      args: [],
      value,
    });
    toast.info("Minting NFT...");
    const receipt = await waitForTransactionReceipt(wagmiConfig, {
      chainId: chainId.value,
      hash: txHash,
    });
    // Find Minted event
    const iface = new ethers.Interface(ppoPackageAbi);
    const mintedEvent = receipt.logs
      .map((log) => {
        try {
          const parsed = iface.parseLog(log);
          return parsed;
        } catch (err) {
          return null;
        }
      })
      .find((e) => e && e.name === "Minted");
    if (mintedEvent) {
      const { tokenId, to, tier, amountBNB, ppoPerDay } = mintedEvent.args;
      mintResult.value = {
        tokenId,
        to,
        tier: +tier?.toString(),
        amountBNB: ethers.formatUnits(amountBNB, 18),
        ppoPerDay: ethers.formatUnits(ppoPerDay, 18),
      };

      console.log('mintResult', mintResult?.value)
      toast.success(
        `Mint successful! NFT #${tokenId} (${
          ["Bronze", "Silver", "Gold"][tier]
        })\nBNB: ${mintResult.value.amountBNB}\nPPO/day: ${
          mintResult.value.ppoPerDay
        }`
      );
      result.value = ["Bronze NFT", "Silver NFT", "Gold NFT"][tier];
      ppo.value = Math.floor((bnb.value * exchangeRate) / ppoPrice);
      bnb.value = ''
      emit('minted', mintResult.value);
    } else {
      toast.error("Minted event not found!");
    }
  } catch (err) {
    toast.error("Mint failed!");
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
