import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    hash: string;

    @Column({type: 'varchar'})
    name: string;

}