import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    private readonly logger = new Logger(TransactionService.name);
    private propertyServiceUrl: string;

    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.propertyServiceUrl = this.configService.get<string>('PROPERTY_SERVICE_URL') || 'http://localhost:3002';
    }

    async create(createTransactionDto: CreateTransactionDto, authToken: string): Promise<Transaction> {
        this.logger.log(`Creating transaction for property ${createTransactionDto.propertyId}`);
        this.logger.log(`Buyer ID: ${createTransactionDto.buyerId}, Seller ID: ${createTransactionDto.sellerId}`);

        // Create the transaction with auto-generated timestamp
        const transaction = new this.transactionModel({
            ...createTransactionDto,
            timestamp: new Date().toISOString(), // Auto-generate timestamp
        });
        const savedTransaction = await transaction.save();
        this.logger.log(`Transaction ${savedTransaction['_id']} created successfully`);

        // Update property as sold via HTTP call to property service
        try {
            this.logger.log(`Marking property ${createTransactionDto.propertyId} as sold`);
            await firstValueFrom(
                this.httpService.put(
                    `${this.propertyServiceUrl}/property/${createTransactionDto.propertyId}`,
                    { isSold: true },
                    {
                        headers: {
                            'Authorization': authToken, // Forward auth token
                            'Content-Type': 'application/json',
                        },
                    }
                ),
            );
            this.logger.log(`Property ${createTransactionDto.propertyId} marked as sold`);
        } catch (error) {
            this.logger.error(`Failed to update property ${createTransactionDto.propertyId}: ${error.message}`);
            // Rollback transaction if property update fails
            await this.transactionModel.findByIdAndDelete(savedTransaction['_id']);
            this.logger.log(`Transaction ${savedTransaction['_id']} rolled back`);
            throw new Error('Failed to update property status. Transaction rolled back.');
        }

        return savedTransaction;
    }

    async findById(id: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction) {
            this.logger.error(`Transaction ${id} not found`);
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
            this.logger.error(`Transaction ${id} not found for deletion`);
            throw new NotFoundException('Transaction not found');
        }
        this.logger.log(`Transaction ${id} deleted successfully`);
    }
}
