import { IsEmpty, MinLength } from "class-validator";

export class CreateResepproductDto {
    id: string;
    product_id: string;
    id_resep: string;
    nameResep: string;
    createdAt: Date;
    updatedAt: Date;
}