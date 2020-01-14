import express = require("express");

const app = express();
const port = 4000;

app.get('/', (req: any, res: any) => res.send('Hello World! TwitchFighter is here!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
