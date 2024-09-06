import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }


    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const passuser = user.password;
        const isMatch = await bcrypt.compare(pass, passuser);
        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        const user_auths = await this.usersService.findByEmail(user.email);
        console.log(this.jwtService.sign(payload),)
        return {
            idUser: user_auths.id,
            email: user_auths.email,
            role: user_auths.role,
            merchant_id: user_auths.merchant_id,
            createdAt:user_auths.createdAt,
            updatedAt:user_auths.updatedAt,
            access_token: this.jwtService.sign(payload),
        };
    }


    async ceckUserByUsername(email: string): Promise<boolean> {
        var status = false;
        var user_auth = await this.usersService.findByEmail(email);
        if (await this.ceckData(user_auth)) {
            status = true;
        }
        return status;
    }

    async ceckData(data: any): Promise<boolean> {
        var ceckdata = false;
        if (data != null) {
            if (data != undefined) {
                if (data.constructor.name === 'Array') {
                    if (data.length > 0) {
                        ceckdata = true;
                    }
                } else if (data.constructor.name === 'Object') {
                    if (Object.keys(data).length > 0) {
                        ceckdata = true;
                    }
                } else {
                    if (Object.keys(data).length > 0) {
                        ceckdata = true;
                    }
                }
            }
        }
        return ceckdata;
    }

}