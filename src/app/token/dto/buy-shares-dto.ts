import { ApiProperty } from "@nestjs/swagger";

export class BuySharesDto {
    @ApiProperty()
    hiveId: number;

    @ApiProperty()
    sharesAmount: number;

    @ApiProperty()
    privateKey: string;
}