import { Request, Response } from "express";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { checkAddress } from "../web3/utils";
import { web3 } from "../web3/index";

const { BadRequest, UnprocessableEntity } = createError;

const send = async (address: string) => {
  const FaucetABI = JSON.parse(
    JSON.stringify(require("../web3/FaucetABI.json"))
  );
  const FaucetContract = new web3.eth.Contract(
    FaucetABI["abi"],
    FaucetABI["address"]
  );
  const transaction = FaucetContract.methods.transfer(address);

  const options = {
    to: FaucetABI["address"],
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: process.env.TEST_ADDRESS }),
    gasPrice: await web3.eth.getGasPrice(),
  };
  const signed = await web3.eth.accounts.signTransaction(
    options,
    String(process.env.TEST_PRIVATE_KEY)
  );
  const receipt = await web3.eth.sendSignedTransaction(
    String(signed.rawTransaction)
  );
  return receipt;
};

const faucetCallBack = asyncHandler(async (req: any, res: any, next: any) => {
  console.log(req.body);
  if (!req.body.address) {
    return next(new BadRequest("Missing Address or Amount."));
  }

  const { address } = req.body;

  if (!checkAddress(address)) {
    return next(new UnprocessableEntity("Incorrect Wallet Address."));
  }

  await send(address);

  if (res.status === 500) return res.status(500);
  else {
    return res.status(200).json({
      ok: true,
      address: address,
    });
  }
});

export default faucetCallBack;
