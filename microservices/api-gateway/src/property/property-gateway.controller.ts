import { Controller, All, Post, Get, Put, Delete, Param, Body, Headers, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller('property')
export class PropertyGatewayController {
    private readonly logger = new Logger(PropertyGatewayController.name);
    private propertyServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.propertyServiceUrl = this.configService.get<string>('PROPERTY_SERVICE_URL') || 'http://localhost:3002';
        this.logger.log(`Property service URL: ${this.propertyServiceUrl}`);
    }

    @Post()
    async createProperty(@Body() body: any, @Headers('authorization') auth: string) {
        try {
            this.logger.log('Creating property via gateway');
            const response = await firstValueFrom(
                this.httpService.post(`${this.propertyServiceUrl}/property`, body, {
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json',
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error creating property: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to create property' },
                error.response?.status || 500,
            );
        }
    }

    @Get()
    async getAllProperties() {
        try {
            this.logger.log('Fetching all properties');
            const response = await firstValueFrom(
                this.httpService.get(`${this.propertyServiceUrl}/property`),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error fetching properties: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to fetch properties' },
                error.response?.status || 500,
            );
        }
    }

    @Get(':id')
    async getPropertyById(@Param('id') id: string) {
        try {
            this.logger.log(`Fetching property ${id}`);
            const response = await firstValueFrom(
                this.httpService.get(`${this.propertyServiceUrl}/property/${id}`),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error fetching property ${id}: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Property not found' },
                error.response?.status || 404,
            );
        }
    }

    @Get('seller/:sellerId')
    async getPropertiesBySeller(@Param('sellerId') sellerId: string) {
        try {
            this.logger.log(`Fetching properties for seller ${sellerId}`);
            const response = await firstValueFrom(
                this.httpService.get(`${this.propertyServiceUrl}/property/seller/${sellerId}`),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error fetching seller properties: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to fetch seller properties' },
                error.response?.status || 500,
            );
        }
    }

    @Put(':id')
    async updateProperty(@Param('id') id: string, @Body() body: any, @Headers('authorization') auth: string) {
        try {
            this.logger.log(`Updating property ${id}`);
            const response = await firstValueFrom(
                this.httpService.put(`${this.propertyServiceUrl}/property/${id}`, body, {
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json',
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error updating property ${id}: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to update property' },
                error.response?.status || 500,
            );
        }
    }

    @Delete(':id')
    async deleteProperty(@Param('id') id: string, @Headers('authorization') auth: string) {
        try {
            this.logger.log(`Deleting property ${id}`);
            const response = await firstValueFrom(
                this.httpService.delete(`${this.propertyServiceUrl}/property/${id}`, {
                    headers: {
                        'Authorization': auth,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error deleting property ${id}: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to delete property' },
                error.response?.status || 500,
            );
        }
    }
}
