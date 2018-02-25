import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { Score } from "./Score";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @OneToMany(() => Score, score => score.game)
    @JoinColumn()
    scores: Score

    constructor(name: string) {
        this.name = name
    }
}