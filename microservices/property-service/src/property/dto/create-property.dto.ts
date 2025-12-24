import { IsNotEmpty, IsNumber, IsOptional, IsString, IsPositive, Min, MinLength } from 'class-validator';

export class CreatePropertyDto {
    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber({}, { message: 'Price must be a number' })
    @IsPositive({ message: 'Price must be a positive number' })
    price: number;

    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    @MinLength(5, { message: 'Address must be at least 5 characters long' })
    address: string;

    @IsNotEmpty({ message: 'Number of beds is required' })
    @IsNumber({}, { message: 'Beds must be a number' })
    @Min(1, { message: 'Property must have at least 1 bedroom' })
    beds: number;

    @IsNotEmpty({ message: 'Number of baths is required' })
    @IsNumber({}, { message: 'Baths must be a number' })
    @Min(1, { message: 'Property must have at least 1 bathroom' })
    baths: number;

    @IsOptional()
    @IsString({ message: 'Image must be a string' })
    image?: string;
}
