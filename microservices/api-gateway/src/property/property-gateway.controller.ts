import { Controller, All, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('property')
export class PropertyGatewayController {
    private propertyServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.propertyServiceUrl = this.configService.get<string>('PROPERTY_SERVICE_URL') || 'http://localhost:3002/property';
    }

    @All('*')
    async proxyToPropertyService(@Req() req: Request, @Res() res: Response) {
        const url = `${this.propertyServiceUrl}${req.url}`;

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
