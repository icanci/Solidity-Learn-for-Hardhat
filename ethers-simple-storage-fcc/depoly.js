async function main() {
  // 编译合约代码
  // yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
  // rpc interface: https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false
  // http://127.0.0.1:7545
}

// 运行 mian 函数
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
