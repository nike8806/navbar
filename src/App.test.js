import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

let component;

describe('App', () => {
  describe('On mount', () => {
    beforeEach(() => {
      component = shallow(
        <App />
      );
    });

    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
