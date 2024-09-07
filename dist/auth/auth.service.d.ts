import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        idUser: string;
        email: string;
        role: string;
        merchant_id: string;
        createdAt: Date;
        updatedAt: Date;
        access_token: string;
    }>;
    ceckUserByUsername(email: string): Promise<boolean>;
    ceckData(data: any): Promise<boolean>;
}
