import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    image: string;
    @Column()
    stock: number;
    @Column()
    modal: number;
    @Column()
    price: number;
    @Column()
    sku: string;
    @Column()
    sell_type: number;
    @Column()
    disc: number;
    @Column()
    is_disc_percentage: number;
    @Column()
    category_id: string;
    @Column()
    merchant_id: string;
    @Column()
    idSatuan: string;
    @Column()
    is_bundle: number;
    @Column()
    status: number;
    @Column()
    is_stock_off: number;
    @Column()
    createdBy: string;
    @Column()
    exp_date: Date;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}