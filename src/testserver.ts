import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterMiddleware } from './register/middleware.registration';

const app = express();
const port = 8080; // default port to listen


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

RegisterMiddleware(app);
require('./routes')(app);

// start the Express server
module.exports = app;
  