import { Controller, Post, Get, Delete, Body, Param, Headers, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller('transaction')
export class TransactionGatewayController {
    private readonly logger = new Logger(TransactionGatewayController.name);
    private transactionServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.transactionServiceUrl = this.configService.get<string>('TRANSACTION_SERVICE_URL') || 'http://localhost:3003';
        this.logger.log(`Transaction service URL: ${this.transactionServiceUrl}`);
    }

    @Post()
    async createTransaction(@Body() transactionData: any, @Headers('authorization') auth: string) {
        try {
            this.logger.log('Creating transaction via gateway');
            const response = await firstValueFrom(
                this.httpService.post(`${this.transactionServiceUrl}/transaction`, transactionData, {
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json',
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error creating transaction: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to create transaction' },
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    async getAllTransactions(@Headers('authorization') auth: string) {
        try {
            this.logger.log('Fetching all transactions via gateway');
            const response = await firstValueFrom(
                this.httpService.get(`${this.transactionServiceUrl}/transaction`, {
                    headers: {
                        'Authorization': auth,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error fetching transactions: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to fetch transactions' },
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get(':id')
    async getTransactionById(@Param('id') id: string, @Headers('authorization') auth: string) {
        try {
            this.logger.log(`Fetching transaction ${id} via gateway`);
            const response = await firstValueFrom(
                this.httpService.get(`${this.transactionServiceUrl}/transaction/${id}`, {
                    headers: {
                        'Authorization': auth,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error fetching transaction ${id}: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to fetch transaction' },
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Delete(':id')
    async deleteTransaction(@Param('id') id: string, @Headers('authorization') auth: string) {
        try {
            this.logger.log(`Deleting transaction ${id} via gateway`);
            const response = await firstValueFrom(
                this.httpService.delete(`${this.transactionServiceUrl}/transaction/${id}`, {
                    headers: {
                        'Authorization': auth,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            this.logger.error(`Error deleting transaction ${id}: ${error.message}`);
            throw new HttpException(
                error.response?.data || { success: false, message: 'Failed to delete transaction' },
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
