import React from 'react';
import Plateau, { PlateauProps } from './index';
import enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { EnumCardinalPoints, EnumRoverStatus } from '../../Models/enums';

const props: PlateauProps = {
  width: 5,
  height: 5,
  rovers: [
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
    }
  ]
};

describe('<Plateau />', () => {
  const wrapper = mount(<Plateau {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should know it's width", () => {
    expect((wrapper.props() as PlateauProps).width).toEqual(5);
  });

  it("should know it's height", () => {
    expect((wrapper.props() as PlateauProps).height).toEqual(5);
  });

  it("should create as many PlateauSquare in relation with it' height and width", () => {
    expect(wrapper.find('PlateauSquare').length).toEqual(25);
  });
});
