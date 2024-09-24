import { Tbl_type_order } from 'src/typeorder/typeorder.entity';
import { Repository } from 'typeorm';
import { CreateTypeorderDto } from 'src/typeorder/dto/create-typeorder.dto';
export declare class TypeorderService {
    private readonly TypeorderRepository;
    constructor(TypeorderRepository: Repository<Tbl_type_order>);
    create(CreateTypeorderDto: CreateTypeorderDto): Promise<Tbl_type_order>;
    update(id: string, data: Partial<CreateTypeorderDto>): Promise<Tbl_type_order>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_type_order[]>;
    findById(id: string): Promise<Tbl_type_order>;
    findByname(name: string): Promise<Tbl_type_order>;
    findfilter(startdate: Date, enddate: Date, name: string, merchant_id: string, phone_number: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_type_order[]>;
}
