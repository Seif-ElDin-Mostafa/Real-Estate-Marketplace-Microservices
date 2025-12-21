import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePropertyDto {
    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    beds?: number;

    @IsOptional()
    @IsNumber()
    baths?: number;

    @IsOptional()
    @IsBoolean()
    isSold?: boolean;

    @IsOptional()
    @IsString()
    image?: string;
}
