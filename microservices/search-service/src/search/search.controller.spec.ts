import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

const mockSearchService = {
    search: jest.fn().mockResolvedValue([]),
};

describe('SearchController', () => {
    let controller: SearchController;
    let service: SearchService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SearchController],
            providers: [
                {
                    provide: SearchService,
                    useValue: mockSearchService,
                },
            ],
        }).compile();

        controller = module.get<SearchController>(SearchController);
        service = module.get<SearchService>(SearchService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('search', () => {
        it('should return an array of properties', async () => {
            const criteria = { priceMin: 0 };
            const result = await controller.search(criteria);
            expect(result).toEqual([]);
            expect(service.search).toHaveBeenCalledWith(criteria);
        });
    });
});
