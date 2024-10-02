import { IsEmpty, MinLength } from "class-validator";

export class CreateResepproductDto {
    id: string;
    product_id: string;
    nameResep: string;
    createdAt: Date;
    updatedAt: Date;
}