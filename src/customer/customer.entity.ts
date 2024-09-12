import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    phone_number: string;
    @Column()
    merchant_id: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}