// 在这个js中，我们将定义如何部署合约

const { network } = require("hardhat")

// 名字为 deployFunc 就是 hardhat-deploy 需要找的默认函数
// function deployFunc() {
//     console.log("hi")
// }

// module.exports.default = deployFunc

// price feed
// 当框架调用这个函数的时候，会自动将hre传递到这个函数中去

const { networkConfig } = require("../helper-hardhat-config")

const {
    developmentChains,
    DECIMAILS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // like => hre.getNamedAccounts; hre.deployments;
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // 当我们使用本地主机或者 hardhat network的时候，就要使用 mock

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // mock

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // 放入 priceFeed
        log: true,
    })
    log("------------------------------------------")
}

// 这里运行 yarn hardhat deploy --tags fundme 报错是因为，没有执行 00-deploy-mocks.js 这个mock
// 导致这次部署进程中的 MockV3Aggregator 没有
// 因此，我们使用 yarn hardhat deploy 部署即可. 或者使用 yarn hardhat deploy --tags all
module.exports.tags = ["all", "fundme"]
