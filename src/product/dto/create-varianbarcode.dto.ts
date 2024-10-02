import { IsEmpty, MinLength } from "class-validator";

export class CreateVarianbarcodeDto {
    id: string;
    product_id: string;
    id_variant: string;
    barcode: string;
    createdAt: Date;
    updatedAt: Date;
}