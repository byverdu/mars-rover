import { Request, Response } from 'express';
import Plateau from '../models/Plateau';
import { MongoError, DeleteWriteOpResultObject } from 'mongodb';
import { IPlateau, IRover } from '../types/Interfaces';
import { v4 } from 'uuid';
import Rover from '../models/Rover';
import { EnumRoverStatus, EnumCardinalPoints } from '../types/enums';
import utils from '../utils';

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
  Plateau.find()
    .sort({ _id: -1 })
    .exec((error: MongoError, docs: IPlateau[]) => {
      if (error) {
        throw error.message;
      }
      res.status(200);
      res.json(docs[0]);
    });
}

export function deleteAllPlateau(req: Request, res: Response) {
  Plateau.deleteMany({}).exec(
    (error: MongoError, docs: DeleteWriteOpResultObject) => {
      if (error) {
        throw error.message;
      }
      res.status(200);
      res.json(`Deleted ${docs.deletedCount} documents`);
    }
  );
}

export function postPlateau(req: Request, res: Response) {
  const plateauSize = req.body.plateauSize.split('x');
  const uuidPlateau = v4();
  const rovers: IRover[] = req.body.rovers.map((item: any) => {
    const position = item.position.split(' ');
    const newPosition = utils
      .convertSourceInToCoords(item.position, item.steps)
      .pop()
      .split(' ');

    return new Rover({
      uuid: v4(),
      uuidPlateau,
      lastKnownPosition: {
        rawFormat: `${position.join(' ')}`,
        axis: {
          x: position[0],
          y: position[1]
        },
        position: position[2]
      },
      newPosition: {
        rawFormat: `${newPosition.join(' ')}`,
        axis: {
          x: Number(newPosition[0]),
          y: Number(newPosition[1])
        },
        position: newPosition[2] as EnumCardinalPoints
      },
      status: EnumRoverStatus.sleep,
      stepsToNextPosition: {
        steps: utils.convertSourceInToCoords(item.position, item.steps),
        source: item.steps
      }
    });
  });

  const plateau: IPlateau = new Plateau({
    uuid: uuidPlateau,
    name: 'Mars',
    size: {
      width: plateauSize[0],
      height: plateauSize[1]
    },
    rovers
  });

  Plateau.create(plateau, async (error: MongoError, docs: IPlateau[]) => {
    if (error) {
      res.send(error.message);
    }
    await plateau.save();

    res.status(200);
    res.json(docs);
  });
}
