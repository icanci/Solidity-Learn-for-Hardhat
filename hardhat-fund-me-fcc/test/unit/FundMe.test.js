const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, get } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator
    const sendValue = ethers.utils.parseEther("1")

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
    // current: https://www.bilibili.com/video/BV1Ca411n7ta/?p=90&spm_id_from=pageDriver&vd_source=fb8fa95e319da0fd88050e287eb089dc

    describe("constructor", async function () {
        it("sets the aggregator addresses correctly", async function () {
            // AggregatorV3Interface = priceFeed
            const response = await fundMe.priceFeed
            assert.equal(response.address, mockV3Aggregator.address)
        })
    })

    describe("fund", async function () {
        it("Fails if you don't send enough ETH", async function () {
            // todo 此处测试通过 为什么?
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            )
        })

        it("Updated the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue })
        })
    })
})
