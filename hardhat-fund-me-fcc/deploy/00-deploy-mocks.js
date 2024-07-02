// 部署一个喂价合约
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMAILS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // like => hre.getNamedAccounts; hre.deployments;
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log(deploy)
    log(deployer)

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMAILS, INITIAL_ANSWER],
        })
        log("Mocked Deployed!")
        log("------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
