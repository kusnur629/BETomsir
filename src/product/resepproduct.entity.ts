import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_product_resep{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    product_id: string;
    @Column()
    id_resep: string;
    @Column()
    nameResep: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}