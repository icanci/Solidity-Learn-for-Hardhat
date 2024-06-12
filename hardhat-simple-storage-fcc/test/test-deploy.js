const { assert, expect } = require("chai")
const { ethers } = require("hardhat")
describe("SimpleStorage", () => {
    // init
    let simpleStorageFactory, simpleStorage
    // 在测试之前先做什么
    beforeEach(async function () {
        const simpleStorageFactory =
            await ethers.getContractFactory("SimpleStorage")

        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue)
        expect(currentValue.toString()).to.equals(expectedValue)
    })

    // 使用 it.only 就只运行 当前这个单元测试
    it.only("Should update when we call store", async function () {
        const newValuePromise = await simpleStorage.store(7)
        await newValuePromise.wait(1)

        const currentValue = await simpleStorage.retrieve()

        const expectedValue = "7"
        assert.equal(currentValue.toString(), expectedValue)
    })

    // More describes inside describe
    // describe("SimpleStorage", () => {
    // beforeEach()
    // it()
    // })
})
