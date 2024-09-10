import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    icon: string;
    @Column()
    merchant_id: string;
    @Column()
    remark: string;
    @Column()
    createdBy: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}