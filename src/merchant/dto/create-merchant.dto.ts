import { IsEmpty, MinLength } from "class-validator";

export class CreateMerchantDto {
    id: string;
    name: string;
    address: string;
    image: string;
    phone_number: string;
    footer_note: string;
    server_key: string;
    client_key: string;
    catalog: string;
    default_tax: number;
    createdAt: Date;
    updatedAt: Date;
}