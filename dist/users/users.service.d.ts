import { Tbl_user } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
export declare type User = any;
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Tbl_user>);
    create(createUsersDto: CreateUsersDto): Promise<Tbl_user>;
    findAll(): Promise<Tbl_user[]>;
    findById(id: number): Promise<Tbl_user>;
    findByUsername(userName: string): Promise<Tbl_user>;
    findByEmail(email: string): Promise<Tbl_user>;
    findfilter(startdate: Date, enddate: Date, merchant_id: string, fullname: string, email: string, role: string, skip: number, take: number, id: string): Promise<Tbl_user[]>;
}
