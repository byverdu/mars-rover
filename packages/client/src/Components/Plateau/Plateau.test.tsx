import React from 'react';
import Plateau, { PlateauProps } from './index';
import enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: PlateauProps = {
  width: 5,
  height: 5
};

describe('<Plateau />', () => {
  const wrapper = mount(<Plateau {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should know it\'s width', () => {
    expect((wrapper.props() as PlateauProps).width).toEqual(5);;
  });

  it('should know it\'s height', () => {
    expect((wrapper.props() as PlateauProps).height).toEqual(5);;
  });

  it('should create as many PlateauSquare in relation with it\' height and width', () => {
    expect(wrapper.find('PlateauSquare').length).toEqual(25);;
  });
});
