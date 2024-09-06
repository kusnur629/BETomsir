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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        const passuser = user.password;
        const isMatch = await bcrypt.compare(pass, passuser);
        if (user && isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        const user_auths = await this.usersService.findByEmail(user.email);
        console.log(this.jwtService.sign(payload));
        return {
            idUser: user_auths.id,
            email: user_auths.email,
            role: user_auths.role,
            merchant_id: user_auths.merchant_id,
            createdAt: user_auths.createdAt,
            updatedAt: user_auths.updatedAt,
            access_token: this.jwtService.sign(payload),
        };
    }
    async ceckUserByUsername(email) {
        var status = false;
        var user_auth = await this.usersService.findByEmail(email);
        if (await this.ceckData(user_auth)) {
            status = true;
        }
        return status;
    }
    async ceckData(data) {
        var ceckdata = false;
        if (data != null) {
            if (data != undefined) {
                if (data.constructor.name === 'Array') {
                    if (data.length > 0) {
                        ceckdata = true;
                    }
                }
                else if (data.constructor.name === 'Object') {
                    if (Object.keys(data).length > 0) {
                        ceckdata = true;
                    }
                }
                else {
                    if (Object.keys(data).length > 0) {
                        ceckdata = true;
                    }
                }
            }
        }
        return ceckdata;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map