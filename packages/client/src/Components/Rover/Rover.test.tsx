import React from 'react';
import Rover, { RoverProps } from './index';
import enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { EnumCardinalPoints, EnumRoverStatus } from '../../Models/enums';

const props: RoverProps = {
  axis: 'x0:y0',
  direction: EnumCardinalPoints.N,
  status: EnumRoverStatus.sleep
};

describe('<Rover />', () => {
  const wrapper: enzyme.CommonWrapper = mount(<Rover {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should know it's position on the grid", () => {
    expect((wrapper.props() as RoverProps).axis).toEqual('x0:y0');
  });

  it('should set the axis dataset attribute on the html element', () => {
    expect(
      wrapper.getDOMNode().attributes.getNamedItem('data-axis').value
    ).toEqual('x0:y0');
  });

  it('should know where is facing to', () => {
    expect((wrapper.props() as RoverProps).direction).toEqual(
      EnumCardinalPoints.N
    );
  });

  it('should set the direction dataset attribute on the html element', () => {
    expect(
      wrapper.getDOMNode().attributes.getNamedItem('data-direction').value
    ).toEqual('N');
  });

  it("should know where it's status", () => {
    expect((wrapper.props() as RoverProps).status).toEqual(
      EnumRoverStatus.sleep
    );
  });

  it('should set the direction dataset attribute on the html element', () => {
    expect(wrapper.getDOMNode().attributes.getNamedItem('class').value).toEqual(
      'rover sleep rotate-0'
    );
  });
});
