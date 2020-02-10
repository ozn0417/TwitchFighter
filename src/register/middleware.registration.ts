import * as bodyParser from "body-parser";
import * as express from "express";
import * as swaggerUi from "swagger-ui-express";

const jsConfig = require('../../src/swagger.json');

export function RegisterMiddleware(app: express.Express) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/twitchfighter-api', swaggerUi.serve, swaggerUi.setup(jsConfig));
} 