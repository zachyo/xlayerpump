// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenFactoryModule = buildModule("TokenFactoryModule", (m) => {
  // Parameters
  const okbAddress = m.getParameter("okbAddress", "0x1234567890123456789012345678901234567890"); // Placeholder OKB address
  const initialOwner = m.getAccount(0); // Deployer

  // Deploy OKBPoolManager
  const poolManager = m.contract("OKBPoolManager", [okbAddress, initialOwner]);

  // Deploy TokenFactory
  const tokenFactory = m.contract("TokenFactory", [okbAddress, poolManager, initialOwner]);

  return { poolManager, tokenFactory };
});

export default TokenFactoryModule;