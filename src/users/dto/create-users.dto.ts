import { IsEmpty, MinLength } from "class-validator";

export class CreateUsersDto {

    fullname: string;
    email: string;
    password: string;
    role: string;
    merchant_id: string;
    createdAt: Date;
    updatedAt: Date;
}