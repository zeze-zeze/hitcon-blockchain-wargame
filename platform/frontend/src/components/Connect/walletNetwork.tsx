export const setupNetwork = async () => {
  const provider = (window as any)["ethereum"];

  if (provider) {
    const chainId = 4;
    try {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        return true;
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if ((switchError as any).code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: "Rinkeby",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "eth",
                    decimals: 18,
                  },
                  rpcUrls: [process.env.RPC_URL],
                  blockExplorerUrls: ["https://rinkeby.etherscan.io"],
                },
              ],
            });
            return true;
          } catch (addError) {
            // handle "add" error
            console.error("add", addError);
            return false;
          }
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error("setup", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};
