import {Connection} from "typeorm";
import {OrmConnection, OrmRepository, } from "typeorm-typedi-extensions";
import {Get, JsonController} from "routing-controllers"
import { Repository } from "typeorm/repository/Repository";
import { Score } from "../model/Score";
import { Game } from "../model/Game";
import { User } from "../model/User";

@JsonController()
export class ScoreController {

    @OrmConnection()
    private connection: Connection;

    @Get('/')
    getGames() {
        let gameRepository = this.connection.getRepository<Game>(Game);
        return gameRepository.find()
    }
}