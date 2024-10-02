import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_product_barcode {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    product_id: string;
    @Column()
    barcode: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}