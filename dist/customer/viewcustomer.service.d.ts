import { Viewcustomer } from './viewcustomer.entity';
import { Repository } from 'typeorm';
export declare type User = any;
export declare class ViewCustomerService {
    private readonly ViewCustomerRepository;
    constructor(ViewCustomerRepository: Repository<Viewcustomer>);
    findAll(): Promise<Viewcustomer[]>;
    findById(id: string): Promise<Viewcustomer>;
    findByUsername(name: string): Promise<Viewcustomer>;
    findfilter(startdate: Date, enddate: Date, merchant_id: string, name: string, nameMerchant: string, phone_number: string, email: string, skip: number, take: number, id: string, descending: boolean): Promise<Viewcustomer[]>;
}
