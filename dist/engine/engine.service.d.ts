import { ConfigService } from '@nestjs/config';
export declare class EngineService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    getImageMode(width: number, height: number): Promise<string>;
    createFolder(current_path: string, new_folder: string): Promise<boolean>;
}
