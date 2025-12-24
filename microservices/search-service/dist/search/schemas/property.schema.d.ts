import { Document } from 'mongoose';
export type PropertyDocument = Property & Document;
export declare class Property {
    price: number;
    address: string;
    beds: number;
    baths: number;
    sellerId: string;
    isSold: boolean;
    image: string;
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, Document<unknown, any, Property, any, import("mongoose").DefaultSchemaOptions> & Property & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Property>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, Document<unknown, {}, Property, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    price?: import("mongoose").SchemaDefinitionProperty<number, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: import("mongoose").SchemaDefinitionProperty<string, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    beds?: import("mongoose").SchemaDefinitionProperty<number, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    baths?: import("mongoose").SchemaDefinitionProperty<number, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    sellerId?: import("mongoose").SchemaDefinitionProperty<string, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isSold?: import("mongoose").SchemaDefinitionProperty<boolean, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    image?: import("mongoose").SchemaDefinitionProperty<string, Property, Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Property & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Property>;
