import { Tbl_category } from 'src/category/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-Category.dto';
export declare class CategoryService {
    private readonly CategoryRepository;
    constructor(CategoryRepository: Repository<Tbl_category>);
    create(createUsersDto: CreateCategoryDto): Promise<Tbl_category>;
    update(id: string, data: Partial<CreateCategoryDto>): Promise<Tbl_category>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
    findAll(): Promise<Tbl_category[]>;
    findById(id: string): Promise<Tbl_category>;
    findByname(name: string): Promise<Tbl_category>;
    findfilter(startdate: Date, enddate: Date, name: string, merchant_id: string, phone_number: string, skip: number, take: number, id: string, descending: boolean): Promise<Tbl_category[]>;
}
