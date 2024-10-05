import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_bahanbaku {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    id_satuan: string;
    @Column()
    stock: number;
    @Column()
    is_stock: number;
    @Column()
    harga: number;
    @Column()
    is_minus_stock: number;
    @Column()
    qty_plus_minus: number;
    @Column()
    exp_date: Date;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}