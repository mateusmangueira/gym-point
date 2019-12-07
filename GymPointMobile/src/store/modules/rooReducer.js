import { combineReducers } from 'redux';

import checkIn from './checkIn/reducer';
import helpOrder from './helpOrder/reducer';


export default combineReducers({
  checkIn,
  helpOrder,
});
