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
exports.MerchantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const merchant_entity_1 = require("./merchant.entity");
const typeorm_2 = require("typeorm");
let MerchantService = class MerchantService {
    constructor(MerchantRepository) {
        this.MerchantRepository = MerchantRepository;
    }
    create(createUsersDto) {
        const newUser = this.MerchantRepository.create(createUsersDto);
        return this.MerchantRepository.save(newUser);
    }
    async update(id, data) {
        await this.MerchantRepository.update({ id }, data);
        return await this.MerchantRepository.findOneBy({ id });
    }
    async destroy(id) {
        await this.MerchantRepository.delete({ id });
        return { deleted: true };
    }
    findAll() {
        return this.MerchantRepository.find();
    }
    findById(id) {
        return this.MerchantRepository.findOneBy({ id: id });
    }
    findByname(name) {
        return this.MerchantRepository.findOneBy({ name: name });
    }
};
MerchantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(merchant_entity_1.Tbl_merchant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MerchantService);
exports.MerchantService = MerchantService;
//# sourceMappingURL=merchant.service.js.map