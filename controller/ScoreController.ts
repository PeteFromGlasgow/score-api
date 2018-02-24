import {EntityManager, Repository, Connection} from "typeorm";
import {Get, JsonController} from "routing-controllers"
import {OrmRepository, OrmConnection } from "typeorm-typedi-extensions";
import { Score } from "../model/Score";
import { Game } from "../model/Game";
import { User } from "../model/User";

@JsonController()
export class ScoreController {

    @OrmRepository(Game)
    private gameRepository: Repository<Game>

    @OrmRepository(Score)
    private scoreRepository: Repository<Score>

    @OrmRepository(User)
    private userRepository: Repository<User>


    @Get('/')
    getGames() {
        return this.gameRepository.find()
    }

    //@Get(':id')
}