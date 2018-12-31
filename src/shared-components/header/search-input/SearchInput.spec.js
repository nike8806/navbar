import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

import SearchInput from './SearchInput';


let component;

describe.only('SearchInput component', () => {
  describe('On mount', () => {
    let searchInput;
    beforeAll(() => {
      component = shallow(
        <SearchInput classNameComponent="header__widgets__search" />
      );
    });

    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });

    describe('On content changed', () => {
      // const handleChangeSpy = sinon.spy(New.prototype, "handleChange");
      // let instance;
      // let handleChangeSpy;
      const event = { arget: { value: 'any' } };
      beforeEach(() => {
        searchInput = component.find('form');
      });

      it('Should call to get service when the input value has more than 1 caracter', async () => {
        searchInput.simulate('onSubmit', event);
        // axios.get = jest.fn().mockResolvedValue({});
        // expect(axios.get).toBeCalled();
        // expect(axios.get).toBeCalledWith('/todo/kba/questions');
      });
    });

    describe('On focus', () => {

    });
    describe('On blur', () => {

    });
  });
});
