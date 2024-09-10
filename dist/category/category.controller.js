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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const create_category_dto_1 = require("./dto/create-category.dto");
const category_service_1 = require("./category.service");
const viewcategory_service_1 = require("./viewcategory.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const uuid_1 = require("uuid");
let CategoryController = class CategoryController {
    constructor(CategoryService, ViewcategoryService) {
        this.CategoryService = CategoryService;
        this.ViewcategoryService = ViewcategoryService;
    }
    findAll() {
        return this.CategoryService.findAll();
    }
    async create(res, CreateCategoryDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateCategoryDto.id = id;
        CreateCategoryDto.createdAt = new Date(Date.now());
        CreateCategoryDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.CategoryService.create(CreateCategoryDto);
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
    async update(res, CreateCategoryDto, request) {
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
        CreateCategoryDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.CategoryService.update(id, CreateCategoryDto);
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
            data = await this.CategoryService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.CategoryService.destroy(id);
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
        var createdByName = null;
        var page = null;
        var limit = null;
        var descending = null;
        var nameMerchant = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        name = request_json["name"];
        createdByName = request_json["createdByName"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        merchant_id = request_json["merchant_id"];
        page = Number(request_json["page"]);
        limit = Number(request_json["limit"]);
        nameMerchant = request_json["nameMerchant"];
        descending = request_json["descending"];
        data = await this.ViewcategoryService.findfilter(startdate, enddate, merchant_id, name, nameMerchant, createdByName, page, limit, id, descending);
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
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findWhereCompany", null);
CategoryController = __decorate([
    (0, common_1.Controller)('api/category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService, viewcategory_service_1.ViewcategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map