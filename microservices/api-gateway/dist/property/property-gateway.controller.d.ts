import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
export declare class PropertyGatewayController {
    private httpService;
    private configService;
    private propertyServiceUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    proxyToPropertyService(req: Request, res: Response): Promise<void>;
}
