import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_bahanbaku_resep{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    id_bahan_baku: string;
    @Column()
    qty: number;
    @Column()
    harga: number;
    @Column()
    id_resep: string;
    @Column()
    nameBahan: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}