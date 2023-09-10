import { web3 } from "./index";

export const checkAddress = (address: string) => {
  return web3.utils.isAddress(address);
};
