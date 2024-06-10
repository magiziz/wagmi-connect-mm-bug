import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { isMetaMask } from "./metamask";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected({
      target: () => ({
        id: "metaMask",
        name: "MetaMask (custom connector)",
        provider:
          typeof window !== "undefined"
            ? (window as any).ethereum?.providers?.find(isMetaMask) ??
              window.ethereum
            : undefined,
      }),
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
