import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateHiveDto } from './dto/create-hive-dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { MintDto } from './dto/mint-dto';
import { BuySharesDto } from './dto/buy-shares-dto';
import { HarvestHoneyDto } from './dto/harvest-honey-dto';
import { ReceiveDistributionDto } from './dto/receive-distribution-dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post('mint')
  @ApiBody({
    type: MintDto,
  })
  async mint(@Body() mintDto: MintDto): Promise<any> {
    return await this.tokenService.mint(mintDto.account, mintDto.ammount);
  }

  @Post('create-hive')
  @ApiBody({
    type: CreateHiveDto,
  })
  async createHive(@Body() createHiveDto: CreateHiveDto): Promise<any> {
    return await this.tokenService.createHive(createHiveDto.sharesTotal);
  }

  @Post('buy-shares')
  @ApiBody({
    type: BuySharesDto,
  })
  async buyShares(
    @Body() buySharesDto:BuySharesDto
  ): Promise<any> {
    return await this.tokenService.buyShares(buySharesDto.privateKey, buySharesDto.hiveId, buySharesDto.sharesAmount);
  }

  @Post('harvest-honey')
  @ApiBody({
    type: HarvestHoneyDto,
  })
  async harvestHoney(@Body() harvestHoneyDto: HarvestHoneyDto): Promise<any> {
    return await this.tokenService.harvestHoney(harvestHoneyDto.hiveId);
  }

  @Post('receive-distribution')
  @ApiBody({
    type: ReceiveDistributionDto,
  })
  async receiveDistribution(
    @Body() receiveDistributionDto:ReceiveDistributionDto
  ): Promise<any> {
    return await this.tokenService.receiveDistribution(receiveDistributionDto.privateKey,receiveDistributionDto.hiveId, receiveDistributionDto.choice);
  }
 
  @Get('hive/:hiveId')
  async getHive(@Param('hiveId') hiveId: number): Promise<any> {
    return await this.tokenService.getHive(hiveId);
  }

  @Get('user-hive-shares/:user/:hiveId')
  async getUserHiveShares(@Param('user') user: string, @Param('hiveId') hiveId: number): Promise<any> {
    return await this.tokenService.getUserHiveShares(user, hiveId);
  }

  // New routes to get contract variables
  @Get('total-hives')
  async getTotalHives(): Promise<number> {
    return await this.tokenService.getTotalHives();
  }

  @Get('honey-produced-per-hive')
  async getHoneyProducedPerHive(): Promise<number> {
    return await this.tokenService.getHoneyProducedPerHive();
  }

  @Get('honey-price')
  async getHoneyPrice(): Promise<number> {
    return await this.tokenService.getHoneyPrice();
  }

  @Get('name')
  async getName(): Promise<string> {
    return await this.tokenService.getName();
  }

  @Get('symbol')
  async getSymbol(): Promise<string> {
    return await this.tokenService.getSymbol();
  }

  @Get('total-supply')
  async getTotalSupply(): Promise<number> {
    return await this.tokenService.getTotalSupply();
  }

  @Get('balance-of/:address')
  async getBalanceOf(@Param('address') address: string): Promise<number> {
    return await this.tokenService.getBalanceOf(address);
  }


}
