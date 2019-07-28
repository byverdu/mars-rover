import React from 'react';
import DetailsWrapper, { DetailsWrapperProps } from './index';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const props: DetailsWrapperProps = {
  plateauTitle: 'Set Plateau Size',
  roverTitle: 'Set Rover Position',
  submitData: () => {}
};

describe('<DetailsWrapper />', () => {
  const wrapper = mount(<DetailsWrapper {...props} />);
  const wrapper_ = shallow(<DetailsWrapper {...props} />);

  it('should create a snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have a plateauTitle props', () => {
    expect((wrapper.props() as DetailsWrapperProps).plateauTitle).toEqual(
      'Set Plateau Size'
    );
  });

  it('should have a roverTitle props', () => {
    expect((wrapper.props() as DetailsWrapperProps).roverTitle).toEqual(
      'Set Rover Position'
    );
  });

  it('should initially render 1 DetailsInput components', () => {
    expect(wrapper.find('DetailsInput').length).toEqual(1);
  });

  it('should display the proper text for the first DetailsInput component', () => {
    expect(
      wrapper
        .find('DetailsInput summary')
        .first()
        .text()
    ).toEqual(props.plateauTitle);
  });

  it('should display the plateau width and height once they are set', () => {
    wrapper_
      .find('.plateau-data input')
      .first()
      .simulate('change', { target: { value: 9 } });
    wrapper_
      .find('.plateau-data input')
      .last()
      .simulate('change', { target: { value: 10 } });
    expect(wrapper_.find('h3').text()).toEqual('Plateau size 9 x 10');
  });
});
