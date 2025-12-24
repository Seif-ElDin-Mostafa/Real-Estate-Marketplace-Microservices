import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';

const mockAnalysisService = {
    getAnalysis: jest.fn().mockResolvedValue({
        totalProperties: 10,
        averagePrice: 500000,
    }),
};

describe('AnalysisController', () => {
    let controller: AnalysisController;
    let service: AnalysisService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnalysisController],
            providers: [
                {
                    provide: AnalysisService,
                    useValue: mockAnalysisService,
                },
            ],
        }).compile();

        controller = module.get<AnalysisController>(AnalysisController);
        service = module.get<AnalysisService>(AnalysisService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAnalysis', () => {
        it('should return analysis data', async () => {
            const result = await controller.getAnalysis();
            expect(result).toEqual({
                totalProperties: 10,
                averagePrice: 500000,
            });
            expect(service.getAnalysis).toHaveBeenCalled();
        });
    });
});
