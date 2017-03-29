import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';
import React, { PropTypes } from 'react';
import assign from 'object-assign'
import MonthView from 'COMPONENTS/PickyDateTime/MonthView';
import STYLE from 'COMPONENTS/PickyDateTime/style.css';
import TRANSITION_STYLE from 'COMPONENTS/PickyDateTime/transition.css';
import 'COMPONENTS/PickyDateTime/icon.css';
import cx from 'classnames';

import {
  WEEK_NAME,
  MONTH_NAME,
  WEEK_NUMBER,
  LANG,
} from 'COMPONENTS/PickyDateTime/constValue';

const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const SELECTOR_YEAR_SET_NUMBER = 5;

const getDaysArray = (year, month, locale = 'zh-CN') => {
  let prevMonth;
  let nextMonth;
  let prevYear;
  let nextYear;
  if (month == 12){
    prevMonth = 11;
    nextMonth = 1;
    prevYear = year - 1;
    nextYear = year + 1;
  }
  else if (month == 1){
    prevMonth = 12;
    nextMonth = 2;
    prevYear = year - 1;
    nextYear = year + 1;
  }
  else{
    prevMonth = month - 1;
    nextMonth = month + 1;
    prevYear = year;
    nextYear = year;
  }
  const date = new Date(year, month - 1, 1);
  const names = WEEK_NAME[locale];
  let prevMonthDate = null;
  let thisMonthDate = null;
  let nextMonthDate = null;

  let res = [];

  let startOffset = date.getDay();
  if (startOffset != 0) {
    prevMonthDate = getDaysListByMonth(prevYear, prevMonth, names, locale);
    for (let i = prevMonthDate.length - startOffset; i <= prevMonthDate.length - 1; i++){
      res.push(prevMonthDate[i]);
    }
  }

  thisMonthDate = getDaysListByMonth(year, month, names, locale);
  res = [...res, ...thisMonthDate];

  let endOffset = WEEK_NUMBER - thisMonthDate[thisMonthDate.length - 1].day - 1;
  if (endOffset != 0) {
    nextMonthDate = getDaysListByMonth(nextYear, nextMonth, names, locale);
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

const getYearSelectorList = (year) => {
  let res = [];
  let prevYears = [];
  let itemNumber;
  let startOffset;
  let endOffset;
  if (SELECTOR_YEAR_SET_NUMBER % 2 == 1){
    itemNumber = (SELECTOR_YEAR_SET_NUMBER - 1) / 2 + 1;
    startOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;
  }
  else{
    itemNumber = (SELECTOR_YEAR_SET_NUMBER / 2) - 1;
    startOffset = itemNumber - 1;
  }

  endOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;

  for (let i = year - startOffset; i <= year - 1; i++){
    res.push(i);
  }
  res.push(year);
  for (let i = 0; i <= endOffset - 1; i++){
    year = year + 1;
    res.push(year);
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
      currentSelect: `${year}-${month}`,
      selectedYearMonthDate: {
        date,
        year,
        month,
      },
      direction: NEXT_TRANSITION,
      showSelector: false,
      yearSelectorList: getYearSelectorList(year),
      yearSelector: year,
      showMask: false,
      selectedYear: year,
      selectedMonth: month,
      selectedDate: date,
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.pageClick.bind(this), false);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.currentSelect != this.state.currentSelect){
      let selectedYear = this.state.selectedYear;
      let selectedMonth = this.state.selectedMonth;
      let dates = getDaysArray(selectedYear, selectedMonth, );
      this.setState({dates});
    }
  }

  pageClick(e) {
    if (this.mouseIsDownOnSelectorClicker) {
      return;
    }
    this.setState({
        showSelector: false,
        showMask: false,
    });
  }

  changeSelectedYear (selectedYear, direction) {
    if (direction == PREV_TRANSITION){
      selectedYear = selectedYear - 1;
    }
    else{
      selectedYear = selectedYear + 1;
    }
    let {
      selectedMonth,
    } = this.state;
    let currentSelect = `${selectedYear}-${selectedMonth}`;
    this.setState({
      selectedYear,
      currentSelect,
      direction,
    });
  }

  changeSelectedMonth (selectedMonth, direction) {
    let {
      selectedYear,
    } = this.state;
    if (direction == PREV_TRANSITION){
      if (selectedMonth == 1){
        selectedMonth = 12;
        selectedYear = selectedYear - 1;
      }
      else{
        selectedMonth = selectedMonth - 1;
      }
    }
    else{
      if (selectedMonth == 12){
        selectedMonth = 1;
        selectedYear = selectedYear + 1;
      }
      else{
        selectedMonth = selectedMonth + 1;
      }
    }
    let currentSelect = `${selectedYear}-${selectedMonth}`;
    this.setState({
      selectedMonth,
      selectedYear,
      currentSelect,
      direction,
    });
  }

  changeSelectedDate (selectedDate) {
    let {
      selectedMonth,
      selectedYear,
      selectedYearMonthDate,
    } = this.state;
    selectedYearMonthDate = update(selectedYearMonthDate, {
        year: {$set: selectedYear},
        month: {$set: selectedMonth},
        date: {$set: selectedDate},
      }
    );
    this.setState({selectedDate, selectedYearMonthDate});
    this.props.onDateSelect(selectedYear, selectedMonth, selectedDate);
  }

  changeSelectorYearSet (yearSelector, direction) {
    let yearSelectorList = getYearSelectorList(yearSelector);
    this.setState({yearSelector, yearSelectorList, direction});
  }

  showSelector () {
    let {
      showSelector,
      showMask,
    } = this.state;
    this.setState({showSelector: !showSelector, showMask: !showMask});
  }

  onMouseDown () {
    this.mouseIsDownOnSelectorClicker = true;
  }

  onMouseUp () {
    this.mouseIsDownOnSelectorClicker = false;
  }

  reset () {
    let {
      year,
      month,
      date,
      selectedYearMonthDate,
    } = this.state;
    let currentSelect = `${year}-${month}`;
    selectedYearMonthDate = update(selectedYearMonthDate, {
        year: {$set: year},
        month: {$set: month},
        date: {$set: date},
      }
    );
    this.setState({
      currentSelect: currentSelect,
      selectedYearMonthDate: selectedYearMonthDate,
      yearSelector: year,
      selectedYear: year,
      selectedMonth: month,
      selectedDate: date,
    });
  }

  render() {
    let {
      year,
      month,
      date,
      selectedYear,
      selectedMonth,
      selectedDate,
      dates,
      locale,
      current,
      currentSelect,
      direction,
      showSelector,
      yearSelectorList,
      yearSelector,
      selectedYearMonthDate,
      showMask,
    } = this.state;
    let transitionContainerStyle;
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
          year={year}
          month={month}
          selectedMonth={selectedMonth}
          date={date}
          selectedDate={selectedDate}
          selectedYearMonthDate={selectedYearMonthDate}
          onClick={this.changeSelectedDate.bind(this)}
          key={currentSelect}
        />
      );
      if (row == 6){
        transitionContainerStyle = {
          height: '380px'
        }
      }
    }
    let captionHtml;
    captionHtml = WEEK_NAME[locale].map((item, key) => {
      return (
        <div className={`${STYLE['picky-date-time__table-caption']} ${STYLE['picky-date-time__table-cel']} ${STYLE['no-border']}`} key={key}>{item}</div>
      );
    });
    let selectorClass = cx(
      STYLE['picky-date-time-dropdown'],
      STYLE['picky-date-time__selector'],
      showSelector && STYLE['visible'],
    );
    let selectorMonthHtml = MONTH_NAME[locale].map((item, key) => {
      let itemMonth = key + 1;
      let monthItemClass = cx(
        STYLE['picky-date-time-dropdown__month-item'],
        itemMonth == selectedMonth && STYLE['active'],
      );
      let month = itemMonth - 1;
      let direction = NEXT_TRANSITION;
      if (itemMonth < selectedMonth){
        direction = PREV_TRANSITION;
        month = itemMonth + 1;
      }
      return (
        <div className={monthItemClass} onClick={itemMonth !== selectedMonth ? this.changeSelectedMonth.bind(this, month, direction) : ``} key={key}>
          <div>{item}</div>
        </div>
      );
    });
    let selectorYearHtml;
    if (yearSelectorList.length){
      selectorYearHtml = yearSelectorList.map((item, key) => {
        let yearItemClass = cx(
          STYLE['picky-date-time-dropdown__year-item'],
          item == selectedYear && STYLE['active'],
        );
        let year = item - 1;
        let direction = NEXT_TRANSITION;
        if (item < selectedYear){
          direction = PREV_TRANSITION;
          year = item + 1;
        }
        return(
          <div className={yearItemClass} onClick={item !== selectedYear ? this.changeSelectedYear.bind(this, year, direction) : ``} key={key}>
            <div>{item}</div>
          </div>
        );
      });
    }
    return (
      <div>
        <div className={`${STYLE['picky-date-time__header']}`}>
          <div className={`${STYLE['col']} ${STYLE['col-3']}`}>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time__previous']}`} onClick={this.changeSelectedYear.bind(this, selectedYear, PREV_TRANSITION)}>
              <span className={`${STYLE['picky-date-time__icon']} picky-date-time-first_page`}></span>
            </div>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time__sub-previous']}`} onClick={this.changeSelectedMonth.bind(this, selectedMonth, PREV_TRANSITION)}>
              <span className={`${STYLE['picky-date-time__icon']} picky-date-time-keyboard_arrow_left`}></span>
            </div>
          </div>
          <div className={`${STYLE['col']} ${STYLE['col-6']}`}>
            <div className={`${selectorClass}`} ref={ref => this.monthSelector = ref} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
              <div className={`${STYLE['picky-date-time-dropdown__menu']}`}>
                <div className={`${STYLE['picky-date-time-dropdown__month']}`}>
                  {selectorMonthHtml}
                </div>
                <div style={{'height':'10px'}}></div>
                <span className={`${STYLE['picky-date-time__selector-icon']} ${STYLE['picky-date-time__selector-icon--left']} ${STYLE['picky-date-time__icon']} picky-date-time-keyboard_arrow_left`} onClick={this.changeSelectorYearSet.bind(this, yearSelector - SELECTOR_YEAR_SET_NUMBER, PREV_TRANSITION)}></span>
                <ReactCSSTransitionGroup
                  className="picky-date-time__selector-year-set-container"
                  transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                <div className={`${STYLE['picky-date-time-dropdown__year']}`} key={yearSelectorList}>
                  {selectorYearHtml}
                </div>
                </ReactCSSTransitionGroup>
                <span className={`${STYLE['picky-date-time__selector-icon']} ${STYLE['picky-date-time__selector-icon--right']} ${STYLE['picky-date-time__icon']} picky-date-time-keyboard_arrow_right`} onClick={this.changeSelectorYearSet.bind(this, yearSelector + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}></span>
              </div>
            </div>
            <ReactCSSTransitionGroup
              className="picky-date-time__title-container"
              transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <div className={`${STYLE['picky-date-time__title']}`} key={currentSelect}>
                <span className={`${STYLE['picky-date-time__clicker']}`} onClick={this.showSelector.bind(this)} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                  <span className={`${STYLE['picky-date-time__clicker']}`}>
                    <span>{`${MONTH_NAME[locale][selectedMonth - 1]}`}</span>
                  </span>
                  <span>&nbsp;&nbsp;</span>
                  <span className={`${STYLE['picky-date-time__clicker']}`}>
                    <span>{`${selectedYear}`}</span>
                  </span>
                </span>
              </div>
            </ReactCSSTransitionGroup>
          </div>
          <div className={`${STYLE['col']} ${STYLE['col-3']}`}>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time__next']}`} onClick={this.changeSelectedMonth.bind(this, selectedMonth, NEXT_TRANSITION)}>
              <span className={`${STYLE['picky-date-time__icon']} picky-date-time-keyboard_arrow_right`}></span>
            </div>
            <div className={`${STYLE['col']} ${STYLE['picky-date-time__sub-next']}`} onClick={this.changeSelectedYear.bind(this, selectedYear, NEXT_TRANSITION)}>
              <span className={`${STYLE['picky-date-time__icon']} picky-date-time-last_page`}></span>
            </div>
          </div>
        </div>
        <div className={`${STYLE['picky-date-time__content']}`}>
          <div className={`${STYLE['picky-date-time__table']}`}>
            <div className={`${STYLE['picky-date-time__table-row']}`}>
              {captionHtml}
            </div>
          </div>
          <ReactCSSTransitionGroup
            className="picky-date-time__body-container"
            transitionName={direction == NEXT_TRANSITION ? 'forward' : 'backward'}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            style={transitionContainerStyle}
          >
            {content}
          </ReactCSSTransitionGroup>
        </div>
        <div className={`${STYLE['picky-date-time__button']} ${STYLE['picky-date-time__today']}`} onClick={this.reset.bind(this)}>
          <span className={`${STYLE['picky-date-time__inline-span']}`}>{LANG[locale]['reset']}</span>
          <span className={`${STYLE['picky-date-time__inline-span']} ${STYLE['picky-date-time__icon']} picky-date-time-refresh`} onClick={this.changeSelectorYearSet.bind(this, yearSelector + SELECTOR_YEAR_SET_NUMBER, NEXT_TRANSITION)}></span>
        </div>
        <div className={`${cx(STYLE['picky-date-time__mask'], showMask && STYLE['visible'])}`}></div>
      </div>
    );
  }
}

