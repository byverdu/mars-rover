import React from 'react';
import PlateauSquare, { PlateauSquareProps } from './index';
import enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: PlateauSquareProps = {
  axis: 'x0:y0',
  empty: true,
  willBeBusy: true
};

describe('<PlateauSquare />', () => {
  const wrapper: enzyme.CommonWrapper = mount(<PlateauSquare {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should know it's position on the grid", () => {
    expect((wrapper.props() as PlateauSquareProps).axis).toEqual('x0:y0');
  });

  it('should know if a Rover is on it', () => {
    expect((wrapper.props() as PlateauSquareProps).empty).toEqual(true);
  });

  it('should set the dataset attribute on the html element', () => {
    expect(
      wrapper.getDOMNode().attributes.getNamedItem('data-axis').value
    ).toEqual('x0:y0');
  });
});
