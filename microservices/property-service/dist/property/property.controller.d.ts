import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyController {
    private propertyService;
    constructor(propertyService: PropertyService);
    create(req: any, createPropertyDto: CreatePropertyDto): Promise<{
        success: boolean;
        data: import("./schemas/property.schema").Property;
        message: string;
        error: null;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./schemas/property.schema").Property;
        message: string;
        error: null;
    }>;
    findAll(): Promise<{
        success: boolean;
        data: import("./schemas/property.schema").Property[];
        message: string;
        error: null;
    }>;
    update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<{
        success: boolean;
        data: import("./schemas/property.schema").Property;
        message: string;
        error: null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
        data: null;
        message: string;
        error: null;
    }>;
}
