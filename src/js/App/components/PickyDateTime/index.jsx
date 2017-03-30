import React, { PropTypes } from 'react';
import cx from 'classnames';

import Calendar from 'COMPONENTS/PickyDateTime/Calendar';
import Clock from 'COMPONENTS/PickyDateTime/Clock';
import STYLE from 'COMPONENTS/PickyDateTime/index.css';
import 'COMPONENTS/PickyDateTime/icon.css';

import {
  SIZE_RANGE,
  LOCALE_RANGE,
  DEFAULT_LACALE,
  DEFAULT_SIZE,
} from 'COMPONENTS/PickyDateTime/constValue';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onClose() {
    const {onClose} = this.props;
    onClose && onClose();
  }
  onYearPicked(yearInfo){
    this.props.onYearPicked(yearInfo);
  }
  onMonthPicked(monthInfo){
    this.props.onMonthPicked(monthInfo);
  }
  onDatePicked(dateInfo){
    this.props.onDatePicked(dateInfo);
  }
  onReset(dateInfo){
    this.props.onReset(dateInfo);
  }
  render() {
    let {
      size,
      show,
      locale,
      mode,
    } = this.props;
    const componentClass = cx(
      STYLE['picky-date-time'],
      show && STYLE['visible'],
    );
    let calendarHtml;
    let breakerHtml;
    let clockHtml;

    size = size.toLowerCase();
    if (SIZE_RANGE.indexOf(size) == -1){
      size = DEFAULT_SIZE;
    }

    locale = locale.toLowerCase();
    if (LOCALE_RANGE.indexOf(locale) == -1){
      locale = DEFAULT_LACALE;
    }

    if (mode == 0){
      calendarHtml = (
        <div className={`${STYLE['picky-date-time__calendar']}`}>
          <Calendar
            size={size}
            locale={locale}
            onYearPicked={this.onYearPicked.bind(this)}
            onMonthPicked={this.onMonthPicked.bind(this)}
            onDatePicked={this.onDatePicked.bind(this)}
            onReset={this.onReset.bind(this)}
          />
        </div>
      );
    }
    if (mode == 1){
      calendarHtml = (
        <div className={`${STYLE['picky-date-time__calendar']}`}>
          <Calendar
            size={size}
            locale={locale}
            onYearPicked={this.onYearPicked.bind(this)}
            onMonthPicked={this.onMonthPicked.bind(this)}
            onDatePicked={this.onDatePicked.bind(this)}
            onReset={this.onReset.bind(this)}
          />
        </div>
      );
      breakerHtml = (<span>&nbsp;&nbsp;</span>);
      clockHtml = (
        <div className={`${STYLE['picky-date-time__clock']}`}>
          <Clock
            size={size}
            locale={locale}
            onYearPicked={this.onYearPicked.bind(this)}
            onMonthPicked={this.onMonthPicked.bind(this)}
            onDatePicked={this.onDatePicked.bind(this)}
            onReset={this.onReset.bind(this)}
          />
        </div>
      );
    }
    if (mode == 2){
      clockHtml = (
        <div className={`${STYLE['picky-date-time__clock']}`}>
          <Clock
            size={size}
            locale={locale}
            onYearPicked={this.onYearPicked.bind(this)}
            onMonthPicked={this.onMonthPicked.bind(this)}
            onDatePicked={this.onDatePicked.bind(this)}
            onReset={this.onReset.bind(this)}
          />
        </div>
      );
    }
    return (
      <div className={`${componentClass}`}>
        <span className={`${STYLE['picky-date-time__close']} picky-date-time-highlight_off`} onClick={this.onClose.bind(this)}></span>
        {calendarHtml}
        {breakerHtml}
        {clockHtml}
      </div>
    );
  }
}

Index.propTypes = {
  mode: PropTypes.number,
  size: PropTypes.string,
  locale: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

Index.defaultProps = {
  locale: DEFAULT_LACALE,
  size: DEFAULT_SIZE,
  show: false,
  mode: 0,
  onYearPicked: () => {},
  onMonthPicked: () => {},
  onDatePicked: () => {},
  onReset: () => {},
  onClose: () => {},
}

export default Index;