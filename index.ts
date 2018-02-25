import "reflect-metadata";

import { createExpressServer, useContainer as routingControllerContainer } from 'routing-controllers'
import { createConnection, useContainer as typeOrmContainer } from 'typeorm'
import { Container } from 'typedi'

import { ScoreController } from './controller/ScoreController'
import { Game } from './model/Game';
import { Score } from './model/Score';
import { User } from './model/User';

typeOrmContainer(Container)
routingControllerContainer(Container)

createConnection({
    type: "sqlite",
    database: "database",
    entities: [Game, Score, User]
}).then(async (connection) => {
    await connection.synchronize(true)
    let gameRepository = await connection.getRepository<Game>(Game)

    let [games, count] = await gameRepository.findAndCount()
    
    if (count === 0) {
        await connection.getRepository<User>(User).save(user);
        let flappyScrangle = new Game('Flappy Scrangle');
        let simInvaders = new Game('Sim Invaders');

        [flappyScrangle, simInvaders] = await gameRepository.save([flappyScrangle, simInvaders])
    }
})

let app = createExpressServer({
    controllers: [ScoreController],
    cors: true
})

app.listen(3000, () => console.log('Listening on port 3000'))