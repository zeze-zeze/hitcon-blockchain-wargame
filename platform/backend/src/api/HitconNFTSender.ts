import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { checkAddress } from "../web3/utils";
import { web3, mainnetWeb3 } from "../web3/index";
import { AbiItem } from "web3-utils";
import config from "../config";
import hitconNFTSenderABI from "../web3/HitconNFTSenderABI.json";
import contractABI from "../share/contracts.json";

const { BadRequest, UnprocessableEntity } = createError;
const send = async (address: string) => {
  const HitconNFTSenderABI = JSON.parse(JSON.stringify(hitconNFTSenderABI));
  const hitconNFTSenderContract = new mainnetWeb3.eth.Contract(
    HitconNFTSenderABI["abi"],
    HitconNFTSenderABI["address"]
  );

  // Check whether the address had got NFT
  const hadSent = await hitconNFTSenderContract.methods
    .balanceOf(address, 1)
    .call({ from: config.PublicKey });
  if (hadSent !== "0") {
    return { status: "fail", msg: "NFT can only be requested once" };
  }

  // Send NFT
  const transaction = hitconNFTSenderContract.methods.allSolved(address);

  const options = {
    to: HitconNFTSenderABI["address"],
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: config.PublicKey }),
    gasPrice: await mainnetWeb3.eth.getGasPrice(),
  };

  const signed = await mainnetWeb3.eth.accounts.signTransaction(
    options,
    config.PrivateKey
  );

  const receipt = await mainnetWeb3.eth.sendSignedTransaction(
    String(signed.rawTransaction)
  );
  return { status: "success", msg: "NFT sent.", receipt: receipt };
};

const hitconNFTSenderCallBack = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      if (!req.body.address) {
        return next(new BadRequest("Missing Address or Amount"));
      }

      // Check whether user have the right to retrieve NFT
      if (!req.session || req.session.type !== "token") {
        return next(new BadRequest("User unauthorized"));
      }

      const { address } = req.body;

      if (!checkAddress(address)) {
        return next(new UnprocessableEntity("Incorrect Wallet Address"));
      }

      // Check all challenges solved
      // TODO: shared folder
      const info = JSON.parse(JSON.stringify(contractABI));
      
      const chal0Contract = new web3.eth.Contract(
        info[0]["abi"] as AbiItem[],
        info[0]["addr"]
      );
      const chal1Contract = new web3.eth.Contract(
        info[1]["abi"] as AbiItem[],
        info[1]["addr"]
      );
      const chal2Contract = new web3.eth.Contract(
        info[2]["abi"] as AbiItem[],
        info[2]["addr"]
      );
      const chal3Contract = new web3.eth.Contract(
        info[3]["abi"] as AbiItem[],
        info[3]["addr"]
      );
      const chal4Contract = new web3.eth.Contract(
        info[4]["abi"] as AbiItem[],
        info[4]["addr"]
      );
      const chal5Contract = new web3.eth.Contract(
        info[5]["abi"] as AbiItem[],
        info[5]["addr"]
      );

      let allSolved = true;
      const contracts = [
        chal0Contract,
        chal1Contract,
        chal2Contract,
        chal3Contract,
        chal4Contract,
        chal5Contract,
      ];
      await Promise.all(
        contracts.map(async (contract) => {
          const solved = await contract.methods
            .addressToSolved(address)
            .call({ from: config.PublicKey });
          if (!solved) {
            allSolved = false;
          }
        })
      );

      if (!allSolved) {
        return next(new UnprocessableEntity("Not all challenges are solved"));
      }

      // Send NFT
      const nft = await send(address);

      if (nft["status"] === "fail") {
        return next(new UnprocessableEntity(nft["msg"]));
      }
      return res.status(200).json({
        ok: true,
        address: address,
      });
    } catch (err) {
      return res.status(500);
    }
  }
);

export default hitconNFTSenderCallBack;
