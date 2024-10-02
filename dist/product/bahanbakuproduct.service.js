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
exports.BahanbakuproductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bahanbakuproduct_entity_1 = require("./bahanbakuproduct.entity");
const typeorm_2 = require("typeorm");
let BahanbakuproductService = class BahanbakuproductService {
    constructor(BahanbakuproductRepository) {
        this.BahanbakuproductRepository = BahanbakuproductRepository;
    }
    create(createUsersDto) {
        const newUser = this.BahanbakuproductRepository.create(createUsersDto);
        return this.BahanbakuproductRepository.save(newUser);
    }
    async update(id, data) {
        await this.BahanbakuproductRepository.update({ id }, data);
        return await this.BahanbakuproductRepository.findOneBy({ id });
    }
    async destroy(id) {
        await this.BahanbakuproductRepository.delete({ id });
        return { deleted: true };
    }
    findAll() {
        return this.BahanbakuproductRepository.find();
    }
    findById(id) {
        return this.BahanbakuproductRepository.findOneBy({ id: id });
    }
    findByname(nameBahan) {
        return this.BahanbakuproductRepository.findOneBy({ nameBahan: nameBahan });
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
            object = Object.assign({ nameBahan: (0, typeorm_2.Like)('%' + name + '%') }, object);
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
        const query = this.BahanbakuproductRepository.find({
            where: object,
            order: { createdAt: order },
            skip: x,
            take: y
        });
        return query;
    }
};
BahanbakuproductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bahanbakuproduct_entity_1.Tbl_product_bahanbaku)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BahanbakuproductService);
exports.BahanbakuproductService = BahanbakuproductService;
//# sourceMappingURL=bahanbakuproduct.service.js.map