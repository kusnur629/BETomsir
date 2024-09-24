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
exports.TypeorderController = void 0;
const common_1 = require("@nestjs/common");
const create_typeorder_dto_1 = require("./dto/create-typeorder.dto");
const typeorder_service_1 = require("./typeorder.service");
const viewtypeorder_service_1 = require("./viewtypeorder.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const uuid_1 = require("uuid");
let TypeorderController = class TypeorderController {
    constructor(TypeorderService, ViewTypeorderService) {
        this.TypeorderService = TypeorderService;
        this.ViewTypeorderService = ViewTypeorderService;
    }
    findAll() {
        return this.TypeorderService.findAll();
    }
    async create(res, CreateTypeorderDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateTypeorderDto.id = id;
        CreateTypeorderDto.createdAt = new Date(Date.now());
        CreateTypeorderDto.updatedAt = new Date(Date.now());
        if (CreateTypeorderDto.status !== undefined) {
            CreateTypeorderDto.status = Number(CreateTypeorderDto.status);
        }
        try {
            let data = await this.TypeorderService.create(CreateTypeorderDto);
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
    async update(res, CreateTypeorderDto, request) {
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
        CreateTypeorderDto.updatedAt = new Date(Date.now());
        if (CreateTypeorderDto.status !== undefined) {
            CreateTypeorderDto.status = Number(CreateTypeorderDto.status);
        }
        try {
            let data = await this.TypeorderService.update(id, CreateTypeorderDto);
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
    async delete(id) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
            throw new common_1.BadRequestException('Param id is required');
        }
        var data = null;
        try {
            data = await this.TypeorderService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.TypeorderService.destroy(id);
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
    async findWhereCompany(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var name = null;
        var startdate = null;
        var enddate = null;
        var merchant_id = null;
        var data = null;
        var phone_number = null;
        var page = null;
        var limit = null;
        var descending = null;
        var nameMerchant = null;
        var email = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        name = request_json["name"];
        email = request_json["email"];
        phone_number = request_json["phone_number"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        merchant_id = request_json["merchant_id"];
        page = Number(request_json["page"]);
        limit = Number(request_json["limit"]);
        nameMerchant = request_json["nameMerchant"];
        descending = request_json["descending"];
        data = await this.ViewTypeorderService.findfilter(startdate, enddate, merchant_id, name, nameMerchant, phone_number, email, page, limit, id, descending);
        response = {
            "data": data,
            "page": page,
            "limit": limit,
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
], TypeorderController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_typeorder_dto_1.CreateTypeorderDto, Object]),
    __metadata("design:returntype", Promise)
], TypeorderController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_typeorder_dto_1.CreateTypeorderDto, Object]),
    __metadata("design:returntype", Promise)
], TypeorderController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeorderController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeorderController.prototype, "findWhereCompany", null);
TypeorderController = __decorate([
    (0, common_1.Controller)('api/Typeorder'),
    __metadata("design:paramtypes", [typeorder_service_1.TypeorderService, viewtypeorder_service_1.ViewTypeorderService])
], TypeorderController);
exports.TypeorderController = TypeorderController;
//# sourceMappingURL=typeorder.controller.js.map