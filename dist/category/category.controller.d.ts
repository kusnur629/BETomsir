import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from 'src/category/category.service';
import { ViewcategoryService } from 'src/category/viewcategory.service';
import { Tbl_category } from 'src/category/category.entity';
export declare class CategoryController {
    private readonly CategoryService;
    private readonly ViewcategoryService;
    constructor(CategoryService: CategoryService, ViewcategoryService: ViewcategoryService);
    findAll(): Promise<Tbl_category[]>;
    create(res: any, CreateCategoryDto: CreateCategoryDto, req: any): Promise<void>;
    update(res: any, CreateCategoryDto: CreateCategoryDto, request: any): Promise<void>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    findWhereCompany(request: Request): Promise<{}>;
}
