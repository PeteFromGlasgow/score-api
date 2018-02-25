import { Entity, Column, OneToMany, JoinColumn, PrimaryColumn } from "typeorm";
import { Score } from "./Score";
import { randomBytes } from "crypto";

@Entity()
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    secret: string;

    @Column({type: 'varchar'})
    name: string;

    @OneToMany(() => Score, (score: Score) => score.user)
    score: Score[]

    constructor(name: string, id?: string, secret?: string) {
        this.name = name;
        this.id = (id) ? id : randomBytes(16).toString('hex')
        this.secret = (secret) ? secret : randomBytes(16).toString('hex')
    }
}