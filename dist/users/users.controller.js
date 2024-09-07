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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_users_dto_1 = require("./dto/create-users.dto");
const users_service_1 = require("./users.service");
const viewuser_service_1 = require("./viewuser.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const bcrypt = require("bcrypt");
let UsersController = class UsersController {
    constructor(usersService, ViewuserService) {
        this.usersService = usersService;
        this.ViewuserService = ViewuserService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findById(id);
    }
    async create(res, CreateUsersDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        try {
            const passwordInPlaintext = CreateUsersDto.password;
            const hash = await bcrypt.hash(passwordInPlaintext, 10);
            CreateUsersDto.password = hash;
            CreateUsersDto.createdAt = new Date(Date.now());
            CreateUsersDto.updatedAt = new Date(Date.now());
            let data = await this.usersService.create(CreateUsersDto);
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
        var request_json = JSON.parse(JSON.stringify(request.body));
        var fullname = null;
        var startdate = null;
        var enddate = null;
        var merchant_id = null;
        var data = null;
        var email = null;
        var role = null;
        var page = null;
        var limit = null;
        var descending = null;
        var nameMerchant = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        fullname = request_json["fullname"];
        email = request_json["email"];
        startdate = request_json["startdate"];
        enddate = request_json["enddate"];
        merchant_id = request_json["merchant_id"];
        role = request_json["role"];
        page = Number(request_json["page"]);
        limit = Number(request_json["limit"]);
        nameMerchant = request_json["nameMerchant"];
        descending = request_json["descending"];
        data = await this.ViewuserService.findfilter(startdate, enddate, merchant_id, fullname, email, role, page, limit, id, nameMerchant, descending);
        response = {
            "data": data,
            "page": page,
            "limit": limit,
            "messages": "Success"
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
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_users_dto_1.CreateUsersDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findWhereCompany", null);
UsersController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, viewuser_service_1.ViewuserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map