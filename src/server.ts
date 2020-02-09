import express from "express";
import mongoose from "mongoose";

import { RegisterControllers } from "./registerControllers";

const app = express();
const port = 8080; // default port to listen


const mongoDbUrl = process.env.CUSTOMCONNSTR_mongoDbConnStr || 'mongodb://localhost:27017/twitchFighter';



const registeredControllers = new RegisterControllers(app);


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


// // start the Express server
// app.listen( port, () => {
//     // tslint:disable-next-line:no-console
//     console.log( `server started at http://localhost:${ port }` );
// } );
