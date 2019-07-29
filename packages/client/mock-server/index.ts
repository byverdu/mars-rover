import { Application, Response, Request } from 'express-serve-static-core';
import { utils } from './utils';
import { EnumApiRoutes } from '../src/Models/enums';
import { IPlateauPayload } from '../src/Models/Interfaces';

const jsonServer = require('json-server');
const { getContentForRoutes, postPlateau } = utils;
const MOCK_PORT = process.env.MOCK_PORT || 9000;

function createApp(routes) {
  const server: Application = jsonServer.create();
  const router = jsonServer.router(routes);
  const db = router.db; // lowdb instance

  db._.mixin({ postPlateau });

  const middlewares = jsonServer.defaults();
  server.use(middlewares);
  server.use(jsonServer.bodyParser);

  server.get(EnumApiRoutes.getPlateau, (req: Request, res: Response) => {
    const todos = db.get('plateau').value();
    res.status(200);

    res.jsonp(todos);
  });

  server.post(EnumApiRoutes.postPlateau, (req: Request, res: Response) => {
    const { plateauSize, rovers } = req.body;
    const plateau = db
      .get('plateau')
      .postPlateau({ plateauSize, rovers } as IPlateauPayload)
      .value();

    res.status(200);

    db.set('plateau', plateau).write();

    res.jsonp(plateau);
  });

  server.use((req, res, next) => {
    if (req.method === 'GET') {
      // Clearing query strings, so the filter feature does not kick in
      req.query = {};
    }
    // Continue to JSON Server router
    next();
  });

  server.use(router);

  return server;
}

(async () => {
  try {
    const routes = await getContentForRoutes();
    const app = createApp(routes);
    console.info(`app running on port ${MOCK_PORT}`);
    app.listen(MOCK_PORT);
  } catch (error) {
    throw new Error(error);
  }
})();
