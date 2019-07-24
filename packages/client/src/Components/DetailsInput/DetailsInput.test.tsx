import React from 'react';
import DetailsInput, { DetailsInputProps } from './index';
import enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: DetailsInputProps = {
  title: 'Set Plateau Size'
};

describe('<DetailsInput />', () => {
  const wrapper = mount(<DetailsInput {...props} children={<input/>} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should a title props', () => {
    expect((wrapper.props() as DetailsInputProps).title).toEqual('Set Plateau Size');
  });

  it('should have a <details> html tag', () => {
    expect(wrapper.find('details').length).toEqual(1);
  });
  
  it('should have a <summary> html tag with the title as text', () => {
    expect(wrapper.find('summary').length).toEqual(1);
    expect(wrapper.find('summary').text()).toEqual(props.title);
  });

  it('should render some children components', () => {
    expect(wrapper.props().children).toEqual(<input />);
  });
});
