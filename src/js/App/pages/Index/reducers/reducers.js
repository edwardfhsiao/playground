import * as ACTION from '../actions';
import { DEFAULT_STATE } from './ConstValue';

export function enterpriseList(enterpriseList = DEFAULT_STATE.enterpriseList, action) {
  switch (action.type) {
    case ACTION.SET_ENTERPRISE_LIST:
      return action.enterpriseList
    default:
      return enterpriseList;
  }
}