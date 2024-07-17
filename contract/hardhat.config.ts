import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337,
      // يمكنك إضافة الإعدادات التالية للتأكد من أن الشبكة المحلية مضبوطة بشكل صحيح
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
};

export default config;
