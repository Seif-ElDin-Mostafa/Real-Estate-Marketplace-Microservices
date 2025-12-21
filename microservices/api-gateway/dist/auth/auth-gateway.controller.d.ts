import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
export declare class AuthGatewayController {
    private httpService;
    private configService;
    private authServiceUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    proxyToAuthService(req: Request, res: Response): Promise<void>;
}
