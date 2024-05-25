const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // 编译合约代码
  // yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
  // rpc interface: https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false
  // http://127.0.0.1:7545

  // 本地区块链的部署地址
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  // 获取一个钱包地址
  const wallet = new ethers.Wallet(
    "0xccb541cdbf637c9c350aac305491d6f301ccdd9d2690c47d7938c3947882f65f",
    provider
  );

  // 我们编译之后的 abi
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  // 我们编译之后的 二进制文件
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // 创建一个合约工厂
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please wait...");
  // 进行合约的部署
  const contract = await contractFactory.deploy({});
  // 交易回执等待多少个区块确认之后，返回
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);

  console.log("Here is the deployment transation: ");
  console.log(contract.deploymentTransaction());
  console.log("Here is the deployment receipt: ");
  console.log(deploymentReceipt);
}

// 运行 main 函数
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
