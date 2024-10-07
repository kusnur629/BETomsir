import { IsEmpty, MinLength } from "class-validator";

export class CreateResepDto {
    id: string;
    name: string;
    hpp: number;
    createdAt: Date;
    updatedAt: Date;
}