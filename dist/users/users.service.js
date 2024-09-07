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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    create(createUsersDto) {
        const newUser = this.usersRepository.create(createUsersDto);
        return this.usersRepository.save(newUser);
    }
    async update(id, data) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOneBy({ id });
    }
    async destroy(id) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
    }
    findAll() {
        return this.usersRepository.find();
    }
    findById(id) {
        return this.usersRepository.findOneBy({ id: id });
    }
    findByUsername(userName) {
        return this.usersRepository.findOneBy({ fullname: userName });
    }
    findByEmail(email) {
        return this.usersRepository.findOneBy({ email: email });
    }
    findfilter(startdate, enddate, merchant_id, fullname, email, role, skip, take, id) {
        var object = {};
        var x = 0;
        var y = 10;
        if (id !== undefined) {
            object = Object.assign({ id: id }, object);
        }
        if (fullname !== undefined) {
            object = Object.assign({ fullname: fullname }, object);
        }
        if (merchant_id !== undefined) {
            object = Object.assign({ merchant_id: merchant_id }, object);
        }
        if (email !== undefined) {
            object = Object.assign({ email: email }, object);
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
        const query = this.usersRepository.find({
            where: object,
            skip: x,
            take: y
        });
        return query;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Tbl_user)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map