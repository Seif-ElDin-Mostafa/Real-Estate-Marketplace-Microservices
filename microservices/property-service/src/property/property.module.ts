import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property, PropertySchema } from './schemas/property.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]),
        AuthModule,
    ],
    controllers: [PropertyController],
    providers: [PropertyService],
    exports: [PropertyService],
})
export class PropertyModule { }
