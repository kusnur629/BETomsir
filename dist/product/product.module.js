"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const engine_module_1 = require("../engine/engine.module");
const config_1 = require("@nestjs/config");
const varianproduct_service_1 = require("./varianproduct.service");
const varianproduct_entity_1 = require("./varianproduct.entity");
const productbarcode_service_1 = require("./productbarcode.service");
const productbarcode_entity_1 = require("./productbarcode.entity");
const varianbarcode_service_1 = require("./varianbarcode.service");
const varianbarcode_entity_1 = require("./varianbarcode.entity");
const resepproduct_service_1 = require("./resepproduct.service");
const resepproduct_entity_1 = require("./resepproduct.entity");
const bahanbakuproduct_service_1 = require("./bahanbakuproduct.service");
const bahanbakuproduct_entity_1 = require("./bahanbakuproduct.entity");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Tbl_product, varianproduct_entity_1.Tbl_product_varian, productbarcode_entity_1.Tbl_product_barcode, varianbarcode_entity_1.Tbl_product_varian_barcode, resepproduct_entity_1.Tbl_product_resep, bahanbakuproduct_entity_1.Tbl_product_bahanbaku]), engine_module_1.EngineModule, config_1.ConfigModule],
        providers: [product_service_1.ProductService, varianproduct_service_1.VarianproductService, productbarcode_service_1.ProductbarcodeService, varianbarcode_service_1.VarianbarcodeService, resepproduct_service_1.ResepproductService, bahanbakuproduct_service_1.BahanbakuproductService],
        exports: [product_service_1.ProductService, varianproduct_service_1.VarianproductService, productbarcode_service_1.ProductbarcodeService, varianbarcode_service_1.VarianbarcodeService, resepproduct_service_1.ResepproductService, bahanbakuproduct_service_1.BahanbakuproductService],
        controllers: [product_controller_1.ProductController],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map