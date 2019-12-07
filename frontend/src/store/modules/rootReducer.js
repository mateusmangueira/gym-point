import { combineReducers } from 'redux';

import auth from './auth/reducer';
import enrollment from './enrollment/reducer';
import plan from './plan/reducer';
import student from './student/reducer';
import helpOrder from './helpOrder/reducer';

export default combineReducers({
  auth,
  enrollment,
  helpOrder,
  plan,
  student,
});
