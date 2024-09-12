"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const engine_module_1 = require("./engine/engine.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const merchant_module_1 = require("./merchant/merchant.module");
const merchant_entity_1 = require("./merchant/merchant.entity");
const users_entity_1 = require("./users/users.entity");
const viewuser_entity_1 = require("./users/viewuser.entity");
const viewcategory_entity_1 = require("./category/viewcategory.entity");
const category_module_1 = require("./category/category.module");
const category_entity_1 = require("./category/category.entity");
const customer_entity_1 = require("./customer/customer.entity");
const viewcustomer_entity_1 = require("./customer/viewcustomer.entity");
const customer_module_1 = require("./customer/customer.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), engine_module_1.EngineModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [users_entity_1.Tbl_user, viewuser_entity_1.Viewuser, merchant_entity_1.Tbl_merchant, viewcategory_entity_1.Viewcategory, category_entity_1.Tbl_category, customer_entity_1.Tbl_customer, viewcustomer_entity_1.Viewcustomer],
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            merchant_module_1.MerchantModule,
            category_module_1.CategoryModule,
            customer_module_1.CustomerModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map