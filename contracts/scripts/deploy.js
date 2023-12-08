
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account : ",await deployer.address);
  const sbt = await hre.ethers.getContractFactory("newone");
  const sbt_deploy = await sbt.deploy(deployer);

  console.log("SBT contract is deployed on address ",await sbt_deploy.getAddress());
  saveFrontendFiles(sbt_deploy , "newone");

  function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "/contractsData";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.target }, undefined, 2)
    );
  
    const contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
