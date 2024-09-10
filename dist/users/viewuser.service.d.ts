import { Viewuser } from './viewuser.entity';
import { Repository } from 'typeorm';
export declare type User = any;
export declare class ViewuserService {
    private readonly viewuserRepository;
    constructor(viewuserRepository: Repository<Viewuser>);
    findAll(): Promise<Viewuser[]>;
    findById(id: string): Promise<Viewuser>;
    findByUsername(userName: string): Promise<Viewuser>;
    findByEmail(email: string): Promise<Viewuser>;
    findfilter(startdate: Date, enddate: Date, merchant_id: string, fullname: string, email: string, role: string, skip: number, take: number, id: string, name: string, descending: boolean): Promise<Viewuser[]>;
}
