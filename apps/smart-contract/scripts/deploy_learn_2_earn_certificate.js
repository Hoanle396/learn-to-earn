const { ethers, upgrades } = require("hardhat");
const { verifyContract, verifyImplementContract } = require("./verifyUtils");

async function deployContracts() {
  let contract;

  const [operator] = await ethers.getSigners();
  console.log({ operator: operator.address });

  const LearnToEarnCertificate = await ethers.getContractFactory("LearnToEarnCertificate");
  const adminAddress = "0x62226C6d4B1a8347f42a31D33B72c0905c57e9de";
  contract = await upgrades.deployProxy(LearnToEarnCertificate, []);
  await contract.waitForDeployment();

  console.log(`Contract deployed at: ${await contract.getAddress()}`);

  // set admin
  await contract.setAdmin(adminAddress);

  // Transfer ownership (if needed)
  await contract.transferOwnership(adminAddress);

  for (let i = 0; i < 3; i++) {
    try {
      await verifyContract(contract, []);
      await verifyImplementContract(contract, []);
      console.log(`Verification attempt ${i + 1} successful.`);
      break; // Exit the loop if verification is successful
    } catch (error) {
      console.error(`Verification attempt ${i + 1} failed:`, error);
    }
  }
}

deployContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
