import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import routes from '../routes';

const app: Application = express();

app.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.sendStatus(200);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes({ app });

export default app;
