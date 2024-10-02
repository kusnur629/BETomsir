import { Tbl_product_varian } from 'src/product/varianproduct.entity';
import { Repository } from 'typeorm';
import { CreateVarianproductDto } from 'src/product/dto/create-varianproduct.dto';
export declare class VarianproductService {
    private readonly VarianproductRepository;
    constructor(VarianproductRepository: Repository<Tbl_product_varian>);
    create(createUsersDto: CreateVarianproductDto): Promise<Tbl_product_varian>;
    update(id: string, data: Partial<CreateVarianproductDto>): Promise<Tbl_product_varian>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_product_varian[]>;
    findById(id: string): Promise<Tbl_product_varian>;
    findByname(name: string): Promise<Tbl_product_varian>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_product_varian[]>;
}
