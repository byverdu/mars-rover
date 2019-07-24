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
    expect((wrapper.props() as DetailsWrapperProps).plateauTitle).toEqual('Set Plateau Size');
  });

  it('should have a roverTitle props', () => {
    expect((wrapper.props() as DetailsWrapperProps).roverTitle).toEqual('Set Rover Position');
  });

  it('should initially render two DetailsInput components', () => {
    expect(wrapper.find('DetailsInput').length).toEqual(2);
  });

  it('should display the proper text for each DetailsInput component', () => {
    expect(wrapper.find('DetailsInput').first().text()).toEqual(props.plateauTitle);
    expect(wrapper.find('DetailsInput summary').last().text()).toEqual(props.roverTitle);
  });

  it('should set the plateau width properly', () => {
    wrapper_.find(".plateau-data input").first().simulate('change', {target: {value: 9}})
    expect(wrapper_.find("h3").text()).toEqual('Plateau size 9 x 0')
  });

  it('should set the plateau height properly', () => {
    wrapper_.find(".plateau-data input").last().simulate('change', {target: {value: 9}})
    expect(wrapper_.find("h3").text()).toEqual('Plateau size 9 x 9')
  });
});
