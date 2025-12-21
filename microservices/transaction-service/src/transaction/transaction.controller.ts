import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id?')
    async getTransaction(@Param('id') id?: string) {
        if (!id) {
            const transactions = await this.transactionService.findAll();
            return transactions;
        }

        const transaction = await this.transactionService.findById(id);
        return {
            success: true,
            data: transaction,
            message: 'Transaction Found',
            error: null,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        const transaction = await this.transactionService.create(createTransactionDto);
        return {
            success: true,
            data: transaction,
            message: 'Transaction Created',
            error: null,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTransaction(@Param('id') id: string) {
        await this.transactionService.delete(id);
        return {
            success: true,
            data: null,
            message: 'Transaction Deleted',
            error: null,
        };
    }
}
