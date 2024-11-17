import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "taiko",
  etherscan: {
    apiKey: {
      'taiko': 'empty'
    },
    customChains: [
      {
        chainId: 167009,
        network: "taiko",
        urls: {
          apiURL: 'https://blockscoutapi.hekla.taiko.xyz/api',
          browserURL: "https://explorer.hekla.taiko.xyz"
        }
      }
    ]
  },
  networks: {
    taiko: {
      url: process.env.TAIKO_RPC_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY as string],
      chainId: 167009
    }
  },
  sourcify: {
    enabled: false
  }
};

export default config;
