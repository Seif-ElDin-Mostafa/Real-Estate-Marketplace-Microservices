import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
export declare class TransactionGatewayController {
    private httpService;
    private configService;
    private transactionServiceUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    proxyToTransactionService(req: Request, res: Response): Promise<void>;
}
