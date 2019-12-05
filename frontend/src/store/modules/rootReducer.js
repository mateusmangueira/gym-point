import { combineReducers } from 'redux';

import auth from './auth/reducer';
import enrollment from './enrollment/reducer';
import plan from './plan/reducer';
import student from './student/reducer';
import helporder from './help_order/reducer';

export default combineReducers({
  auth,
  enrollment,
  plan,
  student,
  helporder,
});
