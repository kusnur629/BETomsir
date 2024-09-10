import { IsEmpty, MinLength } from "class-validator";

export class CreateCategoryDto {
    id: string;
    name: string;
    icon: string;
    merchant_id: string;
    remark: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}