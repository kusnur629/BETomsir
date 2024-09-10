import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { ViewuserService } from 'src/users/viewuser.service';
import { Viewuser } from 'src/users/viewuser.entity';
import { Tbl_user } from 'src/users/users.entity';
export declare class UsersController {
    private readonly usersService;
    private readonly ViewuserService;
    constructor(usersService: UsersService, ViewuserService: ViewuserService);
    findAll(): Promise<Tbl_user[]>;
    findOne(id: string): Promise<Viewuser>;
    create(res: any, CreateUsersDto: CreateUsersDto, req: any): Promise<void>;
    update(res: any, CreateUsersDto: CreateUsersDto, request: any): Promise<void>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    findWhereCompany(request: Request): Promise<{}>;
}
