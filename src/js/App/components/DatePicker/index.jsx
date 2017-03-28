import React, { PropTypes } from 'react';

import Calendar from 'COMPONENTS/DatePicker/Calendar';
import STYLE from 'COMPONENTS/DatePicker/style.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={`${STYLE['lighty-date-picker']}`}>
        <Calendar />
      </div>
    );
  }
}

export default Index;