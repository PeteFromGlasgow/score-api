import { createExpressServer, useContainer as routingControllerContainer } from 'routing-controllers'
import { createConnection, useContainer as typeOrmContainer } from 'typeorm'
import { Container } from 'typedi'

import { ScoreController } from './controller/ScoreController'
import { Game } from './model/Game';

routingControllerContainer(Container)
typeOrmContainer(Container)

let app = createExpressServer({
    controllers: [ScoreController]
})

createConnection({
    type: "sqlite",
    database: "test",
    entities: [
        __dirname + "/model/*.ts"
    ],
    synchronize: true,
}).then(async (connection) => {
    let gameRepository = connection.getRepository(Game)

    let [games, count] = await gameRepository.findAndCount()
    if (count < 2) {
        let flappyScrangle = new Game('Flappy Scrangle')
        let simInvaders = new Game('Sim Invaders')
        gameRepository.save([flappyScrangle, simInvaders])
    }
})

app.listen(3000, () => console.log('Listening on port 3000'))