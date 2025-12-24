import { Controller, Post, Get, Body, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller('search')
export class SearchGatewayController {
    private readonly logger = new Logger(SearchGatewayController.name);
    private searchServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.searchServiceUrl = this.configService.get<string>('SEARCH_SERVICE_URL') || 'http://localhost:3004';
        this.logger.log(`Search service URL: ${this.searchServiceUrl}`);
    }

    @Post()
    async search(@Body() criteria: { priceMin?: number; priceMax?: number; address?: string }) {
        try {
            this.logger.log(`Searching properties with criteria: ${JSON.stringify(criteria)}`);
            const response = await firstValueFrom(
                this.httpService.post(`${this.searchServiceUrl}/search`, criteria, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error searching properties: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to search properties' },
                error.response?.status || 500,
            );
        }
    }
}
