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
exports.MerchantController = void 0;
const common_1 = require("@nestjs/common");
const create_merchant_dto_1 = require("./dto/create-merchant.dto");
const merchant_service_1 = require("./merchant.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const engine_service_1 = require("../engine/engine.service");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const uuid_1 = require("uuid");
let MerchantController = class MerchantController {
    constructor(MerchantService, EngineService, configService) {
        this.MerchantService = MerchantService;
        this.EngineService = EngineService;
        this.configService = configService;
    }
    findAll() {
        return this.MerchantService.findAll();
    }
    async create(file, CreateMerchantDto_, request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        var id = (0, uuid_1.v4)();
        CreateMerchantDto_.id = id;
        var pathlogoSlider = "merchant/" + id;
        var extension = "jpg";
        if (file != undefined) {
            await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
            CreateMerchantDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
        }
        CreateMerchantDto_.createdAt = new Date(Date.now());
        ;
        CreateMerchantDto_.updatedAt = new Date(Date.now());
        ;
        try {
            let data = await this.MerchantService.create(CreateMerchantDto_);
            var response = {
                "response_code": 202,
                "data": data,
                "messages": {
                    info: ['Successfuly'],
                },
            };
            return response;
        }
        catch (e) {
            throw new common_1.BadRequestException('Failed create data ' + e);
        }
    }
    async update(file, CreateMerchantDto_, request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        var id = null;
        if (request_json["id"] !== undefined) {
            id = request_json["id"];
        }
        else {
            throw new common_1.BadRequestException('Param id is required');
        }
        var pathlogoSlider = "merchant/" + id;
        var extension = "jpg";
        if (file != undefined) {
            await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
            CreateMerchantDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
        }
        CreateMerchantDto_.updatedAt = new Date(Date.now());
        ;
        try {
            let data = await this.MerchantService.create(CreateMerchantDto_);
            var response = {
                "response_code": 202,
                "data": data,
                "messages": {
                    info: ['Successfuly'],
                },
            };
            return response;
        }
        catch (e) {
            throw new common_1.BadRequestException('Failed create data ' + e);
        }
    }
    async findWhereCompany(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var address = null;
        var startdate = null;
        var enddate = null;
        var name = null;
        var data = null;
        var phone_number = null;
        var page = null;
        var limit = null;
        var descending = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        address = request_json["address"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        name = request_json["name"];
        phone_number = request_json["phone_number"];
        page = Number(request_json["page"]);
        limit = Number(request_json["limit"]);
        descending = request_json["descending"];
        data = await this.MerchantService.findfilter(startdate, enddate, name, address, phone_number, page, limit, id, descending);
        response = {
            "data": data,
            "page": page,
            "limit": limit,
            "messages": messages
        };
        return response;
    }
    async getPict(id, response) {
        if (id == undefined || id == "") {
            throw new common_1.BadRequestException('Param id is required');
        }
        console.log(id);
        var extension = "jpg";
        var pathlogoGallery = "merchant/" + id;
        var pathFile = this.configService.get("PATH_UPLOAD") + pathlogoGallery + "/" + id + "." + extension;
        const readableStreamFavicon = fs.readFileSync(pathFile);
        if (readableStreamFavicon != null) {
            response.set("Content-Type", "image/jpeg");
            response.send(readableStreamFavicon);
        }
        else {
            response.send(null);
        }
    }
    async delete(id) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
            throw new common_1.BadRequestException('Param id is required');
        }
        var data = null;
        try {
            data = await this.MerchantService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.MerchantService.destroy(id);
            }
            catch (e) {
                throw new common_1.BadRequestException("Unabled to proceed");
            }
        }
        var response = {
            "response_code": 202,
            "messages": messages
        };
        return response;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_merchant_dto_1.CreateMerchantDto, Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_merchant_dto_1.CreateMerchantDto, Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findWhereCompany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "getPict", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "delete", null);
MerchantController = __decorate([
    (0, common_1.Controller)('api/merchant'),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService,
        engine_service_1.EngineService,
        config_1.ConfigService])
], MerchantController);
exports.MerchantController = MerchantController;
//# sourceMappingURL=merchant.controller.js.map