import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import enrollment from './enrollment/sagas';
import helpOrder from './helpOrder/sagas';
import plan from './plan/sagas';
import student from './student/sagas';

export default function* rootSaga() {
  return yield all([auth, enrollment, helpOrder, plan, student]);
}
