import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty({ message: 'Property ID is required' })
    @IsString({ message: 'Property ID must be a string' })
    propertyId: string;

    @IsNotEmpty({ message: 'Buyer ID is required' })
    @IsString({ message: 'Buyer ID must be a string' })
    buyerId: string;

    @IsNotEmpty({ message: 'Seller ID is required' })
    @IsString({ message: 'Seller ID must be a string' })
    sellerId: string;
}
