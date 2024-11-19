import { ApiProperty } from "@nestjs/swagger";

export class CreateHiveDto {

    @ApiProperty()
    sharesTotal: number;

}