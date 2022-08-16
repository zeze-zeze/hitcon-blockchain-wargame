import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const config = {
  port:
    process.env.NODE_ENV === "development"
      ? "3001"
      : process.env.PORT || "8080",
  problemNum: Number(process.env.PROBLEM_NUM) || 6,
  reactBaseURL: process.env.REACT_BASE_URL || "",
  TestnetRPC: process.env.TESTNET_RPC_URL || "",
  MainnetRPC: process.env.MAINNET_RPC_URL || "",
  PublicKey: process.env.TEST_ADDRESS || "",
  PrivateKey: process.env.TEST_PRIVATE_KEY || "",
  jwtSecret: process.env.JWT_SECRET || "",
  sessionSecret: process.env.SESSION_SECRET || "",
  sslPrivKey:
    process.env.SSL_PRIVATE_KEY || path.resolve(__dirname, "../ssl/sample.key"),
  sslCert: process.env.SSL_CERT || path.resolve(__dirname, "../ssl/sample.crt"),
  NFTAcquired: process.env.NFT_ACQUIRED_FILE || path.resolve(__dirname, "../NFTAcquired.json"),
  HitconLoginPage: process.env.HITCON_LOGIN_PAGE || "https://hitcon.org/2022/login",
};

export default config;
