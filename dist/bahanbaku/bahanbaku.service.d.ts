import { Tbl_bahanbaku } from 'src/bahanbaku/bahanbaku.entity';
import { Repository } from 'typeorm';
import { CreateBahanbakuDto } from 'src/bahanbaku/dto/create-bahanbaku.dto';
export declare class BahanbakuService {
    private readonly BahanbakuRepository;
    constructor(BahanbakuRepository: Repository<Tbl_bahanbaku>);
    create(createUsersDto: CreateBahanbakuDto): Promise<Tbl_bahanbaku>;
    update(id: string, data: Partial<CreateBahanbakuDto>): Promise<Tbl_bahanbaku>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_bahanbaku[]>;
    findById(id: string): Promise<Tbl_bahanbaku>;
    findByname(name: string): Promise<Tbl_bahanbaku>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_bahanbaku[]>;
}
