"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BahanbakuModule = void 0;
const common_1 = require("@nestjs/common");
const bahanbaku_service_1 = require("./bahanbaku.service");
const bahanbaku_controller_1 = require("./bahanbaku.controller");
const typeorm_1 = require("@nestjs/typeorm");
const bahanbaku_entity_1 = require("./bahanbaku.entity");
const config_1 = require("@nestjs/config");
const bahanrusak_service_1 = require("./bahanrusak.service");
const bahanrusak_entity_1 = require("./bahanrusak.entity");
let BahanbakuModule = class BahanbakuModule {
};
BahanbakuModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bahanbaku_entity_1.Tbl_bahanbaku, bahanrusak_entity_1.Tbl_bahan_rusak]), config_1.ConfigModule],
        providers: [bahanbaku_service_1.BahanbakuService, bahanrusak_service_1.BahanrusakService],
        exports: [bahanbaku_service_1.BahanbakuService, bahanrusak_service_1.BahanrusakService],
        controllers: [bahanbaku_controller_1.BahanbakuController],
    })
], BahanbakuModule);
exports.BahanbakuModule = BahanbakuModule;
//# sourceMappingURL=bahanbaku.module.js.map