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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_service_1 = require("./product.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const engine_service_1 = require("../engine/engine.service");
const config_1 = require("@nestjs/config");
const productbarcode_service_1 = require("./productbarcode.service");
const create_productbarcode_dto_1 = require("./dto/create-productbarcode.dto");
const bahanbakuproduct_service_1 = require("./bahanbakuproduct.service");
const create_bahanbakuproduct_dto_1 = require("./dto/create-bahanbakuproduct.dto");
const resepproduct_service_1 = require("./resepproduct.service");
const create_resepproduct_dto_1 = require("./dto/create-resepproduct.dto");
const fs = require("fs");
const uuid_1 = require("uuid");
let ProductController = class ProductController {
    constructor(ProductService, ProductbarcodeService, BahanbakuproductService, ResepproductService, EngineService, configService) {
        this.ProductService = ProductService;
        this.ProductbarcodeService = ProductbarcodeService;
        this.BahanbakuproductService = BahanbakuproductService;
        this.ResepproductService = ResepproductService;
        this.EngineService = EngineService;
        this.configService = configService;
    }
    findAll() {
        return this.ProductService.findAll();
    }
    async create(file, CreateProductDto_, request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        var barcode = null;
        var formatbarcode = null;
        var tBarcode = [];
        var bahanbaku = null;
        var formatbahanbaku = null;
        var tBahanbaku = [];
        var resep = null;
        var formatresep = null;
        var tResep = [];
        barcode = request_json["barcode"];
        bahanbaku = request_json["bahanbaku"];
        resep = request_json["resep"];
        var id = (0, uuid_1.v4)();
        CreateProductDto_.id = id;
        var pathlogoSlider = "product/" + id;
        var extension = "jpg";
        if (barcode !== undefined) {
            formatbarcode = JSON.parse(JSON.stringify(barcode));
            tBarcode = JSON.parse(formatbarcode);
        }
        if (bahanbaku !== undefined) {
            formatbahanbaku = JSON.parse(JSON.stringify(bahanbaku));
            tBahanbaku = JSON.parse(formatbahanbaku);
        }
        if (resep !== undefined) {
            formatresep = JSON.parse(JSON.stringify(resep));
            tResep = JSON.parse(formatresep);
        }
        if (file != undefined) {
            await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
            CreateProductDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
        }
        if (CreateProductDto_.modal !== undefined) {
            CreateProductDto_.modal = Number(CreateProductDto_.modal);
        }
        if (CreateProductDto_.price !== undefined) {
            CreateProductDto_.price = Number(CreateProductDto_.price);
        }
        if (CreateProductDto_.is_stock_off !== undefined) {
            CreateProductDto_.is_stock_off = Number(CreateProductDto_.is_stock_off);
        }
        CreateProductDto_.createdAt = new Date(Date.now());
        CreateProductDto_.updatedAt = new Date(Date.now());
        try {
            this.barcode(id, tBarcode);
        }
        catch (e) {
        }
        try {
            this.bahanbaku(id, tBahanbaku);
        }
        catch (e) {
        }
        try {
            this.resep(id, tResep);
        }
        catch (e) {
        }
        try {
            let data = await this.ProductService.create(CreateProductDto_);
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
    async update(file, CreateProductDto_, request) {
        var request_json = JSON.parse(JSON.stringify(request.body));
        var id = null;
        if (request_json["id"] !== undefined) {
            id = request_json["id"];
        }
        else {
            throw new common_1.BadRequestException('Param id is required');
        }
        var pathlogoSlider = "product/" + id;
        var extension = "jpg";
        if (file != undefined) {
            await this.EngineService.uploadFile(file, extension, pathlogoSlider, id);
            CreateProductDto_.image = this.configService.get("BASE_URL") + pathlogoSlider;
        }
        if (CreateProductDto_.modal !== undefined) {
            CreateProductDto_.modal = Number(CreateProductDto_.modal);
        }
        if (CreateProductDto_.price !== undefined) {
            CreateProductDto_.price = Number(CreateProductDto_.price);
        }
        if (CreateProductDto_.is_stock_off !== undefined) {
            CreateProductDto_.is_stock_off = Number(CreateProductDto_.is_stock_off);
        }
        CreateProductDto_.updatedAt = new Date(Date.now());
        ;
        try {
            let data = await this.ProductService.create(CreateProductDto_);
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
    async create2(res, CreateProductbarcodeDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateProductbarcodeDto.id = id;
        CreateProductbarcodeDto.createdAt = new Date(Date.now());
        CreateProductbarcodeDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.ProductbarcodeService.create(CreateProductbarcodeDto);
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
    async update3(res, CreateProductbarcodeDto, request) {
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
        CreateProductbarcodeDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.ProductbarcodeService.update(id, CreateProductbarcodeDto);
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
            data = await this.ProductbarcodeService.findById(id);
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
            data = await this.ProductbarcodeService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.ProductbarcodeService.destroy(id);
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
    async create3(res, CreateBahanbakuproductDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateBahanbakuproductDto.id = id;
        CreateBahanbakuproductDto.createdAt = new Date(Date.now());
        CreateBahanbakuproductDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.BahanbakuproductService.create(CreateBahanbakuproductDto);
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
    async update4(res, CreateBahanbakuproductDto, request) {
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
        CreateBahanbakuproductDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.BahanbakuproductService.update(id, CreateBahanbakuproductDto);
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
    async findWhereCompany55(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var data = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        try {
            data = await this.BahanbakuproductService.findById(id);
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
    async delete2f(id) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
            throw new common_1.BadRequestException('Param id is required');
        }
        var data = null;
        try {
            data = await this.BahanbakuproductService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.BahanbakuproductService.destroy(id);
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
    async create3t(res, CreateResepproductDto, req) {
        const messages = {
            "info": ["The create successful"],
        };
        const messagesEror = {
            "info": ["Todo is not found!"],
        };
        var id = (0, uuid_1.v4)();
        CreateResepproductDto.id = id;
        CreateResepproductDto.createdAt = new Date(Date.now());
        CreateResepproductDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.ResepproductService.create(CreateResepproductDto);
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
    async update45(res, CreateResepproductDto, request) {
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
        CreateResepproductDto.updatedAt = new Date(Date.now());
        try {
            let data = await this.ResepproductService.update(id, CreateResepproductDto);
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
    async findWhereCompany554(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var data = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        try {
            data = await this.ResepproductService.findById(id);
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
    async delete2ft(id) {
        const messages = {
            "info": ["The delete successful"],
        };
        if (id == undefined || id == "") {
            throw new common_1.BadRequestException('Param id is required');
        }
        var data = null;
        try {
            data = await this.ResepproductService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.ResepproductService.destroy(id);
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
        data = await this.ProductService.findfilter(startdate, enddate, name, page, limit, id, descending);
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
        var pathlogoGallery = "product/" + id;
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
            data = await this.ProductService.findById(id);
        }
        catch (e) {
            data = null;
        }
        if (data && data !== null) {
            try {
                await this.ProductService.destroy(id);
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
    async findWhereCompany3(request) {
        const messages = {
            "info": ["Data successful"],
        };
        var request_json = JSON.parse(JSON.stringify(request.body));
        var data = null;
        var id = null;
        var response = {};
        id = request_json["id"];
        data = await this.ProductService.findById(id);
        if (data !== null) {
            let barcode = [];
            try {
                barcode = await this.ProductbarcodeService.findbyproduct(id);
            }
            catch (e) {
                barcode = [];
            }
            let bahanbaku = [];
            try {
                bahanbaku = await this.BahanbakuproductService.findbyproduct(id);
            }
            catch (e) {
                bahanbaku = [];
            }
            let resep = [];
            try {
                resep = await this.ResepproductService.findbyproduct(id);
            }
            catch (e) {
                resep = [];
            }
            data.barcode = barcode;
            data.bahanbaku = bahanbaku;
            data.resep = resep;
        }
        response = {
            "data": data,
            "messages": messages
        };
        return response;
    }
    async barcode(idProduct, tBarcode) {
        if (tBarcode.length > 0) {
            for (let i = 0; i < tBarcode.length; i++) {
                let barcode = null;
                try {
                    barcode = tBarcode[i];
                }
                catch (e) {
                    barcode = null;
                }
                let Tbl_product_barcode_ = new create_productbarcode_dto_1.CreateProductbarcodeDto();
                Tbl_product_barcode_.barcode = barcode;
                Tbl_product_barcode_.product_id = idProduct;
                Tbl_product_barcode_.id = (0, uuid_1.v4)();
                Tbl_product_barcode_.createdAt = new Date(Date.now());
                Tbl_product_barcode_.updatedAt = new Date(Date.now());
                try {
                    await this.ProductbarcodeService.create(Tbl_product_barcode_);
                }
                catch (e) {
                }
            }
        }
    }
    async bahanbaku(idProduct, tBahanbaku) {
        if (tBahanbaku.length > 0) {
            for (let i = 0; i < tBahanbaku.length; i++) {
                let nameBahan = null;
                let jmlButuh = null;
                let harga = 0;
                try {
                    nameBahan = tBahanbaku[i].nameBahan;
                }
                catch (e) {
                    nameBahan = null;
                }
                try {
                    jmlButuh = tBahanbaku[i].jmlButuh;
                }
                catch (e) {
                    jmlButuh = null;
                }
                try {
                    harga = tBahanbaku[i].harga;
                }
                catch (e) {
                    harga = 0;
                }
                let Tbl_product_bahanbaku_ = new create_bahanbakuproduct_dto_1.CreateBahanbakuproductDto();
                Tbl_product_bahanbaku_.nameBahan = nameBahan;
                Tbl_product_bahanbaku_.product_id = idProduct;
                Tbl_product_bahanbaku_.id = (0, uuid_1.v4)();
                Tbl_product_bahanbaku_.createdAt = new Date(Date.now());
                Tbl_product_bahanbaku_.updatedAt = new Date(Date.now());
                Tbl_product_bahanbaku_.harga = Number(harga);
                Tbl_product_bahanbaku_.jmlButuh = jmlButuh;
                try {
                    await this.BahanbakuproductService.create(Tbl_product_bahanbaku_);
                }
                catch (e) {
                }
            }
        }
    }
    async resep(idProduct, tResep) {
        if (tResep.length > 0) {
            for (let i = 0; i < tResep.length; i++) {
                let nameResep = null;
                try {
                    nameResep = tResep[i].nameResep;
                }
                catch (e) {
                    nameResep = null;
                }
                let Tbl_product_resep_ = new create_resepproduct_dto_1.CreateResepproductDto();
                Tbl_product_resep_.nameResep = nameResep;
                Tbl_product_resep_.product_id = idProduct;
                Tbl_product_resep_.id = (0, uuid_1.v4)();
                Tbl_product_resep_.createdAt = new Date(Date.now());
                Tbl_product_resep_.updatedAt = new Date(Date.now());
                try {
                    await this.ResepproductService.create(Tbl_product_resep_);
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
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('barcode/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_productbarcode_dto_1.CreateProductbarcodeDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('barcode/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_productbarcode_dto_1.CreateProductbarcodeDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update3", null);
__decorate([
    (0, common_1.Post)('barcode/detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findWhereCompany5", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('barcode/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete2", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bahanbaku/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bahanbakuproduct_dto_1.CreateBahanbakuproductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create3", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bahanbaku/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bahanbakuproduct_dto_1.CreateBahanbakuproductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update4", null);
__decorate([
    (0, common_1.Post)('bahanbaku/detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findWhereCompany55", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('bahanbaku/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete2f", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('resep/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_resepproduct_dto_1.CreateResepproductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create3t", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('resep/update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_resepproduct_dto_1.CreateResepproductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update45", null);
__decorate([
    (0, common_1.Post)('resep/detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findWhereCompany554", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('resep/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete2ft", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findWhereCompany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPict", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findWhereCompany3", null);
ProductController = __decorate([
    (0, common_1.Controller)('api/product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        productbarcode_service_1.ProductbarcodeService,
        bahanbakuproduct_service_1.BahanbakuproductService,
        resepproduct_service_1.ResepproductService,
        engine_service_1.EngineService,
        config_1.ConfigService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map