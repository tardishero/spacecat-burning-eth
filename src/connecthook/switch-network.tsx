const switchNetworkRequest = () =>
  (window as any).ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x13" }],
  });

const addNetworkRequest = () =>
  (window as any).ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x13",
        chainName: "SongBird",
        rpcUrls: ["https://sgb.ftso.com.au/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://songbird-explorer.flare.network"],
        nativeCurrency: {
          name: "SGB",
          symbol: "SGB",
          decimals: 18,
        },
      },
    ],
  });

export const switchNetwork = async () => {
  if (window as any) {
    try {
      await switchNetworkRequest();
    } catch (error) {
      if ((error as any).code === 4902) {
        try {
          await addNetworkRequest();
          await switchNetworkRequest();
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
