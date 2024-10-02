import { Tbl_product_barcode } from 'src/product/productbarcode.entity';
import { Repository } from 'typeorm';
import { CreateProductbarcodeDto } from 'src/product/dto/create-productbarcode.dto';
export declare class ProductbarcodeService {
    private readonly ProductbarcodeRepository;
    constructor(ProductbarcodeRepository: Repository<Tbl_product_barcode>);
    create(CreateProductbarcodeDto: CreateProductbarcodeDto): Promise<Tbl_product_barcode>;
    update(id: string, data: Partial<CreateProductbarcodeDto>): Promise<Tbl_product_barcode>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_product_barcode[]>;
    findbyproduct(product_id: string): Promise<Tbl_product_barcode[]>;
    findById(id: string): Promise<Tbl_product_barcode>;
    findByname(barcode: string): Promise<Tbl_product_barcode>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_product_barcode[]>;
}
