import { createConfig, http } from "@wagmi/vue";
import { bsc, bscTestnet } from "@wagmi/vue/chains";

export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});
