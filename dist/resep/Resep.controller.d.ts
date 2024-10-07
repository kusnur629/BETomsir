import { CreateResepDto } from './dto/create-resep.dto';
import { ResepService } from 'src/resep/resep.service';
import { Tbl_resep } from 'src/resep/resep.entity';
import { ConfigService } from '@nestjs/config';
import { BahanbakuresepService } from 'src/resep/bahanbakuresep.service';
import { CreateBahanbakuresepDto } from 'src/resep/dto/create-bahanbakuresep.dto';
export declare class ResepController {
    private readonly ResepService;
    private readonly BahanbakuresepService;
    private readonly configService;
    constructor(ResepService: ResepService, BahanbakuresepService: BahanbakuresepService, configService: ConfigService);
    findAll(): Promise<Tbl_resep[]>;
    create(res: any, CreateResepDto: CreateResepDto, request: any): Promise<void>;
    update(res: any, CreateResepDto: CreateResepDto, request: any): Promise<void>;
    findWhereCompany(request: Request): Promise<{}>;
    findWhereCompany3(request: Request): Promise<{}>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    create2(res: any, CreateBahanbakuresepDto: CreateBahanbakuresepDto, req: any): Promise<void>;
    update3(res: any, CreateBahanbakuresepDto: CreateBahanbakuresepDto, request: any): Promise<void>;
    findWhereCompany5(request: Request): Promise<{}>;
    delete2(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    Bahanbaku_resep(idResep: string, tBahanbakuresep: any[]): Promise<void>;
}
