import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    private propertyServiceUrl: string;

    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.propertyServiceUrl = this.configService.get<string>('PROPERTY_SERVICE_URL') || 'http://localhost:3002';
    }

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        // Create the transaction
        const transaction = new this.transactionModel(createTransactionDto);
        const savedTransaction = await transaction.save();

        // Update property as sold via HTTP call to property service
        try {
            await firstValueFrom(
                this.httpService.put(
                    `${this.propertyServiceUrl}/property/${createTransactionDto.propertyId}`,
                    { isSold: true },
                ),
            );
        } catch (error) {
            // Rollback transaction if property update fails
            await this.transactionModel.findByIdAndDelete(savedTransaction['_id']);
            throw new Error('Failed to update property status. Transaction rolled back.');
        }

        return savedTransaction;
    }

    async findById(id: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        return transaction;
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionModel.find();
    }

    async delete(id: string): Promise<void> {
        const transaction = await this.transactionModel.findByIdAndDelete(id);
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
    }
}
