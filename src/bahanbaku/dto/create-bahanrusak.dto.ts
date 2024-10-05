import { IsEmpty, MinLength } from "class-validator";

export class CreateBahanrusakDto {
    id: string;
    id_bahan_baku: string;
    qty: number;
    remark: string;
    createdAt: Date;
    updatedAt: Date;
}