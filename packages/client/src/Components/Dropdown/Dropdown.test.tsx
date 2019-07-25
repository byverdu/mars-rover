import React from 'react';
import Dropdown, { DropdownProps } from './index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: DropdownProps = {};

describe('<Dropdown />', () => {
  const wrapper = mount(<Dropdown {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should a title props', () => {
    expect((wrapper.props() as DropdownProps).title).toEqual();
  });
});
