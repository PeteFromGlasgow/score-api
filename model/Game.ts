import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    constructor(name: string) {
        this.name = name
    }
}