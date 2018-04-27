# MaterialR Button

**@materialr/button**

[![Build Status](https://travis-ci.org/materialr/button.svg?branch=master)](https://travis-ci.org/materialr/button)
[![Coverage Status](https://coveralls.io/repos/github/materialr/button/badge.svg?branch=master)](https://coveralls.io/github/materialr/button?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/d0ac58a2-fcd9-4011-b858-71760f65a5c1/badge)](https://nodesecurity.io/orgs/materialr/projects/d0ac58a2-fcd9-4011-b858-71760f65a5c1)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material button implementation for React

## Installation

```sh
$ npm install --save @materialr/button
```

## Demo

A full demo is available on the [MaterialR website](https://materialr.github.io/components/button)
showcasing all variants.

## Components

### Default export

```js
import Button from '@materialr/button';
```

**Props**

| Prop         | Type                       | Required | Default   | Description                                          |
| ------------ | -------------------------- | -------- | --------- | ---------------------------------------------------- |
| `children`   | string / node              | Yes      | N/A       | The text - or elements - to render inside the button |
| `className`  | string                     | No       | undefined | Additional classNames to add to the button           |
| `dense`      | bool                       | No       | false     | Whether to render the dense button variant           |
| `disabled`   | bool                       | No       | false     | Whether the button is disabled                       |
| `onClick`    | func                       | No       | undefined | The button's click handler                           |
| `outlined`   | bool                       | No       | false     | Whether to render the outlined button variant        |
| `raised`     | bool                       | No       | false     | Whether to render the raised button variant          |
| `ripple`     | bool                       | No       | false     | Whether to add a ripple effect to the button         |
| `type`       | enum (button/submit/clear) | No       | button    | The button's type attribute                          |
| `unelevated` | bool                       | No       | false     | Whether to render the unelevated button variant      |
