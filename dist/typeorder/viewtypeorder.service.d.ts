import { Viewtypeorder } from './viewtypeorder.entity';
import { Repository } from 'typeorm';
export declare type User = any;
export declare class ViewTypeorderService {
    private readonly ViewTypeorderRepository;
    constructor(ViewTypeorderRepository: Repository<Viewtypeorder>);
    findAll(): Promise<Viewtypeorder[]>;
    findById(id: string): Promise<Viewtypeorder>;
    findByUsername(name: string): Promise<Viewtypeorder>;
    findfilter(startdate: Date, enddate: Date, merchant_id: string, name: string, nameMerchant: string, phone_number: string, email: string, skip: number, take: number, id: string, descending: boolean): Promise<Viewtypeorder[]>;
}
