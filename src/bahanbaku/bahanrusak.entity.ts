import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_bahan_rusak {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    id_bahan_baku: string;
    @Column()
    qty: number;
    @Column()
    remark: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}