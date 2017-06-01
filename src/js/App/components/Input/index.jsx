import React, { PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import styles from './input.css';
import Utils from 'COMMON/utils';
import Validator from 'COMMON/validator';
import ValidatorMsg from 'COMMON/validator_message';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      msg: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidUpdate(preProps) {
    const { value } = this.props;
    if (value && !preProps.value) {
      this.check(value);
    }
  }

  onChange() {
    const value = this.input.value;
    const { onChange } = this.props;
    onChange && onChange(value);
    const { error } = this.state;
    if (error) {
      this.check();
    }
  }

  onBlur() {
    this.check();
    const { onBlur } = this.props;
    onBlur && onBlur();
  }

  onKeyUp() {
    this.check();
    const { onKeyUp } = this.props;
    onKeyUp && onKeyUp();
  }

  check(inputValue) {
    const { validationOption } = this.props;
    const { type, check, required, name, min, max, locale } = validationOption;
    if (!check) {
      return;
    }

    const value = inputValue || this.input.value;
    let error = false;
    if (required) {
      error = Validator['empty'](value) ? true : false;
      if (!error) {
        if (type === 'number') {
          error = !Validator[type](value, min, max);
        } else if (type === 'phone') {
          error = !Validator[type](value, locale);
        } else {
          error = !Validator[type](value);
        }
      }
    }
    let msg = error ? ValidatorMsg[type] : '';
    if (error && type === 'number' && (min || max)) {
      msg = `${name}的值必须为${min}-${max}`;
    }
    this.setState({ error, msg });
  }

  render() {
    const {
      value,
      disabled,
      id,
      className,
      wrapperClassName,
      placeholder,
      type,
      style,
      onFocus,
      onKeyDown,
      customStyle,
      customWrapperStyle,
      validationOption
    } = this.props;

    const { error, msg } = this.state;

    const inputWrapperClass = cx(
      wrapperClassName ? wrapperClassName : styles['wrapper'],
      styles[style],
      styles[className],
      error && styles['error'],
      customWrapperStyle
    );

    const inputClass = cx(
      styles['input'],
      styles[style],
      styles[className],
      error && styles['error'],
      customStyle
    );

    const errorMsgClass = cx(styles['msg'], error && styles['error']);

    let msgHtml;
    if (validationOption.showMsg && error && msg) {
      msgHtml = <div className={errorMsgClass}>{msg}</div>;
    }

    return (
      <div className={inputWrapperClass}>
        <input
          id={id}
          type={type}
          value={value}
          className={inputClass}
          onChange={this.onChange}
          onKeyDown={onKeyDown}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onFocus={onFocus}
          placeholder={placeholder}
          ref={ref => (this.input = ref)}
        />
        {msgHtml}
      </div>
    );
  }
}

Input.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  customStyle: PropTypes.string,
  customWrapperStyle: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  validationOption: PropTypes.object
};

Input.defaultProps = {
  disabled: false,
  value: '',
  className: '',
  wrapperClassName: '',
  customStyle: '',
  customWrapperStyle: '',
  id: '',
  placeholder: '',
  type: 'string',
  style: 'material',
  validationOption: {
    check: true,
    type: '',
    required: false,
    showMsg: false,
    name: '',
    msgOnSuccess: '',
    msgOnError: '',
    max: 0,
    min: 0,
    locale: 'zh-CN'
  },
  onChange: () => {},
  onBlur: () => {},
  onKeyUp: () => {},
  onFocus: () => {},
  onKeyDown: () => {}
};

export default Input;