class CalendarBody extends React.Component {
  render() {
    let {
      rowData,
      selectedMonth,
      year,
      month,
      selectedDate,
      selectedYearMonthDate,
      date,
      onClick,
    } = this.props;
    let curSelectYear = selectedYearMonthDate.year;
    let curSelectMonth = selectedYearMonthDate.month;
    let curSelectDate = selectedYearMonthDate.date;
    let content = Object.keys(rowData).map((key) => {
      let colHtml;
      if (rowData[key].length){
        colHtml = rowData[key].map((item, key) => {
          let isSlected = curSelectDate == item.name && curSelectMonth == item.month && curSelectYear == item.year;
          let isDisabled = selectedMonth != item.month;
          const datePickerItemClass = cx(
            STYLE['picky-date-time__table-cel'],
            STYLE['picky-date-time__date-item'],
            isDisabled && STYLE['disabled'],
            date == item.name && month == item.month && year == item.year && STYLE['today'],
            isSlected && STYLE['active'],
          );
          return (
            <div className={`${datePickerItemClass}`} key={key} onClick={!isDisabled ? this.props.onClick.bind(this, item.name) : ``}>
              {item.name}
              {isSlected ? <span className={`${STYLE['picky-date-time__icon']} picky-date-time-check`}></span> : ``}
            </div>
          );
        });
      }
      return (
        <div className={`${STYLE['picky-date-time__table-row']}`} key={key}>
          {colHtml}
        </div>
      );
    });
    return(
      <div className={`${STYLE['picky-date-time__table']} slide`}>
        {content}
      </div>
    );
  }
}

CalendarBody.propTypes = {
  onClick: PropTypes.func,
}

CalendarBody.defaultProps = {
  onClick: () => {},
}

Calendar.propTypes = {
  disabled: PropTypes.bool,

};

Calendar.defaultProps = {
  onDateSelect: () => {},
}

export default Calendar;