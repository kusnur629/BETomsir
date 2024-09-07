import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_user {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    fullname: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    role: string;
    @Column()
    merchant_id: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}