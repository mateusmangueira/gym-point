import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import enrollment from './enrollment/sagas';
import help_order from './help_order/sagas';
import plan from './plan/sagas';
import student from './student/sagas';

export default function* rootSaga() {
  return yield all([auth, enrollment, help_order, plan, student]);
}
