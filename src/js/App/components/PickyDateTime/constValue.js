const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const SELECTOR_YEAR_SET_NUMBER = 5;

const SIZE_RANGE = ['l', 'm', 's', 'xs'];
const LOCALE_RANGE = ['en-us', 'zh-cn'];

const DEFAULT_LACALE = 'en-us';
const DEFAULT_SIZE = 'm';

const WEEK_NAME = {
  'en-us': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'zh-cn': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
}

const MONTH_NAME = {
  'en-us': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'zh-cn': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
}

const LANG = {
  'en-us': {
    'today': 'Today',
    'reset': 'Reset',
    'clear': 'Clear',
  },
  'zh-cn': {
    'today': '今天',
    'reset': '重置',
    'clear': '清零',
  },
}

const POINTER_ROTATE = 0;

const WEEK_NUMBER = 7;

const getDaysArray = (year, month, locale = 'zh-cn') => {
  let prevMonth;
  let nextMonth;
  let prevYear;
  let nextYear;
  if (month == 12) {
    prevMonth = 11;
    nextMonth = 1;
    prevYear = year - 1;
    nextYear = year + 1;
  } else if (month == 1) {
    prevMonth = 12;
    nextMonth = 2;
    prevYear = year - 1;
    nextYear = year + 1;
  } else {
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
    for (let i = prevMonthDate.length - startOffset; i <= prevMonthDate.length - 1; i++) {
      res.push(prevMonthDate[i]);
    }
  }

  thisMonthDate = getDaysListByMonth(year, month, names, locale);
  res = [...res, ...thisMonthDate];

  let endOffset = WEEK_NUMBER - thisMonthDate[thisMonthDate.length - 1].day - 1;
  if (endOffset != 0) {
    nextMonthDate = getDaysListByMonth(nextYear, nextMonth, names, locale);
    for (let i = 0; i <= endOffset - 1; i++) {
      res.push(nextMonthDate[i]);
    }
  }

  return res;
}

const getDaysListByMonth = (year, month, names, locale = 'zh-cn') => {
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

const getYearSet = (year) => {
  let res = [];
  let prevYears = [];
  let itemNumber;
  let startOffset;
  let endOffset;
  if (SELECTOR_YEAR_SET_NUMBER % 2 == 1) {
    itemNumber = (SELECTOR_YEAR_SET_NUMBER - 1) / 2 + 1;
    startOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;
  } else {
    itemNumber = (SELECTOR_YEAR_SET_NUMBER / 2) - 1;
    startOffset = itemNumber - 1;
  }

  endOffset = SELECTOR_YEAR_SET_NUMBER - itemNumber;

  for (let i = year - startOffset; i <= year - 1; i++) {
    res.push(i);
  }
  res.push(year);
  for (let i = 0; i <= endOffset - 1; i++) {
    year = year + 1;
    res.push(year);
  }
  return res;
}

export {
  PREV_TRANSITION,
  NEXT_TRANSITION,
  SELECTOR_YEAR_SET_NUMBER,
  WEEK_NAME,
  MONTH_NAME,
  LANG,
  WEEK_NUMBER,
  POINTER_ROTATE,
  SIZE_RANGE,
  LOCALE_RANGE,
  DEFAULT_LACALE,
  DEFAULT_SIZE,
  getDaysArray,
  getDaysListByMonth,
  getYearSet,
}
