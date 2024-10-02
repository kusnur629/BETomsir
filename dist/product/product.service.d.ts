import { Tbl_product } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
export declare class ProductService {
    private readonly ProductRepository;
    constructor(ProductRepository: Repository<Tbl_product>);
    create(createUsersDto: CreateProductDto): Promise<Tbl_product>;
    update(id: string, data: Partial<CreateProductDto>): Promise<Tbl_product>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_product[]>;
    findById(id: string): Promise<Tbl_product>;
    findByname(name: string): Promise<Tbl_product>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_product[]>;
}
