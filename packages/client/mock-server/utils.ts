import { EnumCardinalPoints, EnumRoverStatus } from '../src/Models/enums';
import { IPlateauPayload, IPlateau, IRover, IRoverPositionPayload } from '../src/Models/Interfaces';
import { v4 } from 'uuid';
import apiUtils from '../../api/src/utils';

const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

interface Utils {
  getContentForRoutes: () => Promise<any>;
  postPlateau: (data: IPlateau[], plateauPayload: IPlateauPayload) => any;
}

const readFileAsync = promisify(fs.readFile);
const getPathToJsonMock = fileName => {
  const mocksPath = 'e2e/fixtures';
  const jsonPath = path.join(__dirname, '../', `${mocksPath}`, `${fileName}.json`);

  return jsonPath;
};

export const utils: Utils = {
  postPlateau: (data: IPlateau[], {plateauSize, rovers}: IPlateauPayload) => {
      console.log(plateauSize, 'inside utils file')
    const tempPlateau = plateauSize.split('x');
    const uuidPlateau = v4();
    const tempRovers: IRover[] = rovers.map((item: IRoverPositionPayload) => {
      const position = item.position.split(' ');
      const newPosition = apiUtils
        .convertSourceInToCoords(item.position, item.steps)
        .pop()
        .split(' ');

      return {
        uuid: v4(),
        uuidPlateau,
        lastKnownPosition: {
          rawFormat: `${position.join(' ')}`,
          axis: {
            x: Number(position[0]),
            y: Number(position[1])
          },
          position: position[2] as EnumCardinalPoints
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
          steps: apiUtils.convertSourceInToCoords(item.position, item.steps),
          source: item.steps
        }
      };
    });

    const newPlateau: IPlateau = {
      uuid: uuidPlateau,
      name: 'Mars',
      size: {
        width: Number(tempPlateau[0]),
        height: Number(tempPlateau[1])
      },
      rovers: tempRovers
    };

    data = [newPlateau]

    return data;
  },
  getContentForRoutes: () => {
    let count = 0;
    const paths = {};
    const mapRoutesToJson = {
      plateau: 'getPlateau'
    };
    const routes = Object.keys(mapRoutesToJson);

    return new Promise((resolve, reject) => {
      routes.forEach(async route => {
        const fileName = mapRoutesToJson[route];

        try {
          const fileContent = await readFileAsync(getPathToJsonMock(fileName), { encoding: 'utf8' });
          paths[route] = JSON.parse(fileContent);
          count += 1;
          if (count === routes.length) {
            resolve(paths);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};