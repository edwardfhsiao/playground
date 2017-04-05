import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import STYLE from 'COMPONENTS/PickyDateTime/Clock/style.css';
import 'COMPONENTS/PickyDateTime/icon.css';
import cx from 'classnames';

import {
  LANG,
  POINTER_ROTATE,
  getDaysArray,
  getDaysListByMonth,
  getYearSet,
} from 'COMPONENTS/PickyDateTime/constValue';

const emptyFn = () => {}

const R2D = 180 / Math.PI;

const SECOND_DEGREE_NUMBER = 6;
const MINUTE_DEGREE_NUMBER = 6;
const HOUR_DEGREE_NUMBER = 30;

const getTodayObj = function () {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  let hour = today.getHours()
  let minute = today.getMinutes();
  let second = today.getSeconds();
  if (second < 10){
    second = '0' + second;
  }
  if (minute < 10){
    minute = '0' + minute;
  }
  let meridiem = parseInt(hour) < 12 ? 'AM' : 'PM';
  let hourText = hour > 12 ? hour - 12 : hour;
  if (hourText < 10){
    hourText = '0' + hourText;
  }
  return { year, month, date, hour, minute, second, meridiem, hourText, }
}

class Clock extends React.Component {
  constructor(props) {
    super(props)
    let todayObj = getTodayObj();
    let { hour, minute, second, meridiem, hourText, } = todayObj;

    this.startX = 0; this.startY = 0; this.originX = null; this.originY = null;

    let secondDegree = second * SECOND_DEGREE_NUMBER;
    let minuteDegree = minute * MINUTE_DEGREE_NUMBER;
    let hourDegree = hour * HOUR_DEGREE_NUMBER;
    let clockHandObj = {value: '', degree: '', isMouseOver: '', isDragging: '', startAngle: '', angle: '', meridiem: '', isMouseOver: false, isDragging: false,};

    this.state = {
      clockHandSecond: this.updateClockHandObj(clockHandObj, second, secondDegree, secondDegree, secondDegree, meridiem),
      clockHandMinute: this.updateClockHandObj(clockHandObj, minute, minuteDegree, minuteDegree, minuteDegree, meridiem),
      clockHandHour: this.updateClockHandObj(clockHandObj, hourText, hourDegree, hourDegree, hourDegree, meridiem),
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount(){
    if (!this.originX) {
      const centerPoint = ReactDOM.findDOMNode(this.clockCenter);
      const centerPointPos = centerPoint.getBoundingClientRect();
      this.originX = centerPointPos.left + centerPoint.clientWidth;
      this.originY = centerPointPos.top + centerPoint.clientWidth;
    }
    if (document.addEventListener) {
      document.addEventListener('mousemove', this.handleMouseMove, true);
      document.addEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.attachEvent('onmousemove', this.handleMouseMove);
      document.attachEvent('onmouseup', this.handleMouseUp);
    }
    this.initializeClock();
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('mousemove', this.handleMouseMove, true);
      document.removeEventListener('mouseup', this.handleMouseUp, true);
    } else {
      document.detachEvent('onmousemove', this.handleMouseMove);
      document.detachEvent('onmouseup', this.handleMouseUp);
    }
  }

  updateClockHandObj (o, value, degree, startAngle, angle, meridiem, isMouseOver = false, isDragging = false){
    o = update(o, {value: {$set: value}, degree: {$set: degree}, startAngle: {$set: startAngle}, angle: {$set: angle}, meridiem: {$set: meridiem}, isMouseOver: {$set: isMouseOver}, isDragging: {$set: isDragging}});
    return o;
  }

  initializeClock() {
    this.timeinterval = setInterval(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    let { clockHandSecond, clockHandMinute, clockHandHour,} = this.state;
    if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging){
      clearInterval(this.timeinterval);
      return;
    }
    let todayObj = getTodayObj();
    let { hour, minute, second, meridiem, hourText,} = todayObj;
    let secondDegree = second * SECOND_DEGREE_NUMBER;
    let minuteDegree = minute * MINUTE_DEGREE_NUMBER;
    let hourDegree = hour * HOUR_DEGREE_NUMBER;
    clockHandSecond = this.updateClockHandObj(clockHandSecond, second, secondDegree, secondDegree, secondDegree, meridiem);
    clockHandMinute = this.updateClockHandObj(clockHandMinute, hourText, minuteDegree, minuteDegree, minuteDegree, meridiem);
    clockHandHour = this.updateClockHandObj(clockHandHour, hourText, hourDegree, hourDegree, hourDegree, meridiem);
    this.setState({ clockHandSecond, clockHandMinute, clockHandHour,});
  }

  onFocus(){
    clearInterval(this.timeinterval);
  }

  onClick(e){
    // debugger;
  }

  handleMouseWheel(e){
    this.onKeyDown({
      key: e.deltaY > 0 ? 'ArrowUp' : 'ArrowDown',
      type: event.type || 'unknown',
      stopPropagation: typeof event.stopPropagation == 'function' ? () => event.stopPropagation(): emptyFn,
      preventDefault: typeof event.preventDefault == 'function' ? () => event.preventDefault(): emptyFn
    });
    e.preventDefault();
  }

  onKeyDown(e) {
    let { key } = e;
    let el = this.timeInput;
    let range = {
      start: el.selectionStart,
      end: el.selectionEnd,
    };
    let elObj;
    let refName;
    let meridiem = 'AM';
    debugger;
    if (range.start >= 0 && range.end <= 2){
      refName = 'clockHandHour';
      elObj = this.state.clockHandHour;
    }
    else if (range.start >= 3 && range.end <= 5){
      refName = 'clockHandMinute';
      elObj = this.state.clockHandMinute;
    }
    else if (range.start >= 6 && range.end <= 8){
      refName = 'clockHandSecond';
      elObj = this.state.clockHandSecond;
    }
    else if (range.start >= 9){
      refName = 'clockHandHour';
      elObj = this.state.clockHandHour;
      if (elObj.meridiem == 'AM'){
        meridiem = 'PM';
      }
      elObj = update(elObj, {meridiem: {$set: meridiem},});
      this.setState({[refName]: elObj})
      return;
    }
    // let value = el.value;
    // let selectedValue = parseInt(value.substring(range.start, range.end));
    let newValue;
    if (key == 'ArrowUp' || key == 'ArrowDown') {
      if (key == 'ArrowUp'){
        newValue = parseInt(elObj.value) + 1;
      }
      else if (key == 'ArrowDown'){
        newValue = parseInt(elObj.value) - 1;
      }
      if (newValue < 10){
        newValue = '0' + newValue;
      }
      // value = value.replace(selectedValue, newValue);
      let newDegree;
      if (refName == 'clockHandSecond'){
        newDegree = parseInt(newValue) * SECOND_DEGREE_NUMBER;
      }
      if (refName == 'clockHandMinute'){
        newDegree = parseInt(newValue) * MINUTE_DEGREE_NUMBER;
      }
      if (refName == 'clockHandHour'){
        newDegree = parseInt(newValue) * HOUR_DEGREE_NUMBER;
      }
      elObj = update(elObj, {
        value: {$set: newValue},
        degree: {$set: newDegree},
        startAngle: {$set: newDegree},
        angle: {$set: newDegree},
      });
      this.setState({[refName]: elObj})
      el.setSelectionRange(range.start, range.end);
      e.stopPropagation();
    }
  }

  onMouseOver(refName){
    let elObj = this.state[refName];
    elObj = update(elObj, {isMouseOver: {$set: true}});
    this.setState({[refName]: elObj});
  }

  onMouseOut(refName){
    let elObj = this.state[refName];
    elObj = update(elObj, {isMouseOver: {$set: false}});
    this.setState({[refName]: elObj});
  }

  handleMouseDown(refName, e){
    let elObj = this.state[refName];

    let x = e.clientX - this.originX;
    let y = e.clientY - this.originY;
    let startAngle = R2D * Math.atan2(y, x);
    elObj = update(elObj, {
      isDragging: {$set: true},
      startAngle: {$set: startAngle},
    });
    this.setState({[refName]: elObj});
  }

  handleMouseMove(e){
    let {
      clockHandSecond,
      clockHandMinute,
      clockHandHour,
    } = this.state;
    if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging){
      let refName;
      let roundingAngle = SECOND_DEGREE_NUMBER;
      if (clockHandSecond.isDragging){
        refName = 'clockHandSecond';
      }
      if (clockHandMinute.isDragging){
        refName = 'clockHandMinute';
      }
      if (clockHandHour.isDragging){
        refName = 'clockHandHour';
        roundingAngle = HOUR_DEGREE_NUMBER;
      }
      let elObj = this.state[refName];
      let x = e.clientX - this.originX;
      let y = e.clientY - this.originY;
      let d = R2D * Math.atan2(y, x);
      let rotation = parseInt(d - elObj.startAngle);
      rotation = Math.floor((rotation % 360 + roundingAngle / 2) / roundingAngle) * roundingAngle;
      let degree =  elObj.angle + rotation;
      if (degree >= 360){
        degree = degree - 360;
      }
      if (degree < 0){
        degree = degree + 360;
      }
      let value = degree / roundingAngle;
      if (value < 10 && value >= 0){
        value = '0' + value;
      }
      if (clockHandHour.isDragging){
        if (value == '00'){
          value = 12;
        }
      }
      elObj = update(elObj, {
        value: {$set: value},
        degree: {$set: degree},
      });
      this.setState({[refName]: elObj});
    }
  }

  handleMouseUp(e){
    let {
      clockHandSecond,
      clockHandMinute,
      clockHandHour,
    } = this.state;
    if (clockHandSecond.isDragging || clockHandMinute.isDragging || clockHandHour.isDragging){
      let clockHandSecondDegree = this.state.clockHandSecond.degree;
      let clockHandMinuteDegree = this.state.clockHandMinute.degree;
      let clockHandHourDegree = this.state.clockHandHour.degree;

      clockHandSecond = update(clockHandSecond, { isDragging: {$set: false}, angle: {$set: clockHandSecondDegree} });
      clockHandMinute = update(clockHandMinute, { isDragging: {$set: false}, angle: {$set: clockHandMinuteDegree} });
      clockHandHour = update(clockHandHour, { isDragging: {$set: false}, angle: {$set: clockHandHourDegree} });
      this.setState({ clockHandSecond, clockHandMinute, clockHandHour,});
    }
  }

  changeTime(){

  }

  render() {
    let{
      size,
      locale,
    } = this.props;
    let {
      direction,
      clockHandSecond,
      clockHandMinute,
      clockHandHour,
    } = this.state;

    let secondStyle = {
      transform: `translate(-1px, -34.5px) rotate(${clockHandSecond.degree}deg) translate(0px, -22.5px)`,
      WebkitTransform: `translate(-1px, -34.5px) rotate(${clockHandSecond.degree}deg) translate(0px, -22.5px)`,
      MozTransform: `translate(-1px, -34.5px) rotate(${clockHandSecond.degree}deg) translate(0px, -22.5px)`,
      MsTransform: `translate(-1px, -34.5px) rotate(${clockHandSecond.degree}deg) translate(0px, -22.5px)`,
      OTransform: `translate(-1px, -34.5px) rotate(${clockHandSecond.degree}deg) translate(0px, -22.5px)`,
    };
    let minuteStyle = {
      transform: `translate(-1px, -32.5px) rotate(${clockHandMinute.degree}deg) translate(0px, -20.5px)`,
      WebkitTransform: `translate(-1px, -32.5px) rotate(${clockHandMinute.degree}deg) translate(0px, -20.5px)`,
      MozTransform: `translate(-1px, -32.5px) rotate(${clockHandMinute.degree}deg) translate(0px, -20.5px)`,
      MsTransform: `translate(-1px, -32.5px) rotate(${clockHandMinute.degree}deg) translate(0px, -20.5px)`,
      OTransform: `translate(-1px, -32.5px) rotate(${clockHandMinute.degree}deg) translate(0px, -20.5px)`,
    };
    let hourStyle = {
      transform: `translate(-1.5px, -24.5px) rotate(${clockHandHour.degree}deg) translate(0px, -14.5px)`,
      WebkitTransform: `translate(-1.5px, -24.5px) rotate(${clockHandHour.degree}deg) translate(0px, -14.5px)`,
      MozTransform: `translate(-1.5px, -24.5px) rotate(${clockHandHour.degree}deg) translate(0px, -14.5px)`,
      MsTransform: `translate(-1.5px, -24.5px) rotate(${clockHandHour.degree}deg) translate(0px, -14.5px)`,
      OTransform: `translate(-1.5px, -24.5px) rotate(${clockHandHour.degree}deg) translate(0px, -14.5px)`,
    };

    let minutesItem = [];

    for (let i = 0; i < 60; i++){
      let isQuarter = false;
      let isFive = false;
      let translateFirst = `0px, -1px`;
      let translateSecond = `0px, 82px`;
      if (i == 0 || i == 15 || i == 30 || i == 45){
        isQuarter = true;
        translateFirst = `0px, -3px`;
        translateSecond = `0px, 82px`;
      }
      if (i % 5 == 0){
        isFive = true;
      }
      let minutesItemClass = cx(
        STYLE['picky-date-time-clock__clock-minute'],
        isQuarter && STYLE['picky-date-time-clock__clock-minute--quarter'],
        isFive && STYLE['picky-date-time-clock__clock-minute--five'],
      );
      let degree = i * 6 + 180;
      let minutesItemStyle = {
        transform: `translate(${translateFirst}) rotate(${degree}deg) translate(${translateSecond})`,
      };
      minutesItem.push(
        <div key={i} className={minutesItemClass} style={minutesItemStyle}></div>
      );
    }
    return (
      <div className={`${STYLE['picky-date-time-clock']}`}>
        <div className={`${STYLE['picky-date-time-clock__circle']} ${STYLE[size]}`} ref={ref => this.clockCircle = ref}>
          <div
            className={`${STYLE['picky-date-time-clock__clock-hand']} ${STYLE['picky-date-time-clock__clock-hand--second']}`}
            style={secondStyle}
            onMouseOver={this.onMouseOver.bind(this, 'clockHandSecond')}
            onMouseOut={this.onMouseOut.bind(this, 'clockHandSecond')}
            onMouseDown={this.handleMouseDown.bind(this, 'clockHandSecond')}
            ref={ref => this.clockHandSecond = ref}>
            </div>
          <div
            className={`${STYLE['picky-date-time-clock__clock-hand']} ${STYLE['picky-date-time-clock__clock-hand--minute']}`}
            style={minuteStyle}
            onMouseOver={this.onMouseOver.bind(this, 'clockHandMinute')}
            onMouseOut={this.onMouseOut.bind(this, 'clockHandMinute')}
            onMouseDown={this.handleMouseDown.bind(this, 'clockHandMinute')}
            ref={ref => this.clockHandMinute = ref}>
            </div>
          <div
            className={`${STYLE['picky-date-time-clock__clock-hand']} ${STYLE['picky-date-time-clock__clock-hand--hour']}`}
            style={hourStyle}
            onMouseOver={this.onMouseOver.bind(this, 'clockHandHour')}
            onMouseOut={this.onMouseOut.bind(this, 'clockHandHour')}
            onMouseDown={this.handleMouseDown.bind(this, 'clockHandHour')}
            ref={ref => this.clockHandHour = ref}>
            </div>
            {minutesItem}
          <div className={`${STYLE['picky-date-time-clock__clock-center']}`} ref={ref => this.clockCenter = ref}></div>
        </div>
        <div>
          <input
            value={`${clockHandHour.value}:${clockHandMinute.value}:${clockHandSecond.value} ${clockHandHour.meridiem}`}
            onFocus={this.onFocus.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
            onChange={this.changeTime.bind(this)}
            onClick={this.onClick.bind(this)}
            onWheel={this.handleMouseWheel.bind(this)}
            ref={ref => this.timeInput = ref}
          />
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  size: PropTypes.string,
  locale: PropTypes.string,
};

Clock.defaultProps = {
  size: 'm',
  locale: 'en-US',
  onSecondChange: () => {},
  onMinuteChange: () => {},
  onHourChange: () => {},
  onReset: () => {},
}

export default Clock;