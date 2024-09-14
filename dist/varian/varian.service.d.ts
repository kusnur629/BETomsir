import { Tbl_varian } from 'src/varian/varian.entity';
import { Repository } from 'typeorm';
import { CreateVarianDto } from 'src/varian/dto/create-varian.dto';
export declare class VarianService {
    private readonly VarianRepository;
    constructor(VarianRepository: Repository<Tbl_varian>);
    create(createUsersDto: CreateVarianDto): Promise<Tbl_varian>;
    update(id: string, data: Partial<CreateVarianDto>): Promise<Tbl_varian>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_varian[]>;
    findById(id: string): Promise<Tbl_varian>;
    findByname(name: string): Promise<Tbl_varian>;
    findfilter(startdate: Date, enddate: Date, name: string, remark: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_varian[]>;
}
