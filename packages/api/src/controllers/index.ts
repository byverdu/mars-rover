import { Request, Response } from 'express';

export function getHealthCheck(req: Request, res: Response) {
  res.status(200);
  res.json({
    status: 'ok'
  });
}
