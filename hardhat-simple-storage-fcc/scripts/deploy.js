// imports
// run 可以执行 hardhat 的所有任务 task
const { ethers, run, network } = require("hardhat")

async function main() {
    // get a factory
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    console.log("Deploying contract...")
    //what's the private key

    //what's the rpc url

    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`simple storage deployed: ${simpleStorage.target}`)

    console.log(network.config)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        // 要等待有区块验证了之后，在进行确认，否则可能还刷不出来
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    } else {
        console.log("Current network is test network,do not need verify")
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`currentValue: ${currentValue}`)
    // update the value
    const transactionResp = await simpleStorage.store(7)
    await transactionResp.wait(1)
    const newValue = await simpleStorage.retrieve()
    console.log(`newValue: ${newValue}`)
}

// 验证合约
async function verify(contractAddress, args) {
    console.log("Verify contract...")
    // 第一个是要执行的命令，第二个参数是要执行任务的参数 包含实际对象的参数
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
