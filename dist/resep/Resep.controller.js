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
exports.ResepController = void 0;
const common_1 = require("@nestjs/common");
const create_resep_dto_1 = require("./dto/create-resep.dto");
const resep_service_1 = require("./resep.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const bahanbakuresep_service_1 = require("./bahanbakuresep.service");
const create_bahanbakuresep_dto_1 = require("./dto/create-bahanbakuresep.dto");
let ResepController = class ResepController {
    constructor(ResepService, BahanbakuresepService, configService) {
        this.ResepService = ResepService;
        this.BahanbakuresepService = BahanbakuresepService;
        this.configService = configService;
    }
    findAll() {
        return this.ResepService.findAll();
    }
    async create(res, CreateResepDto, request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        var bahanbakuresep = null;
        bahanbakuresep = request_json["bahanbakuresep"];
        CreateResepDto.id = id;
        CreateResepDto.createdAt = new Date(Date.now());
        CreateResepDto.updatedAt = new Date(Date.now());
        if (CreateResepDto.hpp !== undefined) {
            CreateResepDto.hpp = Number(CreateResepDto.hpp);
        }
        if (bahanbakuresep !== undefined) {
            try {
                this.Bahanbaku_resep(id, bahanbakuresep);
            }
            catch (e) {
            }
        }
        try {
            let data = await this.ResepService.create(CreateResepDto);
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
    async update(res, CreateResepDto, request) {
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
        CreateResepDto.updatedAt = new Date(Date.now());
        if (CreateResepDto.hpp !== undefined) {
            CreateResepDto.hpp = Number(CreateResepDto.hpp);
        }
        try {
            let data = await this.ResepService.update(id, CreateResepDto);
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
        data = await this.ResepService.findfilter(startdate, enddate, name, page, limit, id, descending);
        response = {
            "data": data,
            "page": page,
            "limit": limit,
            "messages": messages
        };
        return response;
    }
    async findWhereCompany3(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var data = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        data = await this.ResepService.findById(id);
        if (data !== null) {
            let bahanbakuresep = [];
            try {
                bahanbakuresep = await this.BahanbakuresepService.findByIdResep(id);
            }
            catch (e) {
                bahanbakuresep = [];
            }
            data.bahanbakuresep = bahanbakuresep;
        }
        response = {
            "data": data,
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
            data = await this.ResepService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.ResepService.destroy(id);
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
    async create2(res, CreateBahanbakuresepDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateBahanbakuresepDto.id = id;
        CreateBahanbakuresepDto.createdAt = new Date(Date.now());
        CreateBahanbakuresepDto.updatedAt = new Date(Date.now());
        if (CreateBahanbakuresepDto.qty !== undefined) {
            CreateBahanbakuresepDto.qty = Number(CreateBahanbakuresepDto.qty);
        }
        if (CreateBahanbakuresepDto.harga !== undefined) {
            CreateBahanbakuresepDto.harga = Number(CreateBahanbakuresepDto.harga);
        }
        try {
            let data = await this.BahanbakuresepService.create(CreateBahanbakuresepDto);
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
    async update3(res, CreateBahanbakuresepDto, request) {
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
        CreateBahanbakuresepDto.updatedAt = new Date(Date.now());
        if (CreateBahanbakuresepDto.qty !== undefined) {
            CreateBahanbakuresepDto.qty = Number(CreateBahanbakuresepDto.qty);
        }
        if (CreateBahanbakuresepDto.harga !== undefined) {
            CreateBahanbakuresepDto.harga = Number(CreateBahanbakuresepDto.harga);
        }
        try {
            let data = await this.BahanbakuresepService.update(id, CreateBahanbakuresepDto);
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
    async findWhereCompany5(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var data = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        try {
            data = await this.BahanbakuresepService.findById(id);
        }
        catch (e) {
            data = null;
        }
        response = {
            "data": data,
            "messages": messages
        };
        return response;
    }
    async delete2(id) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
            throw new common_1.BadRequestException('Param id is required');
        }
        var data = null;
        try {
            data = await this.BahanbakuresepService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.BahanbakuresepService.destroy(id);
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
    async Bahanbaku_resep(idResep, tBahanbakuresep) {
        if (tBahanbakuresep.length > 0) {
            for (let i = 0; i < tBahanbakuresep.length; i++) {
                let nameBahan = null;
                let qty = 0;
                let harga = 0;
                let idBahanbaku = null;
                try {
                    nameBahan = tBahanbakuresep[i].nameBahan;
                }
                catch (e) {
                    nameBahan = null;
                }
                try {
                    qty = tBahanbakuresep[i].qty;
                }
                catch (e) {
                    qty = 0;
                }
                try {
                    harga = tBahanbakuresep[i].harga;
                }
                catch (e) {
                    harga = 0;
                }
                try {
                    idBahanbaku = tBahanbakuresep[i].idBahanbaku;
                }
                catch (e) {
                    idBahanbaku = null;
                }
                let Tbl_product_Resep_ = new create_bahanbakuresep_dto_1.CreateBahanbakuresepDto();
                Tbl_product_Resep_.nameBahan = nameBahan;
                Tbl_product_Resep_.id_bahan_baku = idBahanbaku;
                Tbl_product_Resep_.id_resep = idResep;
                Tbl_product_Resep_.id = (0, uuid_1.v4)();
                Tbl_product_Resep_.createdAt = new Date(Date.now());
                Tbl_product_Resep_.updatedAt = new Date(Date.now());
                Tbl_product_Resep_.qty = Number(qty);
                Tbl_product_Resep_.harga = Number(harga);
                try {
                    await this.BahanbakuresepService.create(Tbl_product_Resep_);
                }
                catch (e) {
                }
            }
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_resep_dto_1.CreateResepDto, Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_resep_dto_1.CreateResepDto, Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "findWhereCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "findWhereCompany3", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bahanbakuresep/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bahanbakuresep_dto_1.CreateBahanbakuresepDto, Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "create2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bahanbakuresep/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bahanbakuresep_dto_1.CreateBahanbakuresepDto, Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "update3", null);
__decorate([
    (0, common_1.Post)('bahanbakuresep/detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "findWhereCompany5", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bahanbakuresep/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResepController.prototype, "delete2", null);
ResepController = __decorate([
    (0, common_1.Controller)('api/resep'),
    __metadata("design:paramtypes", [resep_service_1.ResepService,
        bahanbakuresep_service_1.BahanbakuresepService,
        config_1.ConfigService])
], ResepController);
exports.ResepController = ResepController;
//# sourceMappingURL=resep.controller.js.map