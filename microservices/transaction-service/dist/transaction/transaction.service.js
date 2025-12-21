"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const transaction_schema_1 = require("./schemas/transaction.schema");
let TransactionService = class TransactionService {
    transactionModel;
    httpService;
    configService;
    propertyServiceUrl;
    constructor(transactionModel, httpService, configService) {
        this.transactionModel = transactionModel;
        this.httpService = httpService;
        this.configService = configService;
        this.propertyServiceUrl = this.configService.get('PROPERTY_SERVICE_URL') || 'http://localhost:3002';
    }
    async create(createTransactionDto) {
        const transaction = new this.transactionModel(createTransactionDto);
        const savedTransaction = await transaction.save();
        try {
            await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.propertyServiceUrl}/property/${createTransactionDto.propertyId}`, { isSold: true }));
        }
        catch (error) {
            await this.transactionModel.findByIdAndDelete(savedTransaction['_id']);
            throw new Error('Failed to update property status. Transaction rolled back.');
        }
        return savedTransaction;
    }
    async findById(id) {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async findAll() {
        return this.transactionModel.find();
    }
    async delete(id) {
        const transaction = await this.transactionModel.findByIdAndDelete(id);
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        axios_1.HttpService,
        config_1.ConfigService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map