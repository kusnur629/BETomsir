import { Tbl_product_varian_barcode } from 'src/product/varianbarcode.entity';
import { Repository } from 'typeorm';
import { CreateVarianbarcodeDto } from 'src/product/dto/create-varianbarcode.dto';
export declare class VarianbarcodeService {
    private readonly VarianbarcodeRepository;
    constructor(VarianbarcodeRepository: Repository<Tbl_product_varian_barcode>);
    create(createUsersDto: CreateVarianbarcodeDto): Promise<Tbl_product_varian_barcode>;
    update(id: string, data: Partial<CreateVarianbarcodeDto>): Promise<Tbl_product_varian_barcode>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_product_varian_barcode[]>;
    findById(id: string): Promise<Tbl_product_varian_barcode>;
    findByname(barcode: string): Promise<Tbl_product_varian_barcode>;
    findfilter(startdate: Date, enddate: Date, name: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_product_varian_barcode[]>;
}
