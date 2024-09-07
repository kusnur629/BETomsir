/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class EngineService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, format: string, path: string, filename: string): Promise<any>;
    getImageMode(width: number, height: number): Promise<string>;
    createFolder(current_path: string, new_folder: string): Promise<boolean>;
}
