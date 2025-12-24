import { IsBoolean, IsNumber, IsOptional, IsString, IsPositive, Min, MinLength } from 'class-validator';

export class UpdatePropertyDto {
    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    @IsPositive({ message: 'Price must be a positive number' })
    price?: number;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    @MinLength(5, { message: 'Address must be at least 5 characters long' })
    address?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Beds must be a number' })
    @Min(1, { message: 'Property must have at least 1 bedroom' })
    beds?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Baths must be a number' })
    @Min(1, { message: 'Property must have at least 1 bathroom' })
    baths?: number;

    @IsOptional()
    @IsBoolean({ message: 'isSold must be a boolean value' })
    isSold?: boolean;

    @IsOptional()
    @IsString({ message: 'Image must be a string' })
    image?: string;
}
