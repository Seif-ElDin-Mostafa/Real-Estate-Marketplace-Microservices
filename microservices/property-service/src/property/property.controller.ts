import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('property')
export class PropertyController {
    private readonly logger = new Logger(PropertyController.name);

    constructor(private propertyService: PropertyService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() createPropertyDto: CreatePropertyDto) {
        try {
            const property = await this.propertyService.create(
                createPropertyDto,
                req.user.id,
            );
            this.logger.log(`Property created by user ${req.user.id}`);
            return {
                success: true,
                data: property,
                message: 'Property created successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Failed to create property: ${error.message}`);
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: 'Failed to create property',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const property = await this.propertyService.findById(id);
            return {
                success: true,
                data: property,
                message: 'Property retrieved successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Failed to find property ${id}: ${error.message}`);
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: 'Property not found',
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get()
    async findAll() {
        try {
            const properties = await this.propertyService.findAll();
            return {
                success: true,
                data: properties,
                message: 'Properties retrieved successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Failed to fetch properties: ${error.message}`);
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: 'Failed to fetch properties',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('seller/:sellerId')
    async findBySeller(@Param('sellerId') sellerId: string) {
        try {
            const properties = await this.propertyService.findBySellerId(sellerId);
            return {
                success: true,
                data: properties,
                message: 'Seller properties retrieved successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Failed to fetch seller properties: ${error.message}`);
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: 'Failed to fetch seller properties',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Request() req, @Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
        try {
            const property = await this.propertyService.update(id, updatePropertyDto, req.user.id);
            this.logger.log(`Property ${id} updated by user ${req.user.id}`);
            return {
                success: true,
                data: property,
                message: 'Property updated successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Failed to update property ${id}: ${error.message}`);
            const status = error.name === 'ForbiddenException' ? HttpStatus.FORBIDDEN : HttpStatus.BAD_REQUEST;
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: error.message || 'Failed to update property',
                    error: error.message,
                },
                status,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string) {
        try {
            await this.propertyService.delete(id, req.user.id);
            this.logger.log(`Property ${id} deleted by user ${req.user.id}`);
            return {
                success: true,
                data: null,
                message: 'Property deleted successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Failed to delete property ${id}: ${error.message}`);
            const status = error.name === 'ForbiddenException' ? HttpStatus.FORBIDDEN : HttpStatus.BAD_REQUEST;
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: error.message || 'Failed to delete property',
                    error: error.message,
                },
                status,
            );
        }
    }
}
