"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const engine_controller_1 = require("./engine.controller");
const engine_service_1 = require("./engine.service");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
let EngineModule = class EngineModule {
};
EngineModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature(),
        ],
        controllers: [engine_controller_1.EngineController],
        providers: [engine_service_1.EngineService],
        exports: [engine_service_1.EngineService],
    })
], EngineModule);
exports.EngineModule = EngineModule;
//# sourceMappingURL=engine.module.js.map