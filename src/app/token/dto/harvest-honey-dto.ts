import { ApiProperty } from "@nestjs/swagger";

export class HarvestHoneyDto {
    @ApiProperty()
    hiveId: number;
}