import React, { PropTypes } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import styles from './select.css';
import Utils from 'COMMON/utils';
import Validator from 'COMMON/validator';
import ValidatorMsg from 'COMMON/validator_message';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      msg: '',
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
    const value = this.select.value;
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

  check(selectValue) {
    const { validationOption } = this.props;
    const {
      check,
      required,
      name,
      locale,
    } = validationOption;
    if (!check) { return }

    const value = selectValue || this.select.value;
    let error = false;
    if (required) {
      error = Validator['empty'](value) ? true : false;
    }
    let msg = error ? ValidatorMsg['empty'] : '';
    this.setState({ error, msg });
  }

  render() {
    const {
      value,
      option,
      disabled,
      id,
      className,
      placeholder,
      style,
      onFocus,
      onKeyDown,
      customStyle,
      validationOption,
    } = this.props;

    const {
      error,
      msg,
    } = this.state;

    const selectClass = cx(
      styles['select'],
      styles[style],
      styles[className],
      error && styles['error'],
      customStyle
    );

    const errorMsgClass = cx(
      styles['msg'],
      error && styles['error'],
    );

    let msgHtml;
    if (validationOption.showMsg && error && msg){
      msgHtml = <div className={errorMsgClass}>{msg}</div>;
    }

    let optionHtml;
    if (option.length){
      optionHtml = option.map((item, key) => {
        return <option key={key} value={item.value}>{item.text ? item.text : item.value}</option>
      });
    }

    return (
      <div>
        <select
          id={id}
          value={value}
          className={selectClass}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          ref={ref => this.select = ref}
        >
        {value && value != '' ? `` : <option value={value}>{placeholder}</option>}
        {optionHtml}
        </select>
        {msgHtml}
      </div>
    )
  }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  option: PropTypes.array,
  className: PropTypes.string,
  customStyle: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  validationOption: PropTypes.object,
};

Select.defaultProps = {
  disabled: false,
  value: '',
  option: [],
  className: '',
  customStyle: '',
  id: '',
  placeholder: '',
  type: 'string',
  style: 'material',
  validationOption: {
    check: true,
    required: false,
    showMsg: false,
    name: '',
    msgOnSuccess: '',
    msgOnError: '',
    locale: 'zh-CN',
  },
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
}

export default Select;
