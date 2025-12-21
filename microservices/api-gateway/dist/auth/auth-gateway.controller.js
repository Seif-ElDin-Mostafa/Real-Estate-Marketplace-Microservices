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
exports.AuthGatewayController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let AuthGatewayController = class AuthGatewayController {
    httpService;
    configService;
    authServiceUrl;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.authServiceUrl = this.configService.get('AUTH_SERVICE_URL') || 'http://localhost:3001/auth';
    }
    async proxyToAuthService(req, res) {
        const url = `${this.authServiceUrl}${req.url}`;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.request({
                method: req.method,
                url: url,
                data: req.body,
                headers: {
                    ...req.headers,
                    host: undefined,
                },
            }));
            res.status(response.status).json(response.data);
        }
        catch (error) {
            const status = error.response?.status || 500;
            const data = error.response?.data || { message: 'Internal server error' };
            res.status(status).json(data);
        }
    }
};
exports.AuthGatewayController = AuthGatewayController;
__decorate([
    (0, common_1.All)('*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGatewayController.prototype, "proxyToAuthService", null);
exports.AuthGatewayController = AuthGatewayController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AuthGatewayController);
//# sourceMappingURL=auth-gateway.controller.js.map