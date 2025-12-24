import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    ) { }

    async search(criteria: { priceMin?: number; priceMax?: number; address?: string }) {
        const query: any = {};

        if (criteria.priceMin !== undefined || criteria.priceMax !== undefined) {
            query.price = {};
            if (criteria.priceMin !== undefined) query.price.$gte = criteria.priceMin;
            if (criteria.priceMax !== undefined) query.price.$lte = criteria.priceMax;
        }

        if (criteria.address) {
            // Case-insensitive regex search for address
            query.address = { $regex: criteria.address, $options: 'i' };
        }

        console.log('Search Query:', query);
        return this.propertyModel.find(query).exec();
    }
}
