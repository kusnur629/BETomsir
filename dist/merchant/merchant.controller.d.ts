/// <reference types="multer" />
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { MerchantService } from 'src/merchant/merchant.service';
import { Tbl_merchant } from 'src/merchant/merchant.entity';
import { EngineService } from 'src/engine/engine.service';
import { ConfigService } from '@nestjs/config';
export declare class MerchantController {
    private readonly MerchantService;
    private readonly EngineService;
    private readonly configService;
    constructor(MerchantService: MerchantService, EngineService: EngineService, configService: ConfigService);
    findAll(): Promise<Tbl_merchant[]>;
    create(file: Express.Multer.File, CreateMerchantDto_: CreateMerchantDto, request: any): Promise<{
        response_code: number;
        data: Tbl_merchant;
        messages: {
            info: string[];
        };
    }>;
    getPict(id: string, response: any): Promise<void>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
}
