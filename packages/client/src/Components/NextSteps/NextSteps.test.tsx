import React from 'react';
import NextSteps, { NextStepsProps } from './index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: NextStepsProps = {
  setRoverNextSteps: () => {},
  initialPosition: '0 0 N',
  yAxisOutOfBoundaries: 9,
  xAxisOutOfBoundaries: 10
};

describe('<NextSteps />', () => {
  const wrapper = mount(<NextSteps {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
