import { CreateBahanbakuDto } from './dto/create-bahanbaku.dto';
import { BahanbakuService } from 'src/bahanbaku/bahanbaku.service';
import { Tbl_bahanbaku } from 'src/bahanbaku/bahanbaku.entity';
import { ConfigService } from '@nestjs/config';
export declare class BahanbakuController {
    private readonly BahanbakuService;
    private readonly configService;
    constructor(BahanbakuService: BahanbakuService, configService: ConfigService);
    findAll(): Promise<Tbl_bahanbaku[]>;
    create(res: any, CreateBahanbakuDto: CreateBahanbakuDto, req: any): Promise<void>;
    update(res: any, CreateBahanbakuDto: CreateBahanbakuDto, request: any): Promise<void>;
    findWhereCompany(request: Request): Promise<{}>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
}
