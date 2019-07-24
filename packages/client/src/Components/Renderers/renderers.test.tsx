import React, { Fragment, useState } from 'react';
import { mount, shallow } from 'enzyme';

import {
  renderPlateauInfo,
  renderRoverNextSteps,
  renderRoverPosition
} from './index';

describe('Renderers', () => {
  describe('renderPlateauInfo', () => {
    it('should return nothing by default', () => {
      expect(renderPlateauInfo(0, 0)).toEqual(null)
    });

    it('should return the width and height as text', () => {
      const wrapper = shallow(
        <div>{renderPlateauInfo(3, 3)}</div>
      );
      
      expect(wrapper.find('h3').text()).toEqual('Plateau size 3 x 3')
    });
  });

  describe('renderRoverPosition', () => {
    it('should return nothing by default', () => {
      expect(renderRoverPosition('')).toEqual(null)
    });

    it('should return the width and height as text', () => {
      const wrapper = shallow(
        <div>{renderRoverPosition('3 3 N')}</div>
      );
      
      expect(wrapper.find('h3').text()).toEqual('Initial Rover Position: 3 3 N')
    });
  });

  describe('renderRoverNextSteps', () => {
    it('should return nothing by default', () => {
      expect(renderRoverNextSteps('')).toEqual(null)
    });

    it('should return the width and height as text', () => {
      const wrapper = shallow(
        <div>{renderRoverNextSteps('LLMMRR')}</div>
      );
      
      expect(wrapper.find('h3').text()).toEqual('Next Steps: LLMMRR')
    });
  });
});