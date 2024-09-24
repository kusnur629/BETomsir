import { IsEmpty, MinLength } from "class-validator";

export class CreateProductDto {
    id: string;
    name: string;
    description: string;
    image: string;
    stock: number;
    modal: number;
    price: number;
    sku: string;
    barcode: string;
    sell_type: number;
    disc: number;
    is_disc_percentage: number;
    exp_date: Date;
    category_id: string;
    price_product_id: string;
    createdAt: Date;
    updatedAt: Date;
}