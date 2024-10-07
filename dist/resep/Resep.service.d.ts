import { Tbl_resep } from 'src/resep/resep.entity';
import { Repository } from 'typeorm';
import { CreateResepDto } from 'src/resep/dto/create-resep.dto';
export declare class ResepService {
    private readonly ResepRepository;
    constructor(ResepRepository: Repository<Tbl_resep>);
    create(createUsersDto: CreateResepDto): Promise<Tbl_resep>;
    update(id: string, data: Partial<CreateResepDto>): Promise<Tbl_resep>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_resep[]>;
    findById(id: string): Promise<Tbl_resep>;
    findByname(name: string): Promise<Tbl_resep>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_resep[]>;
}
