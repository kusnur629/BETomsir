import { Tbl_product_bahanbaku } from 'src/product/bahanbakuproduct.entity';
import { Repository } from 'typeorm';
import { CreateBahanbakuproductDto } from 'src/product/dto/create-bahanbakuproduct.dto';
export declare class BahanbakuproductService {
    private readonly BahanbakuproductRepository;
    constructor(BahanbakuproductRepository: Repository<Tbl_product_bahanbaku>);
    create(createUsersDto: CreateBahanbakuproductDto): Promise<Tbl_product_bahanbaku>;
    update(id: string, data: Partial<CreateBahanbakuproductDto>): Promise<Tbl_product_bahanbaku>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_product_bahanbaku[]>;
    findById(id: string): Promise<Tbl_product_bahanbaku>;
    findByname(nameBahan: string): Promise<Tbl_product_bahanbaku>;
    findbyproduct(product_id: string): Promise<Tbl_product_bahanbaku[]>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_product_bahanbaku[]>;
}
