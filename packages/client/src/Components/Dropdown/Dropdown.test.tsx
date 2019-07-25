import React from 'react';
import Dropdown, { DropdownProps } from './index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: DropdownProps = {
  width: 8,
  height: 8,
  setRoverPosition: () => {}
};

describe('<Dropdown />', () => {
  const wrapper = mount(<Dropdown {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
