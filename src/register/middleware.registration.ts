import * as bodyParser from "body-parser";
import * as express from "express";
import * as swaggerUi from "swagger-ui-express";

import jsConfig from '../swagger.json';

export function RegisterMiddleware(app: express.Express) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(jsConfig));
} 