import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
    constructor(
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    ) { }

    async create(createPropertyDto: CreatePropertyDto, sellerId: string): Promise<Property> {
        const property = new this.propertyModel({
            ...createPropertyDto,
            sellerId,
            isSold: false,
        });
        return property.save();
    }

    async findById(id: string): Promise<Property> {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new NotFoundException('Property not found');
        }
        return property;
    }

    async findAll(): Promise<Property[]> {
        return this.propertyModel.find();
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
        const property = await this.propertyModel.findByIdAndUpdate(
            id,
            updatePropertyDto,
            { new: true },
        );
        if (!property) {
            throw new NotFoundException('Property not found');
        }
        return property;
    }

    async delete(id: string): Promise<void> {
        const property = await this.propertyModel.findByIdAndDelete(id);
        if (!property) {
            throw new NotFoundException('Property not found');
        }
    }

    async markAsSold(id: string): Promise<Property> {
        return this.update(id, { isSold: true });
    }
}
