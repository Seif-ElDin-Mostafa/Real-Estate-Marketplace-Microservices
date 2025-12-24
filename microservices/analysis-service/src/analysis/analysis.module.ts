import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { Property, PropertySchema } from './schemas/property.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Property.name, schema: PropertySchema },
            { name: Transaction.name, schema: TransactionSchema },
        ]),
    ],
    controllers: [AnalysisController],
    providers: [AnalysisService],
})
export class AnalysisModule { }
