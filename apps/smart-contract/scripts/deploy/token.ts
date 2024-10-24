import { ethers } from "hardhat";

async function main() {

  const Token = await ethers.getContractFactory("LearnToEarn");
  const token = await Token.deploy();

  console.log("Token address:", token.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
