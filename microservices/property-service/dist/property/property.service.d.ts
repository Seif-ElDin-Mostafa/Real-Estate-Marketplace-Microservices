import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyService {
    private propertyModel;
    constructor(propertyModel: Model<PropertyDocument>);
    create(createPropertyDto: CreatePropertyDto, sellerId: string): Promise<Property>;
    findById(id: string): Promise<Property>;
    findAll(): Promise<Property[]>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property>;
    delete(id: string): Promise<void>;
    markAsSold(id: string): Promise<Property>;
}
