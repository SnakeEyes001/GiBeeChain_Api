import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Web3Module } from '../web3/web3.module';
import { Web3Service } from '../web3/web3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule.forRoot(),Web3Module],
  controllers: [TokenController],
  providers: [TokenService, Web3Service],
})
export class TokenModule {}
