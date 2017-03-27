import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './label.css';

class Label extends React.Component {

  shouldComponentUpdate(nextProps) {
    const { active, clickable } = this.props;
    return active !== nextProps.active || clickable !== nextProps.clickable;
  }

  render() {
    const { style, value, onClick, id, clickable, active } = this.props;
    const labelClass = cx(
      styles["label"],
      !active && clickable && styles["clickable"],
      active && styles["active"]
    );
    return (
      <div
        style={style}
        onClick={() => onClick(id)}
        className={labelClass}>
        {value}
      </div>
    )
  }
}

Label.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  active: PropTypes.bool,
};

Label.defaultProps = {
  style: {},
  value: '',
  id: '',
  clickable: true,
  active: false,
  onClick: () => {}
};

export default Label;
