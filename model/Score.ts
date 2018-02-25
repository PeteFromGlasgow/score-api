import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import { Game } from "./Game";

@Entity()
export class Score {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    score: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToOne(() => Game)
    @JoinColumn()
    game: Game

    constructor (score: number, user: User, game: Game) {
        this.score = score;
        this.user = user;
        this.game = game;
    }
}