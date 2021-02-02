import React from 'react';
import {shallow} from 'enzyme';
import Loading from '../Loading';

const props = {
  isOpen: true
};

test('Should render Loading without crashing', () => {
  const tree = shallow(<Loading {...props}/>);
  expect(tree).toMatchSnapshot();
});
