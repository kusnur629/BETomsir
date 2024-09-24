import { CreateTypeorderDto } from './dto/create-typeorder.dto';
import { TypeorderService } from 'src/typeorder/typeorder.service';
import { ViewTypeorderService } from 'src/typeorder/viewtypeorder.service';
import { Tbl_type_order } from 'src/typeorder/typeorder.entity';
export declare class TypeorderController {
    private readonly TypeorderService;
    private readonly ViewTypeorderService;
    constructor(TypeorderService: TypeorderService, ViewTypeorderService: ViewTypeorderService);
    findAll(): Promise<Tbl_type_order[]>;
    create(res: any, CreateTypeorderDto: CreateTypeorderDto, req: any): Promise<void>;
    update(res: any, CreateTypeorderDto: CreateTypeorderDto, request: any): Promise<void>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    findWhereCompany(request: Request): Promise<{}>;
}
