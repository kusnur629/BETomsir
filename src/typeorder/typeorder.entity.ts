import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_type_order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    status: number;
    @Column()
    note: string;
    @Column()
    merchant_id: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}