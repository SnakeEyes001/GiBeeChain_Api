import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Web3Service } from './web3.service';


@Controller('web3')
export class Web3Controller {
  constructor(private web3Service: Web3Service) {}

  @Get('instance')
  async getWeb3(): Promise<any> {
    return this.web3Service.getWeb3Instance();
  }

  @Get('createaccount')
  async createAccount(): Promise<any> {
    return this.web3Service.createAccount();
  }

  @Get('accounts')
  async getAllAccounts(): Promise<string[]> {
    return this.web3Service.getAllAccounts();
  }

  @Get('blocknumber')
  async getBlockNumber(): Promise<any> {
    return this.web3Service.getBlockNumber();
  }

  @Get('balance/:address')
  async getBalance(@Param('address') address: string): Promise<bigint> {
    return this.web3Service.getBalance(address);
  }

  @Get('debloyContracts/:totalSupply')
  async deployContracts(@Param('totalSupply') totalSupply: number): Promise<any> {
    return this.web3Service.deployContracts(totalSupply);
  }


/*   @Get('debloyToken/:privateKey')
  async deployTokenContract(@Param('privateKey') privateKey: string): Promise<any> {
    return this.web3Service.deployTokenContract(privateKey);
  }

  
  @Get('debloyICO/:contractAddress/:privateKey/:rate')
  async deployICOContract(@Param('contractAddress') contractAddress: string, @Param('privateKey') privateKey: string, @Param('rate') rate: number): Promise<any> {
    return this.web3Service.deployICOContract(contractAddress,privateKey,rate);
  } */
}
