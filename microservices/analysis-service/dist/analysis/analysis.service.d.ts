import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { TransactionDocument } from './schemas/transaction.schema';
export declare class AnalysisService {
    private propertyModel;
    private transactionModel;
    constructor(propertyModel: Model<PropertyDocument>, transactionModel: Model<TransactionDocument>);
    getAnalysis(): Promise<{
        message: string;
        averagePrice: number;
        locations: any[];
        totalTransactionsAnalyzed?: undefined;
        propertiesAnalyzed?: undefined;
    } | {
        totalTransactionsAnalyzed: number;
        averagePrice: number;
        locations: string[];
        propertiesAnalyzed: (import("mongoose").Document<unknown, {}, PropertyDocument, {}, import("mongoose").DefaultSchemaOptions> & Property & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        message?: undefined;
    }>;
}
