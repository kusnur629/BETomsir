import { IsEmpty, MinLength } from "class-validator";

export class CreateCustomerDto {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    merchant_id: string;
    createdAt: Date;
    updatedAt: Date;
}