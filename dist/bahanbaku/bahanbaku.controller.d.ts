import { CreateBahanbakuDto } from './dto/create-bahanbaku.dto';
import { BahanbakuService } from 'src/bahanbaku/bahanbaku.service';
import { Tbl_bahanbaku } from 'src/bahanbaku/bahanbaku.entity';
import { ConfigService } from '@nestjs/config';
import { BahanrusakService } from 'src/bahanbaku/bahanrusak.service';
import { CreateBahanrusakDto } from 'src/bahanbaku/dto/create-bahanrusak.dto';
export declare class BahanbakuController {
    private readonly BahanbakuService;
    private readonly BahanrusakService;
    private readonly configService;
    constructor(BahanbakuService: BahanbakuService, BahanrusakService: BahanrusakService, configService: ConfigService);
    findAll(): Promise<Tbl_bahanbaku[]>;
    create(res: any, CreateBahanbakuDto: CreateBahanbakuDto, request: any): Promise<void>;
    update(res: any, CreateBahanbakuDto: CreateBahanbakuDto, request: any): Promise<void>;
    findWhereCompany(request: Request): Promise<{}>;
    findWhereCompany3(request: Request): Promise<{}>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    create2(res: any, CreateBahanrusakDto: CreateBahanrusakDto, req: any): Promise<void>;
    update3(res: any, CreateBahanrusakDto: CreateBahanrusakDto, request: any): Promise<void>;
    findWhereCompany5(request: Request): Promise<{}>;
    delete2(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    bahanrusak(idBahanbaku: string, tBahanrusak: any[]): Promise<void>;
}
