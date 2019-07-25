import React from 'react';
import NextSteps, { NextStepsProps } from './index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: NextStepsProps = {
  setRoverNextSteps: (value: string) => {},
  initialPosition: '0 0 N',
  outOfBoundaries: 1
};

describe('<NextSteps />', () => {
  const wrapper = mount(<NextSteps {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
