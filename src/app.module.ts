import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { WalletModule } from './app/wallet/wallet.module';
import { ConfigModule } from '@nestjs/config';
//import { Web3Module } from './app/config/web3.module';
import { Web3Controller } from './app/web3/web3.controller';
import { Web3Service } from './app/web3/web3.service';
import { TokenController } from './app/token/token.controller';
import { TokenModule } from './app/token/token.module';
import { Web3Module } from './app/web3/web3.module';
import { TokenService } from './app/token/token.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TokenModule,
    Web3Module
  ],
  controllers: [AppController, Web3Controller, TokenController],
  providers: [AppService, Web3Service, TokenService],
})
export class AppModule {}
