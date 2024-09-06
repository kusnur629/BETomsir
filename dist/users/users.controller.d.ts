import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import { Tbl_user } from 'src/users/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Tbl_user[]>;
    findOne(id: number): Promise<Tbl_user>;
    create(res: any, CreateUsersDto: CreateUsersDto, req: any): Promise<void>;
}
