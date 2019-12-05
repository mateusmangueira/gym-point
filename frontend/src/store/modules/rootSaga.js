import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import enrollment from './enrollment/sagas';
import plan from './plan/sagas';
import student from './student/sagas';
import help_order from './help_order/sagas';

export default function* rootSaga() {
  return yield all([auth, enrollment, plan, student, help_order]);
}
