import { CreateSatuanDto } from './dto/create-satuan.dto';
import { SatuanService } from 'src/satuan/satuan.service';
import { Tbl_satuan } from 'src/satuan/Satuan.entity';
import { ConfigService } from '@nestjs/config';
export declare class SatuanController {
    private readonly SatuanService;
    private readonly configService;
    constructor(SatuanService: SatuanService, configService: ConfigService);
    findAll(): Promise<Tbl_satuan[]>;
    create(res: any, CreateSatuanDto: CreateSatuanDto, req: any): Promise<void>;
    update(res: any, CreateSatuanDto: CreateSatuanDto, request: any): Promise<void>;
    findWhereCompany(request: Request): Promise<{}>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
}
