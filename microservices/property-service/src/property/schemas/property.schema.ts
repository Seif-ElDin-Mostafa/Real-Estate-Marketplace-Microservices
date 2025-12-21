import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema()
export class Property {
    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    beds: number;

    @Prop({ required: true })
    baths: number;

    @Prop({ required: true })
    sellerId: string;

    @Prop({ default: false })
    isSold: boolean;

    @Prop()
    image: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
