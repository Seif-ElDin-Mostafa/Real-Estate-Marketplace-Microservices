import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionService {
    private transactionModel;
    private httpService;
    private configService;
    private propertyServiceUrl;
    constructor(transactionModel: Model<TransactionDocument>, httpService: HttpService, configService: ConfigService);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findById(id: string): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    delete(id: string): Promise<void>;
}
