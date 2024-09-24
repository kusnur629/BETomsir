"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeorderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorder_service_1 = require("./typeorder.service");
const typeorder_controller_1 = require("./typeorder.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorder_entity_1 = require("./typeorder.entity");
const viewtypeorder_service_1 = require("./viewtypeorder.service");
const viewtypeorder_entity_1 = require("./viewtypeorder.entity");
let TypeorderModule = class TypeorderModule {
};
TypeorderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([typeorder_entity_1.Tbl_type_order, viewtypeorder_entity_1.Viewtypeorder])],
        providers: [typeorder_service_1.TypeorderService, viewtypeorder_service_1.ViewTypeorderService],
        exports: [typeorder_service_1.TypeorderService, viewtypeorder_service_1.ViewTypeorderService],
        controllers: [typeorder_controller_1.TypeorderController],
    })
], TypeorderModule);
exports.TypeorderModule = TypeorderModule;
//# sourceMappingURL=typeorder.module.js.map