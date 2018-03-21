import rippleFoundation from '@materialr/ripple';
import classnames from 'classnames';
import { bool, func, node, oneOf, oneOfType, string } from 'prop-types';
import React from 'react';

import '@material/button/mdc-button.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.button = undefined;
    this.componentIsMounted = undefined;
    this.rippleFoundation = undefined;
    this.state = {
      classNames: [],
      cssVariables: {},
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.rippleCreate = this.rippleCreate.bind(this);
    this.rippleDestroy = this.rippleDestroy.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
    this.updateCssVariables = this.updateCssVariables.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    if (this.props.rippleEnabled) {
      this.rippleCreate();
    }
  }
  componentDidUpdate({ rippleEnabled: wasRippleEnabled, rippleCentered: wasRippleCentered }) {
    const { rippleEnabled, rippleCentered } = this.props;
    if (wasRippleEnabled && !rippleEnabled) {
      this.rippleDestroy();
    }
    if (!wasRippleEnabled && rippleEnabled) {
      this.rippleCreate();
    }
    if (wasRippleEnabled && rippleEnabled && (wasRippleCentered !== rippleCentered)) {
      this.rippleDestroy();
      this.rippleCreate();
    }
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    if (this.props.rippleEnabled && this.rippleFoundation) {
      this.rippleDestroy();
    }
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()} ${this.props.className}`
      .trim().replace('  ', ' ');
  }
  getClassNamesFromProps() {
    const {
      dense,
      raised,
      stroked,
      unelevated,
    } = this.props;
    return classnames({
      'mdc-button': true,
      'mdc-button--dense': dense,
      'mdc-button--raised': raised,
      'mdc-button--stroked': stroked,
      'mdc-button--unelevated': unelevated,
    });
  }
  getClassNames() {
    return this.state.classNames.join(' ');
  }
  rippleCreate() {
    const { disabled, rippleCentered } = this.props;
    this.rippleFoundation = rippleFoundation({
      centered: rippleCentered,
      disabled,
      element: this.button,
      self: this,
      updateClassNames: this.updateClassNames,
      updateCssVariables: this.updateCssVariables,
    });
    this.rippleFoundation.init();
  }
  rippleDestroy() {
    this.rippleFoundation.destroy();
    this.rippleFoundation = undefined;
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  updateCssVariables(cssVariables) {
    if (this.componentIsMounted) {
      this.setState({ cssVariables });
    }
  }
  render() {
    const { children, disabled, onClick, type } = this.props;
    return (
      <button
        className={this.getClassNamesAsString()}
        disabled={disabled}
        onClick={onClick}
        ref={(button) => { this.button = button; }}
        style={this.state.cssVariables}
        type={type}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: oneOfType([node, string]).isRequired,
  className: string,
  dense: bool,
  disabled: bool,
  onClick: func,
  raised: bool,
  rippleCentered: bool,
  rippleEnabled: bool,
  stroked: bool,
  type: oneOf(['button', 'clear', 'submit']),
  unelevated: bool,
};

Button.defaultProps = {
  className: '',
  dense: false,
  disabled: false,
  onClick: undefined,
  raised: false,
  rippleCentered: false,
  rippleEnabled: false,
  stroked: false,
  type: 'button',
  unelevated: false,
};

export default Button;
