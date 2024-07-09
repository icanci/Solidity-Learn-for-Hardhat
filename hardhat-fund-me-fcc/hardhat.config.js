require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

// not need this line:
// @see https://ethereum.stackexchange.com/questions/149768/error-hh210-redefinition-of-task-verify-failed-unsupported-operation-adding-po
// require("@nomiclabs/hardhat-etherscan")

// require("@nomiclabs/hardhat-waffle")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COIN_MARKET_CAP_KEY = process.env.COIN_MARKET_CAP_KEY

/** @type import('hardhat/config').HardhatUserConfig */

// yarn hardhat run scripts/deploy.js --network sepolia
module.exports = {
    defauleNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111, // HardhatError: HH101: Hardhat was set to use chain id 11155420, but connected to a chain with id 11155111.
            blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    // 可以添加多个编译版本，这样就可以使用
    // solidity: "0.8.7",
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            { version: "0.8.0" },
        ],
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COIN_MARKET_CAP_KEY,
        token: "MATIC",
    },
    sourcify: {
        enabled: true,
    },
    // getNamedAccounts undifind
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
}
