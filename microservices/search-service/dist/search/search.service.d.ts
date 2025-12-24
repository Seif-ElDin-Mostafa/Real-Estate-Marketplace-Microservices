import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
export declare class SearchService {
    private propertyModel;
    constructor(propertyModel: Model<PropertyDocument>);
    search(criteria: {
        priceMin?: number;
        priceMax?: number;
        address?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}, import("mongoose").DefaultSchemaOptions> & Property & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
