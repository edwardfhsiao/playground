import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
import Utils from 'COMMON/utils';
import Input from 'COMPONENTS/Input';
import Select from 'COMPONENTS/Select';
import Label from 'COMPONENTS/Label';
import interact from 'interact.js';
import PickyDateTime from 'react-picky-date-time';
// import '../../../my_plugins/my_test';
import cx from 'classnames';
import styles from './styles/index.css';
import Shake from 'shake.js';
import 'fullpage.js/dist/jquery.fullpage.js';
import 'fullpage.js/dist/jquery.fullpage.min.css';
// import ReactGridLayout from 'react-grid-layout';
import ReactGridLayout, {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import _ from 'lodash';
import * as d3 from 'd3';
 let myShakeEvent = new Shake({
    threshold: 5, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

const formatTime = function(val){
  val = parseInt(val);
  if (val < 10 && val >= 0){ val = '0' + val};
  return val.toString();
}

const MIN_SEC_RANGE = 60;
const HOUR_RANGE_24 = 24;
const HOUR_RANGE_12 = 12;
const DEFAULT_MINUTE_OFFSET = 30;

const getTimeTextList = function(hourRange = HOUR_RANGE_24, minuteOffset = DEFAULT_MINUTE_OFFSET) {
  let hourList = getTimeList(hourRange, 1, 24);
  let minuteRange = MIN_SEC_RANGE / minuteOffset;
  let minuteList = getTimeList(minuteRange, minuteOffset, MIN_SEC_RANGE);
  let list = [];
  minuteList.map((m) => {
    hourList.map((h) => {
      list.push(`${h}:${m}`);
    });
  });
  if (hourList.length == HOUR_RANGE_12){
    let listAM = [];
    let listPM = [];
    list.sort().map((i) => {
      listAM.push(`${i} AM`);
      listPM.push(`${i} PM`);
    });
    let newAM = listAM.slice(0, listAM.length - minuteRange);
    let newPM = listPM.slice(0, listPM.length - minuteRange);
    let remainingAMList = getRemainingList(listAM, minuteRange);
    let remainingPMList = getRemainingList(listPM, minuteRange);

    list = [...remainingAMList, ...newAM, ...remainingPMList, ...newPM];
    return list;
  }
  else{
    return list.sort();
  }
}

const getRemainingList = function(list, remainingNum) {
  let res = [];
  for (let i = list.length - remainingNum; i < list.length; i++) {
    res.push(list[i]);
  }
  return res;
}

const getTimeList = function(range, offset = 1, end = 60) {
  let list = [];
  for(let i = 0; i < range; i++){
    let val = i * offset + offset;
    val = val == end ? 0 : val;
    val = formatTime(val);
    list.push(val);
  }
  return list;
}

// const timeList = getTimeTextList(HOUR_RANGE_12);
// const timeList = getTimeTextList(HOUR_RANGE_12, 15);
const timeList = getTimeTextList(HOUR_RANGE_24, 30);

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      times: 0,
      value: '',
      phone: '',
      days: '',
      showPickyDateTime: false,
      eventInstanceList: [],
      lastModifiedEventInstanceIndex: -1,
      newCounter: 0,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPhoneKeyDown = this.onPhoneKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePhoneInputChange = this.handlePhoneInputChange.bind(this);
    this.handleDaysSelectChange = this.handleDaysSelectChange.bind(this);
  }

  componentWillMount() {
    myShakeEvent.start();
    window.addEventListener('shake', this.shakeEventDidOccur.bind(this), false);
  }

  componentDidMount() {
    this.timetable.addEventListener('dblclick', this.createNewEventInstance.bind(this), false);
    // this.initFullpage();
    // this.initD3();
    // $('.intros').alertWhileClick('a');
  }

  createNewEventInstance(e) {
    let {
      clientX,
      clientY,
    } = e;

    let {
      newCounter,
      eventInstanceList,
      lastModifiedEventInstanceIndex,
    } = this.state;
    // debugger;
    newCounter = newCounter + 1;
    console.log(eventInstanceList);
    const i = 'n' + newCounter;
    const x = lastModifiedEventInstanceIndex != -1 ? eventInstanceList[lastModifiedEventInstanceIndex].x : 0;
    const y = lastModifiedEventInstanceIndex != -1 ? eventInstanceList[lastModifiedEventInstanceIndex].y : 0;
    const w = lastModifiedEventInstanceIndex != -1 ? eventInstanceList[lastModifiedEventInstanceIndex].w : 3;
    const h = lastModifiedEventInstanceIndex != -1 ? eventInstanceList[lastModifiedEventInstanceIndex].h : 3;
    let isDraggable, isResizable, maxH, maxW, minH, minW, moved = false, staticVal = false;
    const newEventInstance = {i: i, x: x, y: y + 2, w: w, h: h, isDraggable: isDraggable, isResizable: isResizable, maxH: maxH, maxW: maxW, minH: minH, minW: minW, moved: moved, static: staticVal};
    eventInstanceList.push(newEventInstance);
    this.setState({newCounter, eventInstanceList});
  }

  onYearPicked(yearInfo) {
    console.log(yearInfo);
  }

  onMonthPicked(monthInfo) {
    console.log(monthInfo);
  }

  onDatePicked(dateInfo) {
    console.log(dateInfo);
  }

  onResetDate(dateInfo) {
    console.log(dateInfo);
  }

  onSecondChange(secondInfo){
    console.log(secondInfo);
  }

  onMinuteChange(minuteInfo){
    console.log(minuteInfo);
  }

  onHourChange(hourInfo){
    console.log(hourInfo);
  }

  onMeridiemChange(meridiemInfo){
    console.log(meridiemInfo);
  }

  onResetTime(Info){
    console.log(Info);
  }

  onClearTime(Info){
    console.log(Info);
  }

  openPickyDateTime() {
    this.setState({showPickyDateTime: true});
  }

  onClose() {
    this.setState({showPickyDateTime: false});
  }

  initFullpage(){
    $('#fullpage').fullpage({
      menu: '.menu',
      sectionsColor: ['#f8f8f8', '#ececec', '#f8f8f8', '#ececec'],
      navigation: false,
      navigationPosition: 'right',
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      scrollOverflow: false,
      normalScrollElements: '.slide-modal-content, .modal',
    });
  }

  initD3(){
      d3.select('body')
          .attr("class", "special")
        .append('div')
          .attr("class", "ddd")
        .html('Hello, world!');
  }

  shakeEventDidOccur(e) {
    //put your own code here etc.
    let times = this.state.times;
    alert(JSON.stringify(e));
    this.setState({times: times + 1});
    alert(times);
  }

  handleInputChange(value) {
    this.setState({ value })
  }

  onKeyDown(e) {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      const { onAdd } = this.props;
      onAdd && onAdd(value);
      this.clearInput();
    }
  }

  handlePhoneInputChange(value) {
    this.setState({ phone: value })
  }

  onPhoneKeyDown(e) {
    const { phone } = this.state;
    if (e.keyCode === 13 && phone) {
      const { onAdd } = this.props;
      onAdd && onAdd(value);
      this.clearInput();
    }
  }

  handleDaysSelectChange(value) {
    this.setState({ days: value })
  }

  clearInput() {
    this.setState({ value: '' });
  }

  renderLabels() {
    let { labels, color } = this.props;
    labels = ['s', 'fd'];
    return labels.map((label, index) => {
      return (
        <Label
          key={index}
          value={label}
          color={color}
          // onDelete={this.onDelete(index)}
        />
      )
    })
  }

onFocusChange() {

}
onTimeQuantumChange() {
  
}
onTimeChange() {

}

onRemoveItem() {

}

onLayoutChange(list) {
  let eventInstanceList = [];
  list.map((o) => {
    const {i, x, y, w, h} = o;
    eventInstanceList.push({i, x, y, w, h});
  });
  this.setState({eventInstanceList});
}

onDragStart(items, item){
  // debugger;
}

onDrag(items, item){
  // debugger;
}

onDragStop(items, item){
  // debugger;
  let {
    eventInstanceList,
    lastModifiedEventInstanceIndex,
  } = this.state;
  let index = -1;
  eventInstanceList.map((o, k) => {
    if (o.i == item.i){
      index = k;
    }
  });
  if (index != -1){
    lastModifiedEventInstanceIndex = index;
    eventInstanceList[lastModifiedEventInstanceIndex] = item;
  }
  this.setState({eventInstanceList, lastModifiedEventInstanceIndex});
}

onResizeStart(items, item){
  // debugger;
}

onResize(items, item){
  // debugger;
}

onResizeStop(items, item){
  // debugger;
  let {
    eventInstanceList,
    lastModifiedEventInstanceIndex,
  } = this.state;
  let index = -1;
  eventInstanceList.map((o, k) => {
    if (o.i == item.i){
      index = k;
    }
  });
  if (index != -1){
    lastModifiedEventInstanceIndex = index;
    eventInstanceList[lastModifiedEventInstanceIndex] = item;
  }
  this.setState({eventInstanceList, lastModifiedEventInstanceIndex});
}

createElement(el) {
  var removeStyle = {
    position: 'absolute',
    right: '2px',
    top: 0,
    cursor: 'pointer'
  };
  var i = el.add ? '+' : el.i;
  return (
    <div key={i} data-grid={el} className={`${styles['grid-item']}`}>
      {el.add ?
        <span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>
      : <span className="text">{i}</span>}
      <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>x</span>
    </div>
  );
}

  render() {

    const resizeDragClass = cx(
      styles['resize-drag'],
    );

    const resizeContainerClass = cx(
      styles['resize-container'],
    );

    let {
      value,
      phone,
      days,
      showPickyDateTime,
      eventInstanceList,
    } = this.state;
    // let styles = {};
    // console.log(styles);
    // console.log(styles['icon']);
    // console.log(styles['icon-chevron-right']);
    let PickyDateTimeComponent;
    PickyDateTimeComponent = (
      <PickyDateTime
        size="m"
        mode={1}
        locale={`zh-CNs`}
        show={true}
        onClose={this.onClose.bind(this)}
        onYearPicked={this.onYearPicked.bind(this)}
        onMonthPicked={this.onMonthPicked.bind(this)}
        onDatePicked={this.onDatePicked.bind(this)}
        onResetDate={this.onResetDate.bind(this)}
        onSecondChange={this.onSecondChange.bind(this)}
        onMinuteChange={this.onMinuteChange.bind(this)}
        onHourChange={this.onHourChange.bind(this)}
        onMeridiemChange={this.onMeridiemChange.bind(this)}
        onResetTime={this.onResetTime.bind(this)}
        onClearTime={this.onClearTime.bind(this)}
      />
    );
    let option = [{value: 'Monday', text: '周一'}, {value: 'Tuesday', text: '周二'}];




    let eventInstanceListHtml;
    if (eventInstanceList.length){
      eventInstanceListHtml = eventInstanceList.map((i, k) => {
        return (
          <div key={i.i} className={`${styles['grid-item']}`}>{i.i}</div>
        );
      });
    }

    let timeColunmListHtml = timeList.map((i, k) => {
      return (
        <div className={`${styles['dp-tbl-row']}`} key={k}>
          <div className={`${styles['dp-tbl']}`}>
            <div className={`${styles['dp-tbl-cel']} ${styles['timetable__time-item']} ${styles['va-middle']}`}>
              {i}
            </div>
          </div>
        </div>
      );
    });

    return(
      <div className="">
        <div id="fullpage">
          <div className="section intros" data-anchor="intros">
            <div onClick={this.openPickyDateTime.bind(this)}>dd</div>

            <div className={`${styles['dp-tbl']} ${styles['timetable']}`}>
              <div className={`${styles['dp-tbl-cel']} ${styles['timetable__time']}`} style={{}}>
                <div className={`${styles['dp-tbl']}`} style={{'borderSpacing':'10px'}}>
                  {timeColunmListHtml}
                </div>
              </div>
              <div className={`${styles['dp-tbl-cel']} ${styles['va-top']}`} ref={ref => this.timetable = ref}>
                <ReactGridLayout
                  className="layout"
                  cols={12}
                  layout={eventInstanceList}
                  rowHeight={10}
                  width={1000}
                  maxRows={10}
                  verticalCompact={false}
                  onLayoutChange={this.onLayoutChange.bind(this)}
                  onDragStart={this.onDragStart.bind(this)}
                  onDrag={this.onDrag.bind(this)}
                  onDragStop={this.onDragStop.bind(this)}
                  onResizeStart={this.onResizeStart.bind(this)}
                  onResize={this.onResize.bind(this)}
                  onResizeStop={this.onResizeStop.bind(this)}
                >
                  {_.map(eventInstanceList, this.createElement.bind(this))}
                </ReactGridLayout>
              </div>
            </div>

            {PickyDateTimeComponent}


            <div id="outer-dropzone" className={`${styles['dropzone']}`}>
             #outer-dropzone
             <div id="inner-dropzone" className={`${styles['dropzone']}`}>#inner-dropzone</div>
            </div>

            <span className="icon icon-chevron-right"></span>
            <span className="glyphicon glyphicon-minus"></span>
            {this.renderLabels()}
            <Input
              id="1"
              ref="1"
              value={value}
              type={`number`}
              style="borderless"
              className="underline"
              placeholder={`新增`}
              onChange={this.handleInputChange}
              onKeyDown={this.onKeyDown}
              validationOption={
                {
                  check: true,
                  type: `number`,
                  required: true,
                  showMsg: true,
                  name: `电话`,
                  msgOnSuccess: `valid value`,
                  msgOnError: `invalid value`,
                  max: 10,
                  min: 1,
                }
              }
            />
            <Select
              id="3"
              ref="3"
              value={days}
              option={option}
              style="borderless"
              className="underline"
              placeholder={`新增`}
              onChange={this.handleDaysSelectChange}
              validationOption={
                {
                  check: true,
                  required: true,
                  showMsg: true,
                  name: `日期`,
                  msgOnSuccess: `valid value`,
                  msgOnError: `invalid value`,
                }
              }
            />
            <Input
              id="2"
              ref="2"
              value={phone}
              type={`text`}
              style="borderless"
              className="underline"
              placeholder={`新增`}
              onChange={this.handlePhoneInputChange}
              onKeyDown={this.onPhoneKeyDown}
              validationOption={
                {
                  check: true,
                  type: `phone`,
                  required: true,
                  showMsg: true,
                  name: `电话`,
                  msgOnSuccess: `valid value`,
                  msgOnError: `invalid value`,
                  locale: 'zh-CN',
                }
              }
            />
          </div>
          <div className="section design" data-anchor="designs">
            design
          </div>
          <div className="section article" data-anchor="articles">
            <div className="title"><span className="text"></span><span className="icon icon-more"></span></div>
          </div>
          <div className="section contact" data-anchor="contacts">
            contacts
          </div>
          <div className="section fp-auto-height footer" data-anchor="footer">
            <div className="copyright al-center">Copyright © Edward Xiao</div>
          </div>
          <TimePicker
            onFocusChange={this.onFocusChange.bind(this)}
            onHourChange={this.onHourChange.bind(this)}
            onMinuteChange={this.onMinuteChange.bind(this)}
            onTimeChange={this.onTimeChange.bind(this)}
            onTimeQuantumChange={this.onTimeQuantumChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps() {
  return {
  };
}

Index.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);