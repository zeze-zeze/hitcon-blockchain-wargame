import fs from "fs";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { checkAddress } from "../web3/utils";
import { web3, mainnetWeb3 } from "../web3/index";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract"
import config from "../config";
import hitconNFTSenderABI from "../web3/HitconNFTSenderABI.json";
import contractABI from "../share/contracts.json";

const { BadRequest, UnprocessableEntity } = createError;

const waitForSignedTx = (signedTx: string) => {
  return new Promise((resolve) => {
    mainnetWeb3.eth.sendSignedTransaction(signedTx)
      .once('transactionHash', (hash: string) => {
        resolve(hash)
      })
  })
}

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
  const transaction = await hitconNFTSenderContract.methods.allSolved(address);

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
  const txHash = await waitForSignedTx(String(signed.rawTransaction));
  return { status: "success", msg: "NFT sent.", txHash: txHash };
};

const hitconNFTSenderCallBack = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      if (!req.body.address) {
        return next(new BadRequest("Missing address or amount"));
      }

      if (!req.session.token) {
        return next(new BadRequest("Missing token"));
      }

      // Check whether user have the right to retrieve NFT
      if (!req.session || req.session.type !== "token") {
        return next(new BadRequest("User unauthorized"));
      }

      const { address } = req.body;
      const token = req.session.token;

      /* Check whether the user want to pickup the mainnet NFT twice */
      const NFTAcquired = JSON.parse(fs.readFileSync(config.NFTAcquired).toString());
      if (NFTAcquired.includes(token)) {
        return next(new BadRequest("NFT can only be requested once"));
      }

      if (!checkAddress(address)) {
        return next(new UnprocessableEntity("Incorrect wallet address"));
      }

      /* validate token */
      const secret = config.jwtSecret;
      const decoded = jwt.verify(token, secret, {
        issuer: "https://hitcon.org",
      });

      if (typeof decoded === "string") {
        return next(new BadRequest("Invalid token"));
      }
      if (decoded.scope !== "wargame wargame_premium") {
        return next(new BadRequest("User unauthorized"));
      }

      // Check all challenges solved
      const info = JSON.parse(JSON.stringify(contractABI));
      let contracts: Contract[] = [];
      for (let i = 0; i < config.problemNum; i++) {
        contracts.push(new web3.eth.Contract(
          info[i]["abi"] as AbiItem[],
          info[i]["addr"]
        ));
      }
      let allSolved = true;
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

      /* Write the pickup record to NFTAcquired.json */
      NFTAcquired.push(token);
      fs.writeFileSync(config.NFTAcquired, JSON.stringify(NFTAcquired));

      return res.status(200).json({
        ok: true,
        address: address,
        txHash: nft.txHash
      });
    } catch (err) {
      if (err instanceof Error && (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError" ||
        err.name === "NotBeforeError")) {
        return next(new BadRequest("Invalid token"));
      } else {
        return res.status(500);
      }
    }
  }
);

export default hitconNFTSenderCallBack;
