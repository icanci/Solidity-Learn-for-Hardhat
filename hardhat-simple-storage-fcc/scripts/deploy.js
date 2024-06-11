// imports

const { ethers } = require("hardhat")

async function main() {
    // get a factory
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()

    // await simpleStorage.getDeployedCode()

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
