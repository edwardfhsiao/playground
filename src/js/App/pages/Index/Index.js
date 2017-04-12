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
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
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
// const timeList = getTimeTextList(HOUR_RANGE_24, 15);

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      times: 0,
      value: '',
      phone: '',
      days: '',
      showPickyDateTime: false,
      gridItem: ['a', 'b', 'c'],
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
    // this.initFullpage();
    // this.initD3();
    this.initInteract();
    // $('.intros').alertWhileClick('a');
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

  initInteract() {
    // let itemClass = styles['resize-drag'];
    // let dropzoneClass = styles['dropzone'];
    // console.log(interact(`.${styles['resize-drag']}`));


    function dragMoveListener (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    function resizemove (event) {
      // debugger;
      var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);
      console.log(`original width: ${target.style.width}`);
      console.log(`original height: ${target.style.height}`);
      // console.log(`original deltaRect left: ${event.deltaRect.left}`);
      // console.log(`original deltaRect top: ${event.deltaRect.top}`);

      if (event.edges.top && !event.edges.right && !event.edges.bottom && !event.edges.left){
        target.style.height = event.rect.height + 'px';
        y += event.deltaRect.top;
      }

      if (event.edges.right && !event.edges.bottom && !event.edges.left && !event.edges.top){
        target.style.width  = event.rect.width + 'px';
        x += event.deltaRect.left;
      }

      if (event.edges.bottom && !event.edges.left && !event.edges.top && !event.edges.right){
        target.style.height = event.rect.height + 'px';
        y += event.deltaRect.top;
      }

      if (event.edges.left && !event.edges.top && !event.edges.right && !event.edges.bottom){
        target.style.width  = event.rect.width + 'px';
        x += event.deltaRect.left;
      }

      if (event.edges.top && event.edges.right || event.edges.right && event.edges.bottom || event.edges.bottom && event.edges.left || event.edges.left && event.edges.top){
        target.style.height = event.rect.height + 'px';
        y += event.deltaRect.top;
        target.style.width  = event.rect.width + 'px';
        x += event.deltaRect.left;
      }

      // update the element's style
      // target.style.width  = event.rect.width + 'px';
      // target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      // x += event.deltaRect.left;
      // y += event.deltaRect.top;
      console.log(`after width: ${target.style.width}`);
      console.log(`after height: ${target.style.height}`);
      // console.log(`after deltaRect left: ${x}`);
      // console.log(`after deltaRect top: ${y}`);
      target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
    }


    interact(`.${styles['resize-drag']}`)
    .draggable({
      onmove: dragMoveListener,
      snap: {
        targets: [
          interact.createSnapGrid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      },
    })
    .resizable({
      preserveAspectRatio: true,
      edges: { left: true, right: true, bottom: true, top: true },
      snap: {
        targets: [
          interact.createSnapGrid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      },
    })
    .on('resizemove', resizemove);


    interact(`.${styles['dropzone']}`).dropzone({
      // only accept elements matching this CSS selector
      accept: `.${styles['resize-drag']}`,
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.75,

      // listen for drop related events:

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add(styles['drop-active']);
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add(styles['drop-target']);
        draggableElement.classList.add(styles['can-drop']);
        draggableElement.textContent = 'Dragged in';
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove(styles['drop-target']);
        event.relatedTarget.classList.remove(styles['can-drop']);
        event.relatedTarget.textContent = 'Dragged out';
      },
      ondrop: function (event) {
        event.relatedTarget.textContent = 'Dropped';
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove(styles['drop-active']);
        event.target.classList.remove(styles['drop-target']);
      }
    });
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
      gridItem,
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

    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: false},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    let gridItemHtml = gridItem.map((i, k) => {
      return (
        <div key={i} className={`${styles['grid-item']}`}>{i}</div>
      );
    });

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
              <div className={`${styles['dp-tbl-cel']} ${styles['timetable__time']}`}>
                <div className={`${styles['dp-tbl']}`}>
                  {timeColunmListHtml}
                </div>
              </div>
              <div className={`${styles['dp-tbl-cel']} ${styles['va-top']}`}>
                <ReactGridLayout
                  className="layout"
                  layout={layout}
                  cols={12}
                  rowHeight={10}
                  width={1200}
                >
                  {gridItemHtml}
                </ReactGridLayout>
              </div>
            </div>

            {PickyDateTimeComponent}
            <div className={resizeContainerClass}>
              <div className={resizeDragClass}>
                 Resize from any edge or corner
              </div>
            </div>

            <div className={`${styles['timetable']} `}>
              <div className={`${styles['grid']}`}>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周一</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周二</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周三</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周四</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周五</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周六</div>
                </div>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>周七</div>
                </div>
              </div>
              <div className={`${styles['grid']}`}>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>00:00</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
              </div>
              <div className={`${styles['grid']}`}>
                <div className={`${styles['col']} ${styles['title']}`}>
                  <div>01:00</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
                <div className={`${styles['col']}`}>
                  <div>&nbsp;</div>
                </div>
              </div>
            </div>

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