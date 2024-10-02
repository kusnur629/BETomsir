import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_product_varian_barcode {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    product_id: string;
    @Column()
    id_variant: string;
    @Column()
    barcode: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}