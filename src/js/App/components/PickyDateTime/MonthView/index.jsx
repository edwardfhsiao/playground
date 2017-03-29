import React, { PropTypes } from 'react';
import assign from 'object-assign';
import moment from 'moment';

const getDaysInMonthView = (value, props) => {

  const { locale, dateFormat } = props
  const toMomentParam = { locale, dateFormat }

  const first = toMoment(value, toMomentParam).startOf('month')
  const beforeFirst = toMoment(value, toMomentParam).startOf('month').add(-1, 'days')

  const start = getWeekStartMoment(first, props)

  const result = []

  let i = 0

  if (
    beforeFirst.isBefore(start)
    // and it doesn't start with a full week before and the
    // week has at least 1 day from current month (default)
    &&
    (props.alwaysShowPrevWeek || !start.isSame(first))
  ) {
    start.add(-1, 'weeks')
  }

  for (; i < 42; i++) {
    result.push(toMoment(start, toMomentParam))
    start.add(1, 'days')
  }

  return result
}

class MonthView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      range: props.defaultRange,
      date: props.defaultDate,
      hoverRange: props.defaultHoverRange,
      activeDate: props.defaultActiveDate,
      viewDate: props.defaultViewDate
    }
  }

  renderDays(props, days) {
    const nodes = days.map((date) => this.renderDay(props, date))

    const len = days.length
    const buckets = []
    const bucketsLen = Math.ceil(len / 7)

    let i = 0
    let weekStart
    let weekEnd

    for (; i < bucketsLen; i++) {
      weekStart = i * 7
      weekEnd = (i + 1) * 7

      buckets.push(
        [
          props.weekNumbers && this.renderWeekNumber(props, days.slice(weekStart, weekEnd))
        ].concat(
          nodes.slice(weekStart, weekEnd)
        )
      )
    }

    return buckets.map((bucket, index) => <div
      key={`row_${index}`}
      className={`${this.bem('row')} dp-week dp-row`}
      children={bucket}
    />)
  }

  renderDay(props, dateMoment) {
    const dayText = FORMAT.day(dateMoment, props.dayFormat)

    const classes = [
      this.bem('cell'),
      this.bem('day'),
      'dp-cell dp-day'
    ]

    let renderDayProps = {
      day: dayText,
      dateMoment,
      timestamp: +dateMoment,

      key: dayText,
      className: classes.join(' '),
      children: dayText
    }

    if (typeof props.onRenderDay === 'function') {
      renderDayProps = props.onRenderDay(renderDayProps)
    }

    const renderFunction = props.renderDay || RENDER_DAY

    let result = renderFunction(renderDayProps)

    if (result === undefined) {
      result = RENDER_DAY(renderDayProps)
    }

    return result
  }

  prepareProps(thisProps) {
    const props = assign({}, thisProps)

    props.viewMoment = props.viewMoment || this.toMoment(props.viewDate)

    props.weekStartDay = getWeekStartDay(props)

    props.className = this.prepareClassName(props)

    return props
  }

  render() {
    const props = this.p = this.prepareProps(this.props)

    const { viewMoment } = props

    const daysInView = props.daysInView || getDaysInMonthView(viewMoment, props)
    return (
      <div>
      </div>
    );
  }
}

MonthView.propTypes = {
  navOnDateClick: PropTypes.bool,
  isDisabledDay: PropTypes.func,

  onChange: PropTypes.func,
  onViewDateChange: PropTypes.func,
  onActiveDateChange: PropTypes.func
};

MonthView.defaultProps = {
  defaultClassName: 'react-date-picker__month-view',
  dateFormat: 'YYYY-MM-DD',

  theme: 'default',

  onBlur: () => {},
  onFocus: () => {},

  footerClearDate: null,

  partialRange: true,

  activateOnHover: false,
  constrainActiveInView: false,

  showDaysBeforeMonth: true,
  showDaysAfterMonth: true,

  highlightWeekends: true,
  highlightToday: true,

  navOnDateClick: true,
  navigation: true,

  constrainViewDate: true,
  highlightRangeOnMouseMove: false,

  isDatePicker: true,

  enableHistoryView: true,
  focusOnNavMouseDown: true,
  focusOnFooterMouseDown: true
}

export default MonthView;