import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getTransaction(id?: string): Promise<import("./schemas/transaction.schema").Transaction[] | {
        success: boolean;
        data: import("./schemas/transaction.schema").Transaction;
        message: string;
        error: null;
    }>;
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<{
        success: boolean;
        data: import("./schemas/transaction.schema").Transaction;
        message: string;
        error: null;
    }>;
    deleteTransaction(id: string): Promise<{
        success: boolean;
        data: null;
        message: string;
        error: null;
    }>;
}
