import { AnalysisService } from './analysis.service';
export declare class AnalysisController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
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
        propertiesAnalyzed: (import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/property.schema").Property & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        message?: undefined;
    }>;
}
