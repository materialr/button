import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.ripple = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.rippleCreate = this.rippleCreate.bind(this);
    this.rippleDestroy = this.rippleDestroy.bind(this);
  }
  componentDidMount() {
    if (this.props.ripple) {
      this.rippleCreate();
    }
  }
  componentDidUpdate({ ripple: previousRipple }) {
    if (this.props.ripple !== previousRipple) {
      if (previousRipple) {
        this.rippleDestroy();
      } else {
        this.rippleCreate();
      }
    }
  }
  componentWillUnmount() {
    if (this.props.ripple) {
      this.rippleDestroy();
    }
  }
  getClassNames() {
    const { className, dense, outlined, raised, unelevated } = this.props;
    return classnames({
      'mdc-button': true,
      'mdc-button--dense': dense,
      'mdc-button--outlined': outlined,
      'mdc-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      [className]: !!className,
    });
  }
  rippleCreate() {
    this.ripple = new MDCRipple(this.elementRoot);
  }
  rippleDestroy() {
    this.ripple.destroy();
  }
  render() {
    const {
      getClassNames,
      props: { children, disabled, onClick, type },
    } = this;
    return (
      <button
        className={getClassNames()}
        disabled={disabled}
        onClick={onClick}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
        type={type}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  ripple: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'clear', 'submit']),
  unelevated: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  dense: false,
  disabled: false,
  onClick: undefined,
  outlined: false,
  raised: false,
  ripple: false,
  type: 'button',
  unelevated: false,
};

export default Button;
