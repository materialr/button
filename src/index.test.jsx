import rippleFoundation from '@materialr/ripple';
import { mount, shallow } from 'enzyme';
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

test('Does not add a ripple when it is disabled', () => {
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const expected = undefined;

  const actual = wrapper.instance().rippleFoundation;

  expect(actual).toBe(expected);
});

test('Adds a ripple when it is enabled', () => {
  const wrapper = mount(<Button rippleEnabled>{CHILDREN}</Button>);
  const { disabled, rippleCentered } = wrapper.props();
  const instance = wrapper.instance();
  const { button, updateClassNames, updateCssVariables } = instance;
  const expected = rippleFoundation({
    centered: rippleCentered,
    disabled,
    element: button,
    self: instance,
    updateClassNames,
    updateCssVariables,
  });

  const actual = instance.rippleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Adds the ripple if the prop changes', () => {
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  instance.rippleCreate = jest.fn();

  wrapper.setProps({ rippleEnabled: true });

  expect(instance.rippleCreate).toHaveBeenCalledTimes(1);
});

test('Removes the ripple if the prop changes', () => {
  const wrapper = mount(<Button rippleEnabled>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = undefined;

  wrapper.setProps({ rippleEnabled: false });
  const actual = instance.rippleFoundation;

  expect(actual).toBe(expected);
});

test('Centers the ripple if it was previously uncentered', () => {
  const wrapper = mount(<Button rippleEnabled>{CHILDREN}</Button>);
  const { disabled } = wrapper.props();
  const instance = wrapper.instance();
  const { button, updateClassNames, updateCssVariables } = instance;
  const expected = rippleFoundation({
    centered: true,
    disabled,
    element: button,
    self: instance,
    updateClassNames,
    updateCssVariables,
  });

  wrapper.setProps({ rippleCentered: true });
  const actual = instance.rippleFoundation;

  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});

test('Updates classNames in state when \'updateClassNames()\' is called', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = CLASS_NAMES;

  instance.updateClassNames(CLASS_NAMES);
  const actual = instance.state.classNames;

  expect(actual).toEqual(expected);
});

test('Does not update classNames in state when \'updateClassNames()\' is called on an unmounted component', () => {
  const CLASS_NAMES = ['CLASS_NAME'];
  const wrapper = shallow(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateClassNames(CLASS_NAMES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Updates cssVariables in state when \'updateCssVariables()\' is called', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  const expected = CSS_VARIABLES;

  instance.updateCssVariables(CSS_VARIABLES);
  const actual = instance.state.cssVariables;

  expect(actual).toEqual(expected);
});

test('Does not update cssVariables in state when \'updateCssVariables()\' is called on an unmounted component', () => {
  const CSS_VARIABLES = ['CSS_VARIABLE'];
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  instance.setState = jest.fn();

  instance.componentIsMounted = false;
  instance.updateCssVariables(CSS_VARIABLES);

  expect(instance.setState).toHaveBeenCalledTimes(0);
});

test('Destroys the ripple when the component unmounts', () => {
  const wrapper = mount(<Button rippleEnabled>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(1);
});

test('Does not detroy the ripple when the component unmounts without a ripple', () => {
  const wrapper = mount(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(0);
});

test('Does not detroy the ripple when the component unmounts', () => {
  const wrapper = shallow(<Button>{CHILDREN}</Button>);
  const instance = wrapper.instance();
  instance.rippleDestroy = jest.fn();

  wrapper.unmount();

  expect(instance.rippleDestroy).toHaveBeenCalledTimes(0);
});
