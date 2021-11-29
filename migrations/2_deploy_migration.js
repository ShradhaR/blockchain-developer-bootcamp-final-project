const Migrations = artifacts.require("Tipping");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};