import Web3 from "web3";
import config from "../config";

export const web3 = new Web3(
  new Web3.providers.HttpProvider(config.TestNetRPC)
);

export const mainnetWeb3 = new Web3(
  new Web3.providers.HttpProvider(config.MainNetRPC)
);
