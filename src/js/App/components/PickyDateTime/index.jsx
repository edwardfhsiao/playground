import React, { PropTypes } from 'react';

import Calendar from 'COMPONENTS/PickyDateTime/Calendar';
import STYLE from 'COMPONENTS/PickyDateTime/style.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onDateSelect(year, month, date){
    this.props.onDateSelect(year, month, date);
  }
  render() {
    return (
      <div className={`${STYLE['picky-date-time']}`}>
        <Calendar
          onDateSelect={this.onDateSelect.bind(this)}
        />
      </div>
    );
  }
}

Index.propTypes = {
  disabled: PropTypes.bool,

};

Index.defaultProps = {
  onDateSelect: () => {},
}

export default Index;