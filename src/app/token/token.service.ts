import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
//import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
//import { JsonRpcProvider } from 'web3-core';

import * as ABI from '../../contractsABI/GiBeeToken.json';
import * as path from 'path';
import * as fs from 'fs';
import { FileManager } from 'src/utils/file-manager';

@Injectable()
export class TokenService {
  private contract: any;
  private web3: any;
  private contractAddress:string;
  //private readonly contractAddress: string = '0xYourContractAddress'; // Remplacez par l'adresse de votre contrat
  //private readonly contractABI: AbiItem[] = ABI; //require('../../contractsABI/GiBeeToken.json'); // Remplacez par le chemin de votre ABI

  constructor(private web3Service: Web3Service) {
    const abiPath = path.resolve('src', 'contractsABI', 'GiBeeToken.json');
    // Read the ABI from the JSON file
    const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    const abi = contractJson.abi as AbiItem[];
    this.web3 = this.web3Service.getWeb3Instance();
    //readFile for address
    const fileManager = new FileManager();
    const data = fileManager.readFile();
    this.contractAddress = data.tokenAddress;
    this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
  }
   // Helper function to convert BigInt values to strings in JSON
   private stringifyResult(result: any): any {
    return JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
  }
   // Existent methods...

   async mint(account: string, amount: number): Promise<any> {
    const accounts = await this.web3Service.getAllAccounts();
    const gasEstimate = await this.contract.methods.mint(account, amount).estimateGas({
      from: accounts[0],
    });
    console.log('gasEstimated :,', gasEstimate);
   const result = await this.contract.methods.mint(account, amount).send({
      from: accounts[0],
      gas: gasEstimate,
    });
    return this.stringifyResult(result);
  }

  async createHive(sharesTotal: number): Promise<any> {
    try {
      const accounts = await this.web3Service.getAllAccounts();
      const gasEstimate = await this.contract.methods.createHive(sharesTotal).estimateGas({
        from: accounts[0],
      });
      const result= await this.contract.methods.createHive(sharesTotal).send({
        from: accounts[0],
        gas: gasEstimate,
      });
      return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  async buyShares(privateKey: string, hiveId: number, sharesAmount: number): Promise<any> {
    try {
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      const honeyPrice = BigInt(await this.contract.methods.honeyPrice().call());
      const sharesAmountBigInt = BigInt(sharesAmount);
      const totalCost = sharesAmountBigInt * honeyPrice;
      const gasEstimate = await this.contract.methods.buyShares(hiveId, sharesAmount).estimateGas({
        from: account.address,
        value: totalCost.toString(),
      });
    // Create an account object from the private key
    //const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    const result = await this.contract.methods.buyShares(hiveId, sharesAmount).send({
      from: account.address,
      value: totalCost.toString(),
      gas: gasEstimate,
    });
    return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  async harvestHoney(hiveId: number): Promise<any> {
    try {
      const accounts = await this.web3Service.getAllAccounts();
      const gasEstimate = await this.contract.methods.harvestHoney(hiveId).estimateGas({from:accounts[0]});
      const result = await this.contract.methods.harvestHoney(hiveId).send({
        from: accounts[0],
        gas: gasEstimate,
      });
      return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  
  }

async receiveDistribution(privateKey:string, hiveId: number, choice: number): Promise<any> {
    try {
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      const gasEstimate = await this.contract.methods.receiveDistribution(hiveId, choice).estimateGas({from:account.address});
      // Create an account object from the private key
      //const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    const result = await this.contract.methods.receiveDistribution(hiveId, choice).send({
      from: account.address,
      gas: gasEstimate,
    });
    return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getHive(hiveId: number): Promise<any> {
    try {
      const result = await this.contract.methods.hives(hiveId).call();
      return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getUserHiveShares(user: string, hiveId: number): Promise<any> {
    try {
      const result = await this.contract.methods.userHiveShares(user, hiveId).call();
      return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  // New methods to get contract variables
  async getTotalHives(): Promise<any> {
    try {
      const result = await this.contract.methods.totalHives().call();
      return this.stringifyResult(result);
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getHoneyProducedPerHive(): Promise<number> {
    try {
      return await this.contract.methods.honeyProducedPerHive().call();
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getHoneyPrice(): Promise<number> {
    try {
      return await this.contract.methods.honeyPrice().call();
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getName(): Promise<string> {
    try {
      return await this.contract.methods.name().call();
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getSymbol(): Promise<string> {
    try {
      return await this.contract.methods.symbol().call();
    } catch (error) {
      console.log('error :', error);
    }
  }

  async getTotalSupply(): Promise<number> {
    try {
      return await this.contract.methods.totalSupply().call();
    } catch (error) {
      console.log('error :', error);
    }
    
  }

  async getBalanceOf(address: string): Promise<number> {
    try {
      return await this.contract.methods.balanceOf(address).call();
    } catch (error) {
      console.log('error :', error);
    }
    
  } 
}
