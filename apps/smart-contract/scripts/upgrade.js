const { ethers, upgrades } = require("hardhat");
const { verifyContract, verifyImplementContract } = require("./verifyUtils");

async function upgradeContract(proxyAddress, contractName) {
    let contract;

    const [operator] = await ethers.getSigners();
    console.log({ operator: operator.address });

    // Dynamically get the contract factory based on the provided contract name
    const ContractFactory = await ethers.getContractFactory(contractName);

    if (!proxyAddress) {
        throw new Error("Proxy address must be provided for upgrading a contract");
    }

    // Upgrade the contract at the specified proxy address
    contract = await upgrades.upgradeProxy(proxyAddress, ContractFactory);
    console.log(`${contractName} upgraded at: ${await contract.getAddress()}`);

    // Verification Process
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

const proxyAddress = "0xe2CAF70789E2b536719FD2CDc2aa9449Da2b5501"; // Replace with your proxy contract address
const contractName = "LearnToEarnCertificate"; // Replace with the name of the contract you want to upgrade

upgradeContract(proxyAddress, contractName).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});