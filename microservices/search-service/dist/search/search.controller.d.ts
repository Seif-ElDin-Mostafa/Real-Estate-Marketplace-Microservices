import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(criteria: {
        priceMin?: number;
        priceMax?: number;
        address?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/property.schema").Property & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
