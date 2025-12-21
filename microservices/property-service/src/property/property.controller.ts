import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() createPropertyDto: CreatePropertyDto) {
        const property = await this.propertyService.create(
            createPropertyDto,
            req.user.id,
        );
        return {
            success: true,
            data: property,
            message: 'Property Created',
            error: null,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const property = await this.propertyService.findById(id);
        return {
            success: true,
            data: property,
            message: 'Property Found',
            error: null,
        };
    }

    @Get()
    async findAll() {
        const properties = await this.propertyService.findAll();
        return {
            success: true,
            data: properties,
            message: 'Properties Found',
            error: null,
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
        const property = await this.propertyService.update(id, updatePropertyDto);
        return {
            success: true,
            data: property,
            message: 'Property Updated',
            error: null,
        };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.propertyService.delete(id);
        return {
            success: true,
            data: null,
            message: 'Property Deleted',
            error: null,
        };
    }
}
