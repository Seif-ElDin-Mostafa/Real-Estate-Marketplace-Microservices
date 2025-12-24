import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class AnalysisService {
    constructor(
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    ) { }

    async getAnalysis() {
        // 1. Get last 10 transactions
        const transactions = await this.transactionModel
            .find()
            .sort({ timestamp: -1 })
            .limit(10)
            .exec();

        if (transactions.length === 0) {
            return {
                message: 'No transactions found for analysis.',
                averagePrice: 0,
                locations: [],
            };
        }

        const propertyIds = transactions.map((t) => t.propertyId);

        // 2. Fetch properties for these transactions
        // Note: Assuming logic where we analyze the properties involved in the last 10 transactions.
        const properties = await this.propertyModel
            .find({ _id: { $in: propertyIds } })
            .exec();

        // 3. Calculate Average Price
        const totalPrize = properties.reduce((sum, p) => sum + p.price, 0);
        const averagePrice = properties.length > 0 ? totalPrize / properties.length : 0;

        // 4. Get Locations
        const locations = properties.map((p) => p.address);

        return {
            totalTransactionsAnalyzed: transactions.length,
            averagePrice,
            locations,
            propertiesAnalyzed: properties, // Optional: return full details
        };
    }
}
