require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/block-numbers")

// not need this line:
// @see https://ethereum.stackexchange.com/questions/149768/error-hh210-redefinition-of-task-verify-failed-unsupported-operation-adding-po
// require("@nomiclabs/hardhat-etherscan")

// require("@nomiclabs/hardhat-waffle")

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */

// yarn hardhat run scripts/deploy.js --network sepolia
module.exports = {
    defauleNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111, // HardhatError: HH101: Hardhat was set to use chain id 11155420, but connected to a chain with id 11155111.
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
