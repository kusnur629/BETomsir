import { Tbl_bahanbaku_resep } from 'src/resep/bahanbakuresep.entity';
import { Repository } from 'typeorm';
import { CreateBahanbakuresepDto } from 'src/resep/dto/create-bahanbakuresep.dto';
export declare class BahanbakuresepService {
    private readonly BahanbakuresepRepository;
    constructor(BahanbakuresepRepository: Repository<Tbl_bahanbaku_resep>);
    create(createUsersDto: CreateBahanbakuresepDto): Promise<Tbl_bahanbaku_resep>;
    update(id: string, data: Partial<CreateBahanbakuresepDto>): Promise<Tbl_bahanbaku_resep>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_bahanbaku_resep[]>;
    findById(id: string): Promise<Tbl_bahanbaku_resep>;
    findByIdResep(idResep: string): Promise<Tbl_bahanbaku_resep[]>;
    findfilter(startdate: Date, enddate: Date, nameBahan: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_bahanbaku_resep[]>;
}
