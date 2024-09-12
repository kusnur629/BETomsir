import { Tbl_customer } from 'src/customer/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
export declare class CustomerService {
    private readonly CustomerRepository;
    constructor(CustomerRepository: Repository<Tbl_customer>);
    create(CreateCustomerDto: CreateCustomerDto): Promise<Tbl_customer>;
    update(id: string, data: Partial<CreateCustomerDto>): Promise<Tbl_customer>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_customer[]>;
    findById(id: string): Promise<Tbl_customer>;
    findByname(name: string): Promise<Tbl_customer>;
    findfilter(startdate: Date, enddate: Date, name: string, merchant_id: string, phone_number: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_customer[]>;
}
