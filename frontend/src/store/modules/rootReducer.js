import { combineReducers } from 'redux';

import auth from './auth/reducer';
import enrollment from './enrollment/reducer';
import plan from './plan/reducer';
import student from './student/reducer';
import help_order from './help_order/reducer';

export default combineReducers({
  auth,
  enrollment,
  help_order,
  plan,
  student,
});
