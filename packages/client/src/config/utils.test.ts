import * as utils from './utils';
import { EnumCardinalPoints, EnumRoverStatus } from '../Models/enums';

const rovers = [
  {
    uuid: 'abc',
    uuidPlateau: '124',
    lastKnownPosition: {
      axis: {
        x: 0,
        y: 0
      },
      position: EnumCardinalPoints.N,
      rawFormat: '0 0 N'
    },
    newPosition: {
      axis: {
        x: 0,
        y: 1
      },
      position: EnumCardinalPoints.E,
      rawFormat: '0 1 E'
    },
    stepsToNextPosition: {
      steps: ['0 1 N', '0 1 E'],
      source: 'ML'
    },
    status: EnumRoverStatus.sleep
  },
  {
    uuid: 'cde',
    uuidPlateau: '124',
    lastKnownPosition: {
      axis: {
        x: 1,
        y: 1
      },
      position: EnumCardinalPoints.N,
      rawFormat: '1 1 N'
    },
    newPosition: {
      axis: {
        x: 1,
        y: 2
      },
      position: EnumCardinalPoints.N,
      rawFormat: '1 2 N'
    },
    stepsToNextPosition: {
      steps: ['1 2 N'],
      source: 'M'
    },
    status: EnumRoverStatus.sleep
  }
];

describe('Utils', () => {
  describe('roverAxisFormatter', () => {
    it('should convert the rawFormat position into axis', () => {
      expect(utils.roverAxisFormatter('3 5 N')).toEqual('x3:y5');
    });
  });
  describe('convertSourceInToCoords', () => {
    it('should return null if a step is out of boundaries', () => {
      expect(utils.convertSourceInToCoords('3 3 N', 'M', 4)).toEqual(null);
    });
    it('should return null if a step is out of boundaries', () => {
      expect(utils.convertSourceInToCoords('3 3 E', 'M', 4)).toEqual(null);
    });
    it('should return null if a step is out of boundaries', () => {
      expect(utils.convertSourceInToCoords('0 3 W', 'M', 4)).toEqual(null);
    });
    it('should return null if a step is out of boundaries', () => {
      expect(utils.convertSourceInToCoords('0 0 S', 'M', 4)).toEqual(null);
    });
    it('should return the next step', () => {
      expect(utils.convertSourceInToCoords('0 0 S', 'L', 4)).toEqual('0 0 E');
    });
    it('should return the next step', () => {
      expect(utils.convertSourceInToCoords('1 1 S', 'M', 4)).toEqual('1 0 S');
    });
    it('should return the next step', () => {
      expect(utils.convertSourceInToCoords('1 1 S', 'R', 4)).toEqual('1 1 W');
    });
  });
  describe('prepareRoversData', () => {
    it('should prepare the rovers data to manipulate easily', () => {
      expect(utils.prepareRoversData(rovers)).toEqual({
        'x0:y0': {
          axis: 'x0:y0',
          position: 'N',
          status: 'sleep'
        },
        'x1:y1': {
          axis: 'x1:y1',
          position: 'N',
          status: 'sleep'
        },
        multiSteps: ['0 1 N', '0 1 E', '1 2 N']
      });
    });
  });
});
