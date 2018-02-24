import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { Game } from "./Game";

@Entity()
export class Score {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    score: number;

    @OneToOne(() => User)
    user: User

    @OneToOne(() => Game)
    game: Game
}