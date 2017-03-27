import React, { Component } from 'react';
import { connect } from 'react-redux';
import Utils from 'COMMON/utils';
import Input from 'COMPONENTS/Input';
import Label from 'COMPONENTS/Label';
import interact from 'interact.js';
// import '../../../my_plugins/my_test';
import cx from 'classnames';
import styles from './styles/index.css';
import Shake from 'shake.js';
import 'fullpage.js/dist/jquery.fullpage.js';
import 'fullpage.js/dist/jquery.fullpage.min.css';
import * as d3 from 'd3';
 let myShakeEvent = new Shake({
    threshold: 5, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      times: 0,
      value: '',
      phone: '',
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPhoneKeyDown = this.onPhoneKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePhoneInputChange = this.handlePhoneInputChange.bind(this);
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
    } = this.state;
    // let styles = {};
    // console.log(styles);
    // console.log(styles['icon']);
    // console.log(styles['icon-chevron-right']);
    return(
      <div className="">
        <div id="fullpage">
          <div className="section intros" data-anchor="intros">

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