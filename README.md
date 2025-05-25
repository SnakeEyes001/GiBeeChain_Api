# 🍯 honey-traceability-api

A NestJS API bridging Ethereum and Hyperledger Fabric blockchains to provide end-to-end traceability of honey production, processing, and distribution.

---

## 🛠 Tech Stack

- NestJS (Node.js, TypeScript)
- Ethereum via ethers.js or web3.js
- Hyperledger Fabric Gateway SDK
- MongoDB (optional, for off-chain data)
- RESTful API with Swagger

---

## 🔗 Blockchain Setup

### Ethereum

- Network: Goerli / Mainnet / Private testnet
- Contracts: ERC721 tokens representing honey batches, smart contracts for certification & transfers

### Hyperledger Fabric

- Network: test-network or private Fabric network
- Chaincode: Asset transfer chaincode customized for honey batches
- Organizations: Beekeepers, Processors, Distributors as Orgs

---

## 🚀 Features

- 🍯 Register new honey batch (both on Ethereum and Fabric)
- 🔄 Transfer batch ownership with blockchain confirmation
- 📋 Query batch status and provenance
- 🛠 Manage permissions and participants on Fabric
- 📜 Issue certification NFTs on Ethereum

---

## 📦 Installation

```bash
git clone https://github.com/your-org/honey-traceability-api.git
cd honey-traceability-api
npm install
npm run start:dev
