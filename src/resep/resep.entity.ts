import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_resep {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    hpp: number;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}