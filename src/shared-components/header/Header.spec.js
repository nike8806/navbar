import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

let component;

describe('Header component', () => {
  describe('On mount', () => {
    beforeEach(() => {
      component = shallow(
        <Header />
      );
    });

    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
