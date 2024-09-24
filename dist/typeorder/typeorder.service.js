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
exports.TypeorderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorder_entity_1 = require("./typeorder.entity");
const typeorm_2 = require("typeorm");
let TypeorderService = class TypeorderService {
    constructor(TypeorderRepository) {
        this.TypeorderRepository = TypeorderRepository;
    }
    create(CreateTypeorderDto) {
        const newUser = this.TypeorderRepository.create(CreateTypeorderDto);
        return this.TypeorderRepository.save(newUser);
    }
    async update(id, data) {
        await this.TypeorderRepository.update({ id }, data);
        return await this.TypeorderRepository.findOneBy({ id });
    }
    async destroy(id) {
        await this.TypeorderRepository.delete({ id });
        return { deleted: true };
    }
    findAll() {
        return this.TypeorderRepository.find();
    }
    findById(id) {
        return this.TypeorderRepository.findOneBy({ id: id });
    }
    findByname(name) {
        return this.TypeorderRepository.findOneBy({ name: name });
    }
    findfilter(startdate, enddate, name, merchant_id, phone_number, skip, take, id, descending) {
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
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
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
        const query = this.TypeorderRepository.find({
            where: object,
            order: { createdAt: order },
            skip: x,
            take: y
        });
        return query;
    }
};
TypeorderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorder_entity_1.Tbl_type_order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeorderService);
exports.TypeorderService = TypeorderService;
//# sourceMappingURL=typeorder.service.js.map