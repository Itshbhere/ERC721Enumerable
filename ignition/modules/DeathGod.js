const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployMyToken = buildModule("DeployMyToken", (m) => {
  const myToken = m.contract("MyToken", []);

  return { myToken };
});

module.exports = DeployMyToken;