import validator from 'validator';

const email = value => validator.isEmail(value);

const phone = (value, locale = 'zh-CN') => validator.isMobilePhone(value, locale);

const empty = value => validator.isEmpty(value);

const number = (value, min = 0, max = 9999) => validator.isInt(value, {
  min: parseInt(min),
  max: parseInt(max)
});

const url = value => validator.isURL(value);

const string = (value, min = 0, max = 9999) => validator.isByteLength(value, {
  min: parseInt(min),
  max: parseInt(max)
});

const textarea = (value, min = 0, max = 9999) => validator.isByteLength(value, {
  min: parseInt(min),
  max: parseInt(max)
});

export default {
  email,
  phone,
  empty,
  url,
  string,
  number,
  textarea,
}
