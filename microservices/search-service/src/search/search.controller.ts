import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Post()
    async search(@Body() criteria: { priceMin?: number; priceMax?: number; address?: string }) {
        return this.searchService.search(criteria);
    }
}
