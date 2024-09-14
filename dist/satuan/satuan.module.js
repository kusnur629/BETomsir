"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatuanModule = void 0;
const common_1 = require("@nestjs/common");
const satuan_service_1 = require("./satuan.service");
const satuan_controller_1 = require("./satuan.controller");
const typeorm_1 = require("@nestjs/typeorm");
const satuan_entity_1 = require("./satuan.entity");
const config_1 = require("@nestjs/config");
let SatuanModule = class SatuanModule {
};
SatuanModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([satuan_entity_1.Tbl_satuan]), config_1.ConfigModule],
        providers: [satuan_service_1.SatuanService],
        exports: [satuan_service_1.SatuanService],
        controllers: [satuan_controller_1.SatuanController],
    })
], SatuanModule);
exports.SatuanModule = SatuanModule;
//# sourceMappingURL=satuan.module.js.map