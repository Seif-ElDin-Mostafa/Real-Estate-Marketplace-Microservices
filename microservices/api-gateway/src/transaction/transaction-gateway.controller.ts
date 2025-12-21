import { Controller, All, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('transaction')
export class TransactionGatewayController {
    private transactionServiceUrl: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.transactionServiceUrl = this.configService.get<string>('TRANSACTION_SERVICE_URL') || 'http://localhost:3003/transaction';
    }

    @All('*')
    async proxyToTransactionService(@Req() req: Request, @Res() res: Response) {
        const url = `${this.transactionServiceUrl}${req.url}`;

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
