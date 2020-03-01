import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterControllers } from './registerControllers';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const registeredControllers = new RegisterControllers(app);

// start the Express server
module.exports = app;
  