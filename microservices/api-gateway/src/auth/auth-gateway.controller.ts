import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthGatewayController {
    private authServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL') || 'http://localhost:3001/auth';
    }

    @All('*')
    async proxyToAuthService(@Req() req: Request, @Res() res: Response) {
        const url = `${this.authServiceUrl}${req.url}`;

        try {
            const response = await firstValueFrom(
                this.httpService.request({
                    method: req.method,
                    url: url,
                    data: req.body,
                    headers: {
                        ...req.headers,
                        host: undefined,
                    },
                }),
            );

            res.status(response.status).json(response.data);
        } catch (error) {
            const status = error.response?.status || 500;
            const data = error.response?.data || { message: 'Internal server error' };
            res.status(status).json(data);
        }
    }
}
