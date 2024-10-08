import { IsEmpty, MinLength } from "class-validator";

export class CreateVarianDto {
    id: string;
    name: string;
    remark: string;
    createdAt: Date;
    updatedAt: Date;
    max_limit: number;
    wajib_pilih: number;
}