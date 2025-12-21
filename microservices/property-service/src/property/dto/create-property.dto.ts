import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePropertyDto {
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    beds: number;

    @IsNotEmpty()
    @IsNumber()
    baths: number;

    @IsOptional()
    @IsString()
    image?: string;
}
