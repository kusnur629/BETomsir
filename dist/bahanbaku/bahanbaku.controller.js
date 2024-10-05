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
exports.BahanbakuController = void 0;
const common_1 = require("@nestjs/common");
const create_bahanbaku_dto_1 = require("./dto/create-bahanbaku.dto");
const bahanbaku_service_1 = require("./bahanbaku.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let BahanbakuController = class BahanbakuController {
    constructor(BahanbakuService, configService) {
        this.BahanbakuService = BahanbakuService;
        this.configService = configService;
    }
    findAll() {
        return this.BahanbakuService.findAll();
    }
    async create(res, CreateBahanbakuDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateBahanbakuDto.id = id;
        CreateBahanbakuDto.createdAt = new Date(Date.now());
        CreateBahanbakuDto.updatedAt = new Date(Date.now());
        if (CreateBahanbakuDto.stock !== undefined) {
            CreateBahanbakuDto.stock = Number(CreateBahanbakuDto.stock);
        }
        if (CreateBahanbakuDto.is_stock !== undefined) {
            CreateBahanbakuDto.is_stock = Number(CreateBahanbakuDto.is_stock);
        }
        if (CreateBahanbakuDto.is_minus_stock !== undefined) {
            CreateBahanbakuDto.is_minus_stock = Number(CreateBahanbakuDto.is_minus_stock);
        }
        if (CreateBahanbakuDto.qty_plus_minus !== undefined) {
            CreateBahanbakuDto.qty_plus_minus = Number(CreateBahanbakuDto.qty_plus_minus);
        }
        if (CreateBahanbakuDto.harga !== undefined) {
            CreateBahanbakuDto.harga = Number(CreateBahanbakuDto.harga);
        }
        try {
            let data = await this.BahanbakuService.create(CreateBahanbakuDto);
            res.status(common_1.HttpStatus.OK).json({
                response_code: 202,
                "data": data,
                "message": messages
            });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({
                "message": messagesEror + e
            });
        }
    }
    async update(res, CreateBahanbakuDto, request) {
        const messages = {
            "info": ["The update successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var id = null;
        if (request_json["id"] !== undefined) {
            id = request_json["id"];
        }
        else {
            throw new common_1.BadRequestException('Param id is required');
        }
        CreateBahanbakuDto.updatedAt = new Date(Date.now());
        if (CreateBahanbakuDto.stock !== undefined) {
            CreateBahanbakuDto.stock = Number(CreateBahanbakuDto.stock);
        }
        if (CreateBahanbakuDto.is_stock !== undefined) {
            CreateBahanbakuDto.is_stock = Number(CreateBahanbakuDto.is_stock);
        }
        if (CreateBahanbakuDto.is_minus_stock !== undefined) {
            CreateBahanbakuDto.is_minus_stock = Number(CreateBahanbakuDto.is_minus_stock);
        }
        if (CreateBahanbakuDto.qty_plus_minus !== undefined) {
            CreateBahanbakuDto.qty_plus_minus = Number(CreateBahanbakuDto.qty_plus_minus);
        }
        if (CreateBahanbakuDto.harga !== undefined) {
            CreateBahanbakuDto.harga = Number(CreateBahanbakuDto.harga);
        }
        try {
            let data = await this.BahanbakuService.update(id, CreateBahanbakuDto);
            res.status(common_1.HttpStatus.OK).json({
                response_code: 202,
                "data": data,
                "message": messages
            });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({
                "message": messagesEror
            });
        }
    }
    async findWhereCompany(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var remark = null;
        var startdate = null;
        var enddate = null;
        var name = null;
        var data = null;
        var page = null;
        var limit = null;
        var descending = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        name = request_json["name"];
        page = Number(request_json["page"]);
        limit = Number(request_json["limit"]);
        descending = request_json["descending"];
        data = await this.BahanbakuService.findfilter(startdate, enddate, name, page, limit, id, descending);
        response = {
            "data": data,
            "page": page,
            "limit": limit,
            "messages": messages
        };
        return response;
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
            data = await this.BahanbakuService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.BahanbakuService.destroy(id);
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
], BahanbakuController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bahanbaku_dto_1.CreateBahanbakuDto, Object]),
    __metadata("design:returntype", Promise)
], BahanbakuController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bahanbaku_dto_1.CreateBahanbakuDto, Object]),
    __metadata("design:returntype", Promise)
], BahanbakuController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BahanbakuController.prototype, "findWhereCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BahanbakuController.prototype, "delete", null);
BahanbakuController = __decorate([
    (0, common_1.Controller)('api/Bahanbaku'),
    __metadata("design:paramtypes", [bahanbaku_service_1.BahanbakuService,
        config_1.ConfigService])
], BahanbakuController);
exports.BahanbakuController = BahanbakuController;
//# sourceMappingURL=bahanbaku.controller.js.map