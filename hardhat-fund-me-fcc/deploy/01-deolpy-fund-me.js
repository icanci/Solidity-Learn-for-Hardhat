// 在这个js中，我们将定义如何部署合约

const { network } = require("hardhat")

// 名字为 deployFunc 就是 hardhat-deploy 需要找的默认函数
// function deployFunc() {
//     console.log("hi")
// }

// module.exports.default = deployFunc

// 当框架调用这个函数的时候，会自动将hre传递到这个函数中去

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // like => hre.getNamedAccounts; hre.deployments;
    const { deply, log } = deployments
    const { deplyer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // 当我们使用本地主机或者 hardhat network的时候，就要使用 mock
}
