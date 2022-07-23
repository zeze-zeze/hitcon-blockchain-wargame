import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { checkAddress } from "../web3/utils";
import { web3 } from "../web3/index";
import { AbiItem } from "web3-utils";
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
  
  // Check whether the address had got NFT
  const hadSent = await hitconNFTSenderContract.methods.balanceOf(address, 1).call({from: config.PublicKey});
  console.log(hadSent);
  if (hadSent !== 0) {
    return {"status": "fail", "msg": "NFT can only request 1."};
  }

  // Send NFT
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
  return {"status": "success", "msg": "NFT sent.", "receipt": receipt};
};

const hitconNFTSenderCallBack = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.body.address) {
    return next(new BadRequest("Missing Address or Amount."));
  }

  const { address }  = req.body;

  if (!checkAddress(address)) {
    return next(new UnprocessableEntity("Incorrect Wallet Address."));
  }

  // Check all challenges solved
  const info = JSON.parse(
    JSON.stringify(require("../../../frontend/src/hooks/info.json"))
  );

  const chal1Contract = new web3.eth.Contract(
    info["p1"]["abi"] as AbiItem[],
    info["p1"]["addr"]
  );
  const chal2Contract = new web3.eth.Contract(
    info["p2"]["abi"] as AbiItem[],
    info["p2"]["addr"]
  );
  const chal3Contract = new web3.eth.Contract(
    info["p3"]["abi"] as AbiItem[],
    info["p3"]["addr"]
  );
  const chal4Contract = new web3.eth.Contract(
    info["p4"]["abi"] as AbiItem[],
    info["p4"]["addr"]
  );
  const chal5Contract = new web3.eth.Contract(
    info["p5"]["abi"] as AbiItem[],
    info["p5"]["addr"]
  );
  const chal6Contract = new web3.eth.Contract(
    info["p5"]["abi"] as AbiItem[],
    info["p5"]["addr"]
  );

  let allSolved = true;
  const contracts = [chal1Contract, chal2Contract, chal3Contract, chal4Contract, chal5Contract, chal6Contract];
  await Promise.all(contracts.map(async (contract) => {
    const solved = await contract.methods
        .addressToSolved(address)
        .call({ from: config.PublicKey })
    if (!solved) {
      allSolved = false;
    }
  }));

  if (!allSolved) {
    return next(new UnprocessableEntity("Challenges are not all solved."));
  }

  // TODO: Check JWT token

  // Send NFT
  const nft = await send(address);
  if (nft["status"]) {
    return next(new UnprocessableEntity(nft["msg"]));
  }

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
