import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "taiko",
  networks: {
    taiko: {
      url: process.env.TAIKO_RPC_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY as string],
    }
  }
};

export default config;
