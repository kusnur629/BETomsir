import { Tbl_merchant } from 'src/merchant/merchant.entity';
import { Repository } from 'typeorm';
import { CreateMerchantDto } from 'src/merchant/dto/create-merchant.dto';
export declare class MerchantService {
    private readonly MerchantRepository;
    constructor(MerchantRepository: Repository<Tbl_merchant>);
    create(createUsersDto: CreateMerchantDto): Promise<Tbl_merchant>;
    update(id: string, data: Partial<CreateMerchantDto>): Promise<Tbl_merchant>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_merchant[]>;
    findById(id: string): Promise<Tbl_merchant>;
    findByname(name: string): Promise<Tbl_merchant>;
}
