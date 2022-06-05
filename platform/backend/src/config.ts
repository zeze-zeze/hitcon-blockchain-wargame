require("dotenv").config();

const config = {
  port: process.env.PORT || "3001",

  MainnetRPC: process.env.RPC_URL || "",
  PublicKey: process.env.TEST_ADDRESS || "",
  PrivateKey: process.env.TEST_PRIVATE_KEY || "",
};

export default config;
