import { Request, Response } from 'express';
import Plateau from '../models/Plateau';
import { MongoError } from 'mongodb';
import { IPlateau, IRover } from '../types/Interfaces';
import { v4 } from 'uuid';
import Rover from '../models/Rover';
import { EnumRoverStatus } from '../types/enums';

export function getHealthCheck(req: Request, res: Response) {
  res.status(200);
  res.json({
    status: 'ok'
  });
}

export function getRoot(req: Request, res: Response) {
  res.status(200);
  res.send('Welcome to Mars Rovers');
}

export function getPlateau(req: Request, res: Response) {
  Plateau.find({}, (error: MongoError, docs: IPlateau[]) => {
    if (error) {
      throw error.message;
    }
    res.status(200);
    res.json({
      plateau: docs
    });
  });
}

export function postPlateau(req: Request, res: Response) {
  const { plateauSize } = req.body;
  const uuidPlateau = v4();
  const rovers: IRover[] = Object.values(req.body.rovers).map((item: any) => {
    return new Rover({
      uuid: v4(),
      uuidPlateau,
      lastKnownPosition: {
        axis: {
          x: item.axis.x,
          y: item.axis.y
        },
        position: item.position
      },
      status: EnumRoverStatus.sleep
    });
  });

  const plateau: IPlateau = new Plateau({
    uuid: uuidPlateau,
    name: 'Mars',
    size: {
      width: plateauSize.width,
      height: plateauSize.height
    },
    rovers
  });

  Plateau.create(plateau, async (error: MongoError, docs: IPlateau[]) => {
    if (error) {
      res.send(error.message);
    }
    await plateau.save();

    res.status(200);
    res.json({
      data: docs
    });
  });
}
