import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_varian {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    remark: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}