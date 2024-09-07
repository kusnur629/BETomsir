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
exports.ViewuserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const viewuser_entity_1 = require("./viewuser.entity");
const typeorm_2 = require("typeorm");
let ViewuserService = class ViewuserService {
    constructor(viewuserRepository) {
        this.viewuserRepository = viewuserRepository;
    }
    findAll() {
        return this.viewuserRepository.find();
    }
    findById(id) {
        return this.viewuserRepository.findOneBy({ id: id });
    }
    findByUsername(userName) {
        return this.viewuserRepository.findOneBy({ fullname: userName });
    }
    findByEmail(email) {
        return this.viewuserRepository.findOneBy({ email: email });
    }
    findfilter(startdate, enddate, merchant_id, fullname, email, role, skip, take, id, name, descending) {
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
        if (fullname !== undefined) {
            object = Object.assign({ fullname: (0, typeorm_2.Like)('%' + fullname + '%') }, object);
        }
        if (name !== undefined) {
            object = Object.assign({ name: (0, typeorm_2.Like)('%' + name + '%') }, object);
        }
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
        }
        if (email !== undefined) {
            object = Object.assign({ email: (0, typeorm_2.Like)('%' + email + '%') }, object);
        }
        if (role !== undefined) {
            object = Object.assign({ role: role }, object);
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
        const query = this.viewuserRepository.find({
            where: object,
            order: { createdAt: order },
            skip: x,
            take: y
        });
        return query;
    }
};
ViewuserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(viewuser_entity_1.Viewuser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ViewuserService);
exports.ViewuserService = ViewuserService;
//# sourceMappingURL=viewuser.service.js.map