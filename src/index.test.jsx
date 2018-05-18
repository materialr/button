import * as ripple from '@material/ripple';
import { mount, shallow } from 'enzyme';
import React from 'react';

import Button from './index';

const CHILDREN = 'CHILDREN';

test('Renders the correct className', () => {
  const wrapper = shallow(<Button>{CHILDREN}</Button>, { disableLifecycleMethods: true });
  const expected = 'mdc-button';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders additional classNames', () => {
  const CLASS_NAME = 'CLASS_NAME';
  const wrapper = shallow(
    <Button className={CLASS_NAME}>{CHILDREN}</Button>,
    { disableLifecycleMethods: true },
  );
  const expected = `mdc-button ${CLASS_NAME}`;

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders a dense button', () => {
  const wrapper = shallow(<Button dense>{CHILDREN}</Button>, { disableLifecycleMethods: true });
  const expected = 'mdc-button mdc-button--dense';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders an outlined button', () => {
  const wrapper = shallow(<Button outlined>{CHILDREN}</Button>, { disableLifecycleMethods: true });
  const expected = 'mdc-button mdc-button--outlined';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders a raised button', () => {
  const wrapper = shallow(<Button raised>{CHILDREN}</Button>, { disableLifecycleMethods: true });
  const expected = 'mdc-button mdc-button--raised';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders an unelevated button', () => {
  const wrapper = shallow(
    <Button unelevated>{CHILDREN}</Button>,
    { disableLifecycleMethods: true },
  );
  const expected = 'mdc-button mdc-button--unelevated';

  const actual = wrapper.props().className;

  expect(actual).toBe(expected);
});

test('Renders the correct props', () => {
  const DISABLED = true;
  const ON_CLICK = () => 'ON_CLICK';
  const TYPE = 'button';
  const wrapper = shallow(
    <Button disabled={DISABLED} onClick={ON_CLICK} type={TYPE}>{CHILDREN}</Button>,
    { disableLifecycleMethods: true },
  );
  const expectedChildren = CHILDREN;
  const expectedDisabled = DISABLED;
  const expectedOnClick = ON_CLICK;
  const expectedType = TYPE;

  const wrapperProps = wrapper.props();
  const actualChildren = wrapperProps.children;
  const actualDisabled = wrapperProps.disabled;
  const actualOnClick = wrapperProps.onClick;
  const actualType = wrapperProps.type;

  expect(actualChildren).toBe(expectedChildren);
  expect(actualDisabled).toBe(expectedDisabled);
  expect(actualOnClick).toBe(expectedOnClick);
  expect(actualType).toBe(expectedType);
});

test('Creates the MDCRipple component on mount if enabled', () => {
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  const wrapper = mount(<Button ripple>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = instance.elementRoot;

  const actual = MDCRipple.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('does not create the MDCRipple component on mount if disabled', () => {
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  mount(<Button>{CHILDREN}</Button>);
  const expected = 0;

  const actual = MDCRipple.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Destroys the ripple on unmount if enabled', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Button ripple>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = 1;
  instance.ripple = { destroy };

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Does not destroy the ripple on unmount if disabled', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = 0;
  instance.ripple = { destroy };

  wrapper.unmount();
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Creates the MDCRipple component on update if enabled', () => {
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = instance.elementRoot;

  wrapper.setProps({ ripple: true });
  const actual = MDCRipple.mock.calls[0][0];

  expect(actual).toBe(expected);
});

test('Destroys the ripple on update if disabled', () => {
  const destroy = jest.fn();
  const wrapper = mount(<Button ripple>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = 1;
  instance.ripple = { destroy };

  wrapper.setProps({ ripple: false });
  const actual = destroy.mock.calls.length;

  expect(actual).toBe(expected);
});

test('Makes no change when the ripple prop doesn\'t change', () => {
  const destroy = jest.fn();
  const MDCRipple = jest.fn();
  ripple.MDCRipple = MDCRipple;
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expectedDestroy = 0;
  const expectedMDCRipple = 0;
  instance.ripple = { destroy };

  wrapper.setProps({ ripple: false });
  const actualDestroy = destroy.mock.calls.length;
  const actualMDCRipple = MDCRipple.mock.calls.length;

  expect(actualDestroy).toBe(expectedDestroy);
  expect(actualMDCRipple).toBe(expectedMDCRipple);
});

test('Adds extra properties that are passed in', () => {
  const DATA_QA = 'DATA_QA';
  const wrapper = shallow(
    <Button data-qa={DATA_QA}>{CHILDREN}</Button>,
    { disableLifecycleMethods: true },
  );
  const expected = DATA_QA;

  const actual = wrapper.props()['data-qa'];

  expect(actual).toBe(expected);
});
