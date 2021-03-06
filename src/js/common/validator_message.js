import validator from 'validator';

const email = value => validator.isEmail(value);

const phone = value => validator.isMobilePhone(value, 'zh-CN');

const empty = value => validator.isEmpty(value);

const number = '不是数字';

const url = value => validator.isURL(value);

const string = value => validator.isByteLength(value, {
  min: 1,
  max: 200
});

const textarea = (value, max) => validator.isByteLength(value, {
  min: 0,
  max: parseInt(max)
});

export default {
  email,
  phone,
  url,
  string,
  number,
  textarea
}
