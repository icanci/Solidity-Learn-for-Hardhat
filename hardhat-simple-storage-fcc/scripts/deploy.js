// imports

const { ethers } = require("hardhat")

async function main() {
    // get a factory
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    //what's the private key

    //what's the rpc url

    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`simple storage deployed: ${simpleStorage.target}`)
}
main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
