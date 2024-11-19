import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IcoService } from './ico.service';
import { CreateIcoDto } from './dto/create-ico.dto';
import { UpdateIcoDto } from './dto/update-ico.dto';

@Controller('ico')
export class IcoController {
  constructor(private readonly icoService: IcoService) {}

  @Post()
  create(@Body() createIcoDto: CreateIcoDto) {
    return this.icoService.create(createIcoDto);
  }

  @Get()
  findAll() {
    return this.icoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.icoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIcoDto: UpdateIcoDto) {
    return this.icoService.update(+id, updateIcoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.icoService.remove(+id);
  }
}
