import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Viewcategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    icon: string;
    @Column()
    merchant_id: string;
    @Column()
    nameMerchant: string;
    @Column()
    remark: string;
    @Column()
    createdBy: string;
    @Column()
    createdByName: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}