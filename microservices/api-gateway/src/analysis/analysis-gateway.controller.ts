import { Controller, Get, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller('analysis')
export class AnalysisGatewayController {
    private readonly logger = new Logger(AnalysisGatewayController.name);
    private analysisServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.analysisServiceUrl = this.configService.get<string>('ANALYSIS_SERVICE_URL') || 'http://localhost:3005';
        this.logger.log(`Analysis service URL: ${this.analysisServiceUrl}`);
    }

    @Get()
    async getAnalysis() {
        try {
            this.logger.log('Fetching market analysis data');
            const response = await firstValueFrom(
                this.httpService.get(`${this.analysisServiceUrl}/analysis`),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error fetching analysis: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to fetch market analysis' },
                error.response?.status || 500,
            );
        }
    }
}
