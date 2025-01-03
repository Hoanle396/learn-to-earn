require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
require("hardhat-docgen");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("hardhat-tracer");
require("hardhat-log-remover");
require('dotenv').config()

const RPC_HOST = process.env.RPC_HOST
const mnemonic = process.env.MNEMONIC

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    mocha: {
        timeout: 1200000,
    },
    solidity: {
        compilers: [{
            version: "0.8.20",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                    details: {
                        yul: true,
                    },
                },
                viaIR: true,
            }
        }]
    },
    gasReporter: {
        currency: 'USD',
        L1: "ethereum",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        enabled: true,
        gasPrice: "15"

    },
    networks: {
        hardhat: {
            chainId: 1,
            forking: {
                url: RPC_HOST
            },
            accounts: {
                mnemonic,
            },
        },
        dev: {
            chainId: 31337,
            url: "https://rpc.dev-domain.site",
            accounts: {
                mnemonic,
            },
        },
        amoy: {
            url: `https://rpc-amoy.polygon.technology	`,
            accounts: {
                mnemonic,
            },
        },
        polygonmainnet: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/lYZWVc5OXMHaITQazzZHJM_faOYi6MDs`,
            accounts: {
                mnemonic,
            },
        },
        bsctestnet: {
            url: `https://bsc-testnet.blockpi.network/v1/rpc/public`,
            accounts: {
                mnemonic,
            },
        },
        bscmainnet: {
            url: `https://bsc-dataseed1.binance.org/`,
            accounts: {
                mnemonic,
            },
        },
        ftmtestnet: {
            url: `https://rpc.testnet.fantom.network/`,
            accounts: {
                mnemonic,
            },
        },
        ethereum: {
            url: `https://eth-mainnet.nodereal.io/v1/${process.env.NODEREAL_KEY}`,
            accounts: {
                mnemonic,
            },
        },
        sepolia: {
            url: `https://eth-sepolia.nodereal.io/v1/${process.env.NODEREAL_KEY}`,
            accounts: {
                mnemonic,
            },
        },
    },
    etherscan: {
        apiKey: {
            goerli: `${process.env.ETHERSCAN_KEY}`,
            sepolia: `${process.env.ETHERSCAN_KEY}`,
            polygonMumbai: `${process.env.POLYGONSCAN_KEY}`,
            mainnet: `${process.env.ETHERSCAN_KEY}`,
            bscTestnet: `${process.env.BSCSCAN_KEY}`,
            bsc: `${process.env.BSCSCAN_KEY}`,
            polygon: `${process.env.POLYGONSCAN_KEY}`,
            ftmTestnet: `${process.env.FANTOM_KEY}`,
            amoy: `${process.env.POLYGONSCAN_KEY}`,
        },
        customChains: [{
            network: "amoy",
            chainId: 80002,
            urls: {
                apiURL: "https://api-amoy.polygonscan.com/api",
                browserURL: "https://amoy.polygonscan.com"
            },
        }]
    },
    docgen: {
        path: "./docs",
        clear: true,
        runOnCompile: false,
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    typechain: {
        outDir: "typechain-types",
        target: "ethers-v6",
    },

};
