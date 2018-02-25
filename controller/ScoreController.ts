import {EntityManager, Repository, Connection} from "typeorm";
import {Get, JsonController, Post, BodyParam, HeaderParam, UnauthorizedError, Param} from "routing-controllers"
import {OrmRepository, OrmConnection } from "typeorm-typedi-extensions";
import { Score } from "../model/Score";
import { Game } from "../model/Game";
import { User } from "../model/User";
import {EntityFromParam, EntityFromBody} from 'typeorm-routing-controllers-extensions'
import { createHmac } from "crypto";

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

    @Get('/games/:id')
    getGame(@EntityFromParam('id') game: Game) {
        return game
    }

    @Get('/games/:id/scores')
    getGameScores(@EntityFromParam('id') game: Game) {
        return this.scoreRepository.find({
            where: {gameId: game.id},
            order: {score: 'DESC'},
            take: 10
        })
    }

    @Post('/users')
    createUser(@BodyParam('name') name: string) {
        return this.userRepository.save(new User(name))
    }

    @Post('/users/:userid/games/:gameid/score')
    async createNewScore(
        @Param('userid') userId: string,
        @EntityFromParam('gameid') game: Game,
        @BodyParam('signature') signature: string,
        @BodyParam('score') score: number
    ) {
        let user = await this.userRepository.findOneById(userId)
        if (!user) return;
        let hmac = createHmac('sha512', new Buffer(user.secret, 'hex'))
        let signatureInternal = hmac.update(score + '').digest('hex')

        if (signature !== signatureInternal) {
            throw new UnauthorizedError('Signature issue detected.')
        }
        
        return this.scoreRepository.save(new Score(score, user, game))
    }
}