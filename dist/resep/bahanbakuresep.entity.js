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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tbl_bahanbaku_resep = void 0;
const typeorm_1 = require("typeorm");
let Tbl_bahanbaku_resep = class Tbl_bahanbaku_resep {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tbl_bahanbaku_resep.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tbl_bahanbaku_resep.prototype, "id_bahan_baku", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tbl_bahanbaku_resep.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tbl_bahanbaku_resep.prototype, "harga", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tbl_bahanbaku_resep.prototype, "id_resep", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tbl_bahanbaku_resep.prototype, "nameBahan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tbl_bahanbaku_resep.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tbl_bahanbaku_resep.prototype, "updatedAt", void 0);
Tbl_bahanbaku_resep = __decorate([
    (0, typeorm_1.Entity)()
], Tbl_bahanbaku_resep);
exports.Tbl_bahanbaku_resep = Tbl_bahanbaku_resep;
//# sourceMappingURL=bahanbakuresep.entity.js.map