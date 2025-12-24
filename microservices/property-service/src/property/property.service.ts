import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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
        try {
            const property = new this.propertyModel({
                ...createPropertyDto,
                sellerId,
                isSold: false,
            });
            return await property.save();
        } catch (error) {
            throw new Error(`Failed to create property: ${error.message}`);
        }
    }

    async findById(id: string): Promise<Property> {
        const property = await this.propertyModel.findById(id).exec();
        if (!property) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }
        return property;
    }

    async findAll(): Promise<Property[]> {
        return this.propertyModel.find().exec();
    }

    async findBySellerId(sellerId: string): Promise<Property[]> {
        return this.propertyModel.find({ sellerId }).exec();
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto, userId?: string): Promise<Property> {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }

        // Verify ownership if userId is provided
        if (userId && property.sellerId !== userId) {
            throw new ForbiddenException('You can only update your own properties');
        }

        const updatedProperty = await this.propertyModel.findByIdAndUpdate(
            id,
            updatePropertyDto,
            { new: true },
        ).exec();

        if (!updatedProperty) {
            throw new NotFoundException(`Property with ID ${id} not found after update`);
        }

        return updatedProperty;
    }

    async delete(id: string, userId?: string): Promise<void> {
        const property = await this.propertyModel.findById(id);
        if (!property) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }

        // Verify ownership if userId is provided
        if (userId && property.sellerId !== userId) {
            throw new ForbiddenException('You can only delete your own properties');
        }

        await this.propertyModel.findByIdAndDelete(id).exec();
    }

    async markAsSold(id: string): Promise<Property> {
        return this.update(id, { isSold: true });
    }
}
