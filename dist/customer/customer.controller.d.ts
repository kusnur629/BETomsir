import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from 'src/customer/customer.service';
import { ViewCustomerService } from 'src/customer/viewcustomer.service';
import { Tbl_customer } from 'src/customer/customer.entity';
export declare class CustomerController {
    private readonly CustomerService;
    private readonly ViewCustomerService;
    constructor(CustomerService: CustomerService, ViewCustomerService: ViewCustomerService);
    findAll(): Promise<Tbl_customer[]>;
    create(res: any, CreateCustomerDto: CreateCustomerDto, req: any): Promise<void>;
    update(res: any, CreateCustomerDto: CreateCustomerDto, request: any): Promise<void>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    findWhereCompany(request: Request): Promise<{}>;
}
