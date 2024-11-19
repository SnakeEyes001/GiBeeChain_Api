import { PartialType } from '@nestjs/mapped-types';
import { CreateIcoDto } from './create-ico.dto';

export class UpdateIcoDto extends PartialType(CreateIcoDto) {}
