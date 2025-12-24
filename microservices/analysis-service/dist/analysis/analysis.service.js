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
exports.AnalysisService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const property_schema_1 = require("./schemas/property.schema");
const transaction_schema_1 = require("./schemas/transaction.schema");
let AnalysisService = class AnalysisService {
    constructor(propertyModel, transactionModel) {
        this.propertyModel = propertyModel;
        this.transactionModel = transactionModel;
    }
    async getAnalysis() {
        const transactions = await this.transactionModel
            .find()
            .sort({ timestamp: -1 })
            .limit(10)
            .exec();
        if (transactions.length === 0) {
            return {
                message: 'No transactions found for analysis.',
                averagePrice: 0,
                locations: [],
            };
        }
        const propertyIds = transactions.map((t) => t.propertyId);
        const properties = await this.propertyModel
            .find({ _id: { $in: propertyIds } })
            .exec();
        const totalPrize = properties.reduce((sum, p) => sum + p.price, 0);
        const averagePrice = properties.length > 0 ? totalPrize / properties.length : 0;
        const locations = properties.map((p) => p.address);
        return {
            totalTransactionsAnalyzed: transactions.length,
            averagePrice,
            locations,
            propertiesAnalyzed: properties,
        };
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __param(1, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map