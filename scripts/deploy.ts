import { ethers } from "hardhat";

async function main() {
  // Получаем первый аккаунт (деployer)
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Получаем фабрику контракта
  const MyToken = await ethers.getContractFactory("MyToken");

  // Деплоим контракт
  const token = await MyToken.deploy();

  // Ждем деплоя
  await token.waitForDeployment();

  console.log("✅ Contract deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});