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
var EngineService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const webp = require('webp-converter');
var path = require("path");
let EngineService = EngineService_1 = class EngineService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EngineService_1.name);
    }
    async uploadFile(file, format, path, filename) {
        var image_information = await file.buffer;
        const buffers_file = await webp.buffer2webpbuffer(file.buffer, format, "-q 70", this.configService.get("PATH_UPLOAD"));
        var file_commpress = buffers_file;
        if (await this.createFolder('./temp/', path)) {
            fs.writeFile("./temp/" + path + "/" + filename + "." + format, file_commpress, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
        return file_commpress;
    }
    async getImageMode(width, height) {
        var mode = "LANDSCAPE";
        if (width > height) {
            mode = "LANDSCAPE";
        }
        else if (height > width) {
            mode = "POTRET";
        }
        else {
            mode = "LANDSCAPE";
        }
        return mode;
    }
    async createFolder(current_path, new_folder) {
        var isTrue = false;
        if (await fs.existsSync(path.resolve(current_path + new_folder))) {
            isTrue = true;
        }
        else {
            try {
                await fs.mkdirSync(path.resolve(current_path + new_folder), { recursive: true });
                isTrue = true;
            }
            catch (err) {
                isTrue = false;
            }
        }
        return isTrue;
    }
};
EngineService = EngineService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EngineService);
exports.EngineService = EngineService;
//# sourceMappingURL=engine.service.js.map