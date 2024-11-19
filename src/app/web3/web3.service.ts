import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import * as fs from 'fs';
import * as path from 'path';
import { FileManager } from 'src/utils/file-manager';


@Injectable()
export class Web3Service {
  private web3: Web3;

  constructor(private configService: ConfigService) {
  /*   const infuraProjectId = this.configService.get<string>('INFURA_PROJECT_ID');
    if (!infuraProjectId) {
      throw new Error('Infura Project ID is not defined in the configuration');
    }
    this.web3 = new Web3(`https://sepolia.infura.io/v3/${infuraProjectId}`); */
    this.web3 = new Web3(`HTTP://127.0.0.1:7545`);
  }

  getWeb3Instance() {
    try {
      return this.web3;
    } catch (error) {
      console.error(`Failed to return a web3 instance`);
      throw new Error(`Failed to return a web3 instance`);
    }
  }

  async createAccount(): Promise<any> {
    try {
      const account = this.web3.eth.accounts.create();
      console.log(`Created account: ${account.address}`);
      return account;
    } catch (error) {
      console.error(`Failed to create account: ${error.message}`);
      throw new Error(`Failed to create account: ${error.message}`);
    }
  }

  async getAllAccounts(): Promise<any> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      console.log('accounts :', accounts);
      return accounts;
    } catch (error) {
      throw new Error(`Failed to get accounts: ${error.message}`);
    }
  }

  async getBlockNumber(): Promise<any> {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber();
      console.log(`Current block number: ${blockNumber}`);
      return blockNumber;
    } catch (error) {
      console.error(`Failed to connect to the network: ${error.message}`);
      throw new Error(`Failed to connect to the network: ${error.message}`);
    }
  }

  async getBalance(address: string): Promise<bigint> { // Web3 returns balance as a string
    try {
      const balance = await this.web3.eth.getBalance(address);
      return balance;
    } catch (error) {
      throw new Error(`Failed to get balance for address ${address}: ${error.message}`);
    }
  }

  async deployTokenContract(privateKey: string): Promise<string> {
    const abiPath = path.resolve('src', 'contractsABI', 'GiBeeToken.json');

    // Read the ABI and bytecode from the JSON file
    const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    const abi = contractJson.abi as AbiItem[];
    //console.log('abi :', abi);
    const bytecode = contractJson.bytecode;

    //console.log('bytecode :', bytecode);

    // Create an account object from the private key
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    //console.log('account :', account);
    //this.web3.eth.accounts.wallet.add(account);
    //this.web3.eth.defaultAccount = account.address;

    // Create a contract instance with the ABI
    const contract = new this.web3.eth.Contract(abi);

    // Prepare the deployment transaction with constructor arguments
    const deploy = contract.deploy({
      data: bytecode,
      arguments: [1000000000], // Pass constructor arguments here
    });

    try {
      // Estimate the gas required for deployment
      const gas = await deploy.estimateGas({
        from: account.address,
      });
      
      // Convert gas to string
      const gasString = gas.toString();
  
      // Send the deployment transaction
      const result = await deploy.send({
        from: account.address,
        gas: gasString,
      });
      console.log(`Contract deployed at address: ${result.options.address}`);
      return result.options.address.toString();
      
    } catch (error) {
      console.error(`Failed to deploy contract: ${error.message}`);
      throw new Error(`Failed to deploy contract: ${error.message}`);
    }
  }

  async deployICOContract(contractAddress: string, privateKey: string, rate: number): Promise<string> {
    const abiPath = path.resolve('src', 'contractsABI', 'ICO.json');

    // Read the ABI and bytecode from the JSON file
    const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    const abi = contractJson.abi as AbiItem[];
    //console.log('abi :', abi);
    const bytecode = contractJson.bytecode;

    //console.log('bytecode :', bytecode);

    // Create an account object from the private key
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    //console.log('account :', account);
    //this.web3.eth.accounts.wallet.add(account);
    //this.web3.eth.defaultAccount = account.address;

    // Create a contract instance with the ABI
    const contract = new this.web3.eth.Contract(abi);

    // Prepare the deployment transaction with constructor arguments
    const deploy = contract.deploy({
      data: bytecode,
      arguments: [contractAddress, account, rate], // Pass constructor arguments here
    });

    try {
      // Estimate the gas required for deployment
      const gas = await deploy.estimateGas({
        from: account.address,
      });
      
      // Convert gas to string
      const gasString = gas.toString();
  
      // Send the deployment transaction
      const result = await deploy.send({
        from: account.address,
        gas: gasString,
      });
      console.log(`Contract deployed at address: ${result.options.address}`);
      return result.options.address;
      
    } catch (error) {
      console.error(`Failed to deploy contract: ${error.message}`);
      throw new Error(`Failed to deploy contract: ${error.message}`);
    }
  }

  async deployContracts(totalSupply: number): Promise<any> {
    const tokenAbiPath = path.resolve('src', 'contractsABI', 'GiBeeToken.json');
    const icoAbiPath = path.resolve('src', 'contractsABI', 'ICO.json');
    // Read the ABI and bytecode from the JSON file of token
    const tokenContractJson = JSON.parse(fs.readFileSync(tokenAbiPath, 'utf8'));
    const tokenAbi = tokenContractJson.abi as AbiItem[];
    const tokenBytecode = tokenContractJson.bytecode;

    // Read the ABI and bytecode from the JSON file of ICO
    const icoContractJson = JSON.parse(fs.readFileSync(icoAbiPath, 'utf8'));
    const icoAbi = icoContractJson.abi as AbiItem[];
    const icoBytecode = icoContractJson.bytecode;

    // Create an account object from the private key
    const account = await this.getAllAccounts();
    //this.web3.eth.accounts.wallet.add(account);
    //this.web3.eth.defaultAccount = account.address;

    // Create a token contract instance with the ABI
    const tokenContract = new this.web3.eth.Contract(tokenAbi);

    // Create an ico contract instance with the ABI
    const icoContract = new this.web3.eth.Contract(icoAbi);

    // Prepare the deployment transaction with constructor arguments
    const deployToken = tokenContract.deploy({
      data: tokenBytecode,
      arguments: [totalSupply], // Pass constructor arguments here
    });

    try {
      // Estimate the gas required for deployment
      const gas = await deployToken.estimateGas({
        from: account[0],
      });
      
      // Convert gas to string
      const gasString = gas.toString();
  
      // Send the deployment transaction
      const result = await deployToken.send({
        from: account[0],
        gas: gasString,
      });
      console.log(`Contract deployed at address: ${result.options.address}`);
      const tokenAddress = result.options.address;

         // Prepare the deployment transaction with constructor arguments
    const deployICO = icoContract.deploy({
      data: icoBytecode,
      arguments: [tokenAddress,account[0],totalSupply], // Pass constructor arguments here
    });
      // Estimate the gas required for deployment
      const gasIco = await deployToken.estimateGas({
        from: account[0],
      });
      
      // Convert gas to string
      const gasIcoString = gasIco.toString();
  
      // Send the deployment transaction
      const resultICO = await deployICO.send({
        from: account[0],
        gas: gasIcoString,
      });
      const icoAddress = resultICO.options.address;
      //write adresses to file 
      const fileManager = new FileManager();
      fileManager.writeToFile(JSON.stringify({
        tokenAddress: tokenAddress,
        icoAddress: icoAddress
      }));
      
      return {
        tokenAddress: tokenAddress,
        icoAddress: icoAddress
      }
    } catch (error) {
      console.error(`Failed to deploy contract: ${error.message}`);
      throw new Error(`Failed to deploy contract: ${error.message}`);
    }
  }
}
