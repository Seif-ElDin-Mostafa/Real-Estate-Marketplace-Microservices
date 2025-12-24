import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthGatewayController } from './auth/auth-gateway.controller';
import { PropertyGatewayController } from './property/property-gateway.controller';
import { TransactionGatewayController } from './transaction/transaction-gateway.controller';
import { SearchGatewayController } from './search/search-gateway.controller';
import { AnalysisGatewayController } from './analysis/analysis-gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [
    AuthGatewayController,
    PropertyGatewayController,
    TransactionGatewayController,
    SearchGatewayController,
    AnalysisGatewayController,
  ],
})
export class AppModule { }
