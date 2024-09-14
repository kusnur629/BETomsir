import { IsEmpty, MinLength } from "class-validator";

export class CreateSatuanDto {
    id: string;
    name: string;
    remark: string;
    createdAt: Date;
    updatedAt: Date;
}