import { Tbl_product_resep } from 'src/product/resepproduct.entity';
import { Repository } from 'typeorm';
import { CreateResepproductDto } from 'src/product/dto/create-resepproduct.dto';
export declare class ResepproductService {
    private readonly ResepproductRepository;
    constructor(ResepproductRepository: Repository<Tbl_product_resep>);
    create(createUsersDto: CreateResepproductDto): Promise<Tbl_product_resep>;
    update(id: string, data: Partial<CreateResepproductDto>): Promise<Tbl_product_resep>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_product_resep[]>;
    findById(id: string): Promise<Tbl_product_resep>;
    findByname(nameResep: string): Promise<Tbl_product_resep>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_product_resep[]>;
}
