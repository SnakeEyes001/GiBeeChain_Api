import { Injectable } from '@nestjs/common';
import { CreateIcoDto } from './dto/create-ico.dto';
import { UpdateIcoDto } from './dto/update-ico.dto';

@Injectable()
export class IcoService {
  create(createIcoDto: CreateIcoDto) {
    return 'This action adds a new ico';
  }

  findAll() {
    return `This action returns all ico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ico`;
  }

  update(id: number, updateIcoDto: UpdateIcoDto) {
    return `This action updates a #${id} ico`;
  }

  remove(id: number) {
    return `This action removes a #${id} ico`;
  }
}
