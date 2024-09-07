import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_merchant {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    image: string;
    @Column()
    phone_number: string;
    @Column()
    footer_note: string;
    @Column()
    server_key: string;
    @Column()
    client_key: string;
    @Column()
    catalog: string;
    @Column()
    default_tax: number;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}