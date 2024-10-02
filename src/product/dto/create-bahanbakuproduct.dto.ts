import { IsEmpty, MinLength } from "class-validator";

export class CreateBahanbakuproductDto {
    id: string;
    product_id: string;
    nameBahan: string;
    jmlButuh: string;
    harga: number;
    createdAt: Date;
    updatedAt: Date;
}