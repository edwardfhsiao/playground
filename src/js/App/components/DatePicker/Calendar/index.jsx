import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { PropTypes } from 'react';
import assign from 'object-assign'
import MonthView from 'COMPONENTS/DatePicker/MonthView';
import STYLE from 'COMPONENTS/DatePicker/style.css';
import TRANSITION_STYLE from 'COMPONENTS/DatePicker/transition.css';
import TRANSITION_STYLE_FORWARD from 'COMPONENTS/DatePicker/transition_forward.css';
import TRANSITION_STYLE_BACKWARD from 'COMPONENTS/DatePicker/transition_backward.css';
import cx from 'classnames';

import {
  WEEK_NAME,
  MONTH_NAME,
  WEEK_NUMBER,
} from 'COMPONENTS/DatePicker/constValue';

const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const getDaysArray = (year, month, locale = 'zh-CN') => {
  const date = new Date(year, month - 1, 1);
  const names = WEEK_NAME[locale];
  let prevMonthDate = null;
  let thisMonthDate = null;
  let nextMonthDate = null;

  let res = [];

  let startOffset = date.getDay();
  if (startOffset != 0) {
    prevMonthDate = getDaysListByMonth(year, month - 1, names, locale);
    for (let i = prevMonthDate.length - startOffset; i <= prevMonthDate.length - 1; i++){
      res.push(prevMonthDate[i]);
    }
  }

  thisMonthDate = getDaysListByMonth(year, month, names, locale);
  res = [...res, ...thisMonthDate];

  let endOffset = WEEK_NUMBER - thisMonthDate[thisMonthDate.length - 1].day - 1;
  if (endOffset != 0) {
    nextMonthDate = getDaysListByMonth(year, month + 1, names, locale);
    for (let i = 0; i <= endOffset - 1; i++){
      res.push(nextMonthDate[i]);
    }
  }

  return res;
}

const getDaysListByMonth = (year, month, names, locale = 'zh-CN') => {
  const date = new Date(year, month - 1, 1);
  let res = [];
  while (date.getMonth() == month - 1) {
    let item = {
      name: date.getDate(),
      day: date.getDay(),
      month: month,
      year: year,
      value: `${year}-${month}-${date.getDate()}`,
    }
    res.push(item);
    date.setDate(date.getDate() + 1);
  }
  return res;
}

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let dates = getDaysArray(year, month, );

    this.state = {
      dates: dates,
      timeFocused: false,
      locale: 'zh-CN',
      year: year,
      month: month,
      date: date,
      current: `${year}-${month}`,
      direction: NEXT_TRANSITION,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.current != this.state.current){
      let dates = getDaysArray(this.state.year, this.state.month, );
      this.setState({dates});
    }
  }

  changeYear (year, direction) {
    if (direction == PREV_TRANSITION){
      year = year - 1;
    }
    else{
      year = year + 1;
    }
    let {
      month,
    } = this.state;
    let current = `${year}-${month}`;
    this.setState({year, current, direction});
  }

  changeMonth (month, direction) {
    if (direction == PREV_TRANSITION){
      if (month == 1){
        month = 12;
      }
      else{
        month = month - 1;
      }
    }
    else{
      if (month == 12){
        month = 1;
      }
      else{
        month = month + 1;
      }
    }
    let {
      year,
    } = this.state;
    let current = `${year}-${month}`;
    this.setState({month, current, direction});
  }

  changeDate (date) {
    this.setState({date});
  }


  render() {
    let {
      year,
      month,
      date,
      dates,
      locale,
      current,
      direction,
    } = this.state;

    let content;
    let rowHtml;
    if (dates.length){
      let row = dates.length / WEEK_NUMBER;
      let rowIndex = 1;
      let rowObj = {};
      dates.map((item, key) => {
        if ( key < rowIndex * (WEEK_NUMBER)){
          if (!rowObj[rowIndex]){
            rowObj[rowIndex] = [];
          }
          rowObj[rowIndex].push(item);
        }
        else{
          rowIndex = rowIndex + 1;
          if (!rowObj[rowIndex]){
            rowObj[rowIndex] = [];
          }
          rowObj[rowIndex].push(item);
        }
      });
      content = (
        <CalendarBody
          rowData={rowObj}
          month={month}
          key={current}
        />
      );
    }
    let captionHtml;
    captionHtml = WEEK_NAME[locale].map((item, key) => {
      return (
        <div className={`${STYLE['lighty-date-picker__table-caption']} ${STYLE['lighty-date-picker__table-cel']} ${STYLE['no-border']}`} key={key}>{item}</div>
      );
    });
    return (
      <div>
        <div className={`${STYLE['lighty-date-picker__header']}`}>
          <div className={`${STYLE['col']} ${STYLE['col-3']}`}>
            <div className={`${STYLE['col']} ${STYLE['lighty-date-picker__previous']}`} onClick={this.changeYear.bind(this, year, PREV_TRANSITION)}>
              <svg viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path></svg>
            </div>
            <div className={`${STYLE['col']} ${STYLE['lighty-date-picker__sub-previous']}`} onClick={this.changeMonth.bind(this, month, PREV_TRANSITION)}>
              <svg viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path></svg>
            </div>
          </div>
          <div className={`${STYLE['col']} ${STYLE['col-6']}`}>{`${MONTH_NAME[locale][month - 1]} ${year}`}</div>
          <div className={`${STYLE['col']} ${STYLE['col-3']}`}>
            <div className={`${STYLE['col']} ${STYLE['lighty-date-picker__next']}`} onClick={this.changeMonth.bind(this, month, NEXT_TRANSITION)}>
              <svg viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>
            </div>
            <div className={`${STYLE['col']} ${STYLE['lighty-date-picker__sub-next']}`} onClick={this.changeYear.bind(this, year, NEXT_TRANSITION)}>
              <svg viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>
            </div>
          </div>
        </div>
        <div className={`${STYLE['lighty-date-picker__content']}`}>
          <div className={`${STYLE['lighty-date-picker__table']}`}>
            <div className={`${STYLE['lighty-date-picker__table-row']}`}>
              {captionHtml}
            </div>
          </div>
{/*          <ReactCSSTransitionGroup
            // transitionName={TRANSITION_STYLE}
            // transitionName={direction == NEXT_TRANSITION ? TRANSITION_STYLE_FORWARD : TRANSITION_STYLE_BACKWARD}
            transitionName={{
              enter: direction == NEXT_TRANSITION ? STYLE['forwardEnter'] : STYLE['backwardEnter'],
              enterActive: direction == NEXT_TRANSITION ? STYLE['forwardEnterActive'] : STYLE['backwardEnterActive'],
              leave: direction == NEXT_TRANSITION ? STYLE['forwardLeave'] : STYLE['backwardLeave'],
              leaveActive: direction == NEXT_TRANSITION ? STYLE['forwardLeaveActive'] : STYLE['backwardLeaveActive'],
              appear: direction == NEXT_TRANSITION ? STYLE['forwardAppear'] : STYLE['backwardAppear'],
              appearActive: direction == NEXT_TRANSITION ? STYLE['forwardAppearActive'] : STYLE['backwardAppearActive'],
            }}
            // transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >*/}
            {content}
          {/*</ReactCSSTransitionGroup>*/}
        </div>
      </div>
    );
  }
}

class CalendarBody extends React.Component {
  render() {
    let {
      rowData,
      month,
    } = this.props;
    let content = Object.keys(rowData).map((key) => {
      let colHtml;
      if (rowData[key].length){
        colHtml = rowData[key].map((item, key) => {
          const datePickerItemClass = cx(
            STYLE['lighty-date-picker__table-cel'],
            STYLE['lighty-date-picker__date-item'],
            month != item.month && STYLE['disabled'],
          );
          return (
            <div className={`${datePickerItemClass}`} key={key}>
              {item.name}
            </div>
          );
        });
      }
      return (
        <div className={`${STYLE['lighty-date-picker__table-row']}`} key={key}>
          {colHtml}
        </div>
      );
    });
    return(
      <div className={`${STYLE['lighty-date-picker__table']}`}>
        {content}
      </div>
    );
  }
}

Calendar.propTypes = {
  disabled: PropTypes.bool,

};

Calendar.defaultProps = {

}

export default Calendar;