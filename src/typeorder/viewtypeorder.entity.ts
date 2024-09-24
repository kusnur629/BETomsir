import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Viewtypeorder {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    status: number;
    @Column()
    merchant_id: string;
    @Column()
    nameMerchant: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}