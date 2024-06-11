require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
// require("@nomiclabs/hardhat-waffle")

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */

// yarn hardhat run scripts/deploy.js --network Sepolia
module.exports = {
    defauleNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155420,
        },
    },
    solidity: "0.8.7",
}
