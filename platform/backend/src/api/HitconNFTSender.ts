import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { checkAddress } from "../web3/utils";
import { web3 } from "../web3/index";
import config from "../config";

const { BadRequest, UnprocessableEntity } = createError;

const send = async (address: string) => {
  const hitconNFTSenderABI = JSON.parse(
    JSON.stringify(require("../web3/HitconNFTSenderABI.json"))
  );
  const hitconNFTSenderContract = new web3.eth.Contract(
    hitconNFTSenderABI["abi"],
    hitconNFTSenderABI["address"]
  );
  const transaction = hitconNFTSenderContract.methods.allSolved(address);

  const options = {
    to: hitconNFTSenderABI["address"],
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: config.PublicKey }),
    gasPrice: await web3.eth.getGasPrice(),
  };
  const signed = await web3.eth.accounts.signTransaction(
    options,
    config.PrivateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(
    String(signed.rawTransaction)
  );
  return receipt;
};

const hitconNFTSenderCallBack = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.body.address) {
    return next(new BadRequest("Missing Address or Amount."));
  }

  const { address }  = req.body;

  if (!checkAddress(address)) {
    return next(new UnprocessableEntity("Incorrect Wallet Address."));
  }

  await send(address);

  if (res.statusCode === 500) {
    return res.status(500);
  }
  else {
    return res.status(200).json({
      ok: true,
      address: address,
    });
  }
});

export default hitconNFTSenderCallBack;
