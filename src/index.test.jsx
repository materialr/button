import { shallow } from 'enzyme';
import React from 'react';

import Button from './index';

const CHILDREN = 'CHILDREN';

test('Renders only default className', () => {
  const wrapper = shallow(<Button>{CHILDREN}</Button>);
  const expected = 'mdc-button';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders all classNames based on props', () => {
  const wrapper = shallow(<Button compact dense raised stroked unelevated>{CHILDREN}</Button>);
  const expected = 'mdc-button mdc-button--compact mdc-button--dense mdc-button--raised ' +
    'mdc-button--stroked mdc-button--unelevated';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders extra classNames that are passed in', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(<Button className={CLASS_NAME}>{CHILDREN}</Button>);
  const expected = `mdc-button ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders children as a string', () => {
  const wrapper = shallow(<Button>{CHILDREN}</Button>);
  const expected = CHILDREN;

  const actual = wrapper.text();

  expect(actual).toBe(expected);
});

test('Renders children as a node', () => {
  const Children = () => <p>CHILDREN_NODE</p>;
  const wrapper = shallow(<Button><Children /></Button>);
  const expected = true;

  const actual = wrapper.find(Children).exists();

  expect(actual).toEqual(expected);
});
