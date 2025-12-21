import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop({ required: true })
    propertyId: string;

    @Prop({ required: true })
    buyerId: string;

    @Prop({ required: true })
    sellerId: string;

    @Prop({ required: true })
    timestamp: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
