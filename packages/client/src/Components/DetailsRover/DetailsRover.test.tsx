import React from 'react';
import RoverDetails, { RoverDetailsProps } from './index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: RoverDetailsProps = {

};

describe('<RoverDetails />', () => {
  const wrapper = mount(<RoverDetails {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should a title props', () => {
    expect((wrapper.props() as RoverDetailsProps).title).toEqual();
  });
});
