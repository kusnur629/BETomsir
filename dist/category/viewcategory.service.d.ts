import { Viewcategory } from './viewcategory.entity';
import { Repository } from 'typeorm';
export declare type User = any;
export declare class ViewcategoryService {
    private readonly ViewcategoryRepository;
    constructor(ViewcategoryRepository: Repository<Viewcategory>);
    findAll(): Promise<Viewcategory[]>;
    findById(id: string): Promise<Viewcategory>;
    findByUsername(name: string): Promise<Viewcategory>;
    findfilter(startdate: Date, enddate: Date, merchant_id: string, name: string, nameMerchant: string, createdByName: string, skip: number, take: number, id: string, descending: boolean): Promise<Viewcategory[]>;
}
