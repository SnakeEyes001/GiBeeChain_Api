import { ApiProperty } from "@nestjs/swagger";

export class ReceiveDistributionDto {

    @ApiProperty()
    privateKey: string;

    @ApiProperty()
    hiveId: number;

    @ApiProperty()
    choice: number ;
}