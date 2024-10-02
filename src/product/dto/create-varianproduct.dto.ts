import { IsEmpty, MinLength } from "class-validator";

export class CreateVarianproductDto {
    id: string;
    name: string;
    product_id: string;
    id_variant: string;
    price: number;
    active_menu: number;
    is_stock: number;
    active_price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}