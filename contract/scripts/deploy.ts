import hre, { ethers } from "hardhat";

async function main() {
  const DTwitter = await hre.ethers.getContractFactory("DTwitter");
  const dtwitter = await DTwitter.deploy();
  await dtwitter.target; // تأكد من أن العقد تم نشره بنجاح
  console.log("DTwitter deployed to:", await dtwitter.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
