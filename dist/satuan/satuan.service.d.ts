import { Tbl_satuan } from 'src/satuan/satuan.entity';
import { Repository } from 'typeorm';
import { CreateSatuanDto } from 'src/satuan/dto/create-satuan.dto';
export declare class SatuanService {
    private readonly SatuanRepository;
    constructor(SatuanRepository: Repository<Tbl_satuan>);
    create(createUsersDto: CreateSatuanDto): Promise<Tbl_satuan>;
    update(id: string, data: Partial<CreateSatuanDto>): Promise<Tbl_satuan>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_satuan[]>;
    findById(id: string): Promise<Tbl_satuan>;
    findByname(name: string): Promise<Tbl_satuan>;
    findfilter(startdate: Date, enddate: Date, name: string, remark: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_satuan[]>;
}
