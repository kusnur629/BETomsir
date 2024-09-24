import { ViewTypeorder } from './viewtypeorder.entity';
import { Repository } from 'typeorm';
export declare type User = any;
export declare class ViewTypeorderService {
    private readonly ViewTypeorderRepository;
    constructor(ViewTypeorderRepository: Repository<ViewTypeorder>);
    findAll(): Promise<ViewTypeorder[]>;
    findById(id: string): Promise<ViewTypeorder>;
    findByUsername(name: string): Promise<ViewTypeorder>;
    findfilter(startdate: Date, enddate: Date, merchant_id: string, name: string, nameMerchant: string, phone_number: string, email: string, skip: number, take: number, id: string, descending: boolean): Promise<ViewTypeorder[]>;
}
