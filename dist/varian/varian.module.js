"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarianModule = void 0;
const common_1 = require("@nestjs/common");
const varian_service_1 = require("./varian.service");
const varian_controller_1 = require("./varian.controller");
const typeorm_1 = require("@nestjs/typeorm");
const varian_entity_1 = require("./varian.entity");
const config_1 = require("@nestjs/config");
let VarianModule = class VarianModule {
};
VarianModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([varian_entity_1.Tbl_varian]), config_1.ConfigModule],
        providers: [varian_service_1.VarianService],
        exports: [varian_service_1.VarianService],
        controllers: [varian_controller_1.VarianController],
    })
], VarianModule);
exports.VarianModule = VarianModule;
//# sourceMappingURL=varian.module.js.map