import { Module } from '@nestjs/common';
import { IcoService } from './ico.service';
import { IcoController } from './ico.controller';

@Module({
  controllers: [IcoController],
  providers: [IcoService],
})
export class IcoModule {}
