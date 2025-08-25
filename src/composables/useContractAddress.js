import { computed } from "vue";
import { bsc } from "viem/chains";
import { useChainId } from "@wagmi/vue";

export function useContractAddress() {
  const chainId = useChainId();

  const ppoTokenAddress = computed(() => {
    if (bsc.id === chainId.value) {
      return "0xCdA7eBb5005aaC33B6F4f32c17647698b020eFC9";
    }
    return "0x1C075C6053b1FC1Ee7EED91e4ebe20428bEf4E69";
  });

  const ppoSwapAddress = computed(() => {
    if (bsc.id === chainId.value) {
      return "0x8dCa51f217969A7f9ea1FA5e99d5a66152063188";
    }
    return "0x80B5AcE6283fAf55E8fE4FE9B15d1b2f41aFb95D";
  });

  const ppoPackageAddress = computed(() => {
    if (bsc.id === chainId.value) {
      return "";
    }
    return "0x1AD4B4f9dFAA8A7935AcF76fD81B8434c60F355e";
  });

  return {
    ppoTokenAddress,
    ppoSwapAddress,
    ppoPackageAddress,
  };
}
