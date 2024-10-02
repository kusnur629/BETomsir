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
exports.VarianproductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const varianproduct_entity_1 = require("./varianproduct.entity");
const typeorm_2 = require("typeorm");
let VarianproductService = class VarianproductService {
    constructor(VarianproductRepository) {
        this.VarianproductRepository = VarianproductRepository;
    }
    create(createUsersDto) {
        const newUser = this.VarianproductRepository.create(createUsersDto);
        return this.VarianproductRepository.save(newUser);
    }
    async update(id, data) {
        await this.VarianproductRepository.update({ id }, data);
        return await this.VarianproductRepository.findOneBy({ id });
    }
    async destroy(id) {
        await this.VarianproductRepository.delete({ id });
        return { deleted: true };
    }
    findAll() {
        return this.VarianproductRepository.find();
    }
    findById(id) {
        return this.VarianproductRepository.findOneBy({ id: id });
    }
    findByname(name) {
        return this.VarianproductRepository.findOneBy({ name: name });
    }
    findfilter(startdate, enddate, name, skip, take, id, descending) {
        var object = {};
        var x = 0;
        var y = 10;
        var order = null;
        if (descending === true) {
            order = "DESC";
        }
        else {
            order = "ASC";
        }
        if (id !== undefined) {
            object = Object.assign({ id: id }, object);
        }
        if (name !== undefined) {
            object = Object.assign({ name: (0, typeorm_2.Like)('%' + name + '%') }, object);
        }
        if (startdate !== undefined && enddate !== undefined) {
            object = Object.assign({ createdAt: (0, typeorm_2.Between)(startdate, enddate), }, object);
        }
        if (skip > 0) {
            x = (skip * take);
        }
        if (take > 0) {
            y = take;
        }
        const query = this.VarianproductRepository.find({
            where: object,
            order: { createdAt: order },
            skip: x,
            take: y
        });
        return query;
    }
};
VarianproductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(varianproduct_entity_1.Tbl_product_varian)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VarianproductService);
exports.VarianproductService = VarianproductService;
//# sourceMappingURL=varianproduct.service.js.map