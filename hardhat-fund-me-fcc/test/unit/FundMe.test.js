const { assert } = require("chai")
const { deployments, ethers, getNamedAccounts, get } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    // deploy contract before
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        // 通过这个部署 deploy 中所有的代码
        await deployments.fixture(["all"])
        // getContract 将获取我们告诉他的任何一个合约的最新的部署
        fundMe = await ethers.getContractAt("FundMe", deployer)
        mockV3Aggregator = await ethers.getContractAt(
            "MockV3Aggregator",
            deployer,
        )
    })

    // constructor test
    describe("constructor", async function () {
        it("sets the aggregator addresses correctly", async function () {
            // AggregatorV3Interface = priceFeed
            const response = await fundMe.priceFeed
            assert.equal(response.address, mockV3Aggregator.address)
        })
    })
})
