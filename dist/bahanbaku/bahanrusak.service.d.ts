import { Tbl_bahan_rusak } from 'src/bahanbaku/bahanrusak.entity';
import { Repository } from 'typeorm';
import { CreateBahanrusakDto } from 'src/bahanbaku/dto/create-bahanrusak.dto';
export declare class BahanrusakService {
    private readonly BahanrusakRepository;
    constructor(BahanrusakRepository: Repository<Tbl_bahan_rusak>);
    create(createUsersDto: CreateBahanrusakDto): Promise<Tbl_bahan_rusak>;
    update(id: string, data: Partial<CreateBahanrusakDto>): Promise<Tbl_bahan_rusak>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_bahan_rusak[]>;
    findById(id: string): Promise<Tbl_bahan_rusak>;
    findfilter(startdate: Date, enddate: Date, remark: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_bahan_rusak[]>;
}
