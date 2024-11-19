import { ApiProperty } from "@nestjs/swagger";

export class MintDto {
    @ApiProperty()
    account: string;

    @ApiProperty()
    ammount: number;
}