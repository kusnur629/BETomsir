import { IsEmpty, MinLength } from "class-validator";

export class CreateProductbarcodeDto {
    id: string;
    product_id: string;
    barcode: string;
    createdAt: Date;
    updatedAt: Date;
}