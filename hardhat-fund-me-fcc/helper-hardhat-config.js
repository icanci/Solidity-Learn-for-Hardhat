const networkConfig = {
    // sepolia price feed address
    // see: https://docs.chain.link/data-feeds/price-feeds/addresses/?network=ethereum&page=1#sepolia-testnet
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
}

const developmentChains = ["hardhat", "localhost"]

const DECIMAILS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMAILS,
    INITIAL_ANSWER,
}
