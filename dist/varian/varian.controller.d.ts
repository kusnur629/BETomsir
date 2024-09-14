import { CreateVarianDto } from './dto/create-varian.dto';
import { VarianService } from 'src/varian/varian.service';
import { Tbl_varian } from 'src/varian/varian.entity';
import { ConfigService } from '@nestjs/config';
export declare class VarianController {
    private readonly VarianService;
    private readonly configService;
    constructor(VarianService: VarianService, configService: ConfigService);
    findAll(): Promise<Tbl_varian[]>;
    create(res: any, CreateVarianDto: CreateVarianDto, req: any): Promise<void>;
    update(res: any, CreateVarianDto: CreateVarianDto, request: any): Promise<void>;
    findWhereCompany(request: Request): Promise<{}>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
}
