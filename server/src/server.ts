import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { RegisterControllers } from './registerControllers';
import { RegisterMiddleware } from './register/middleware.registration';

const app = express();
const port = 8080; // default port to listen


const mongoDbUrl = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://localhost:27017/twitchFighter';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const registeredControllers = new RegisterControllers(app);
RegisterMiddleware(app);

// start the Express server
app.listen(port, async () => {
    const options: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
    };
    await mongoose.connect(mongoDbUrl, options);
    const collections = await mongoose.connection.db.collections();
    collections.forEach(c => console.log(`Found: ${c.collectionName}`));
    console.log(`server is ready to use at http://localhost:${port}`);
});
