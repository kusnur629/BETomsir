import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        idUser: string;
        email: string;
        role: string;
        merchant_id: string;
        createdAt: Date;
        updatedAt: Date;
        access_token: string;
    }>;
}
