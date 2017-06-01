// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { children, location } = this.props;
    return (
      <div className="page-transition">
        iiii
        <ReactCSSTransitionGroup
          component="div"
          // transitionName={ location.action == 'PUSH' ? 'forward' : 'backward' }
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {React.cloneElement(children, {
            key: location.pathname
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

Main.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
