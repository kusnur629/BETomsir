import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_product_varian {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    product_id: string;
    @Column()
    id_variant: string;
    @Column()
    price: number;
    @Column()
    active_menu: number;
    @Column()
    is_stock: number;
    @Column()
    active_price: number;
    @Column()
    stock: number;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}