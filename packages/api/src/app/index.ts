import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import routes from '../routes';
import connect from '../connect';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = 'mongodb://localhost:27017/mars-rover_db';
connect({ db });
routes({ app });

export default app;
