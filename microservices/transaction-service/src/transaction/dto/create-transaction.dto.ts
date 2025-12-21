import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsString()
    propertyId: string;

    @IsNotEmpty()
    @IsString()
    buyerId: string;

    @IsNotEmpty()
    @IsString()
    sellerId: string;

    @IsNotEmpty()
    @IsString()
    timestamp: string;
}
