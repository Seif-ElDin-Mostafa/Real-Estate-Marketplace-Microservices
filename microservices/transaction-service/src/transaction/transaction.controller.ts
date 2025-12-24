import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transaction')
export class TransactionController {
    private readonly logger = new Logger(TransactionController.name);

    constructor(private transactionService: TransactionService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTransactions() {
        try {
            this.logger.log('Fetching all transactions');
            const transactions = await this.transactionService.findAll();
            return {
                success: true,
                data: transactions,
                message: 'Transactions retrieved successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Error fetching transactions: ${error.message}`);
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: 'Failed to fetch transactions',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTransaction(@Param('id') id: string) {
        try {
            this.logger.log(`Fetching transaction ${id}`);
            const transaction = await this.transactionService.findById(id);
            return {
                success: true,
                data: transaction,
                message: 'Transaction found',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Error fetching transaction ${id}: ${error.message}`);
            const status = error.name === 'NotFoundException' ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: error.message || 'Failed to fetch transaction',
                    error: error.message,
                },
                status,
            );
        }
    }


    @UseGuards(JwtAuthGuard)
    @Post()
    async createTransaction(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
        try {
            this.logger.log('Creating new transaction');
            // Extract authorization token from request
            const authToken = req.headers.authorization || '';
            const transaction = await this.transactionService.create(createTransactionDto, authToken);
            return {
                success: true,
                data: transaction,
                message: 'Transaction created successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Error creating transaction: ${error.message}`);
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: error.message || 'Failed to create transaction',
                    error: error.message,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTransaction(@Param('id') id: string) {
        try {
            this.logger.log(`Deleting transaction ${id}`);
            await this.transactionService.delete(id);
            return {
                success: true,
                data: null,
                message: 'Transaction deleted successfully',
                error: null,
            };
        } catch (error) {
            this.logger.error(`Error deleting transaction ${id}: ${error.message}`);
            const status = error.name === 'NotFoundException' ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException(
                {
                    success: false,
                    data: null,
                    message: error.message || 'Failed to delete transaction',
                    error: error.message,
                },
                status,
            );
        }
    }
}
