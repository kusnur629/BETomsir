import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_product_bahanbaku{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    product_id: string;
    @Column()
    nameBahan: string;
    @Column()
    jmlButuh: string;
    @Column()
    harga: number;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}