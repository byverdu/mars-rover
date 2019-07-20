import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import routes from '../routes';
import connect from '../connect';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to the Mongoose & TypeScript example')
);

const db = 'mongodb://localhost:27017/test';
connect({ db });
routes({ app });

export default app;
