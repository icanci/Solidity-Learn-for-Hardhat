const { run } = require("hardhat")
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

module.exports = {
    verify,
}
