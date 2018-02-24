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
    database: "test",
    entities: [Game, Score, User],
    synchronize: true,
})

let app = createExpressServer({
    controllers: [ScoreController]
})

app.listen(3000, () => console.log('Listening on port 3000'))