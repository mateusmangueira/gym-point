import { all } from 'redux-saga/effects';

import checkIn from './checkIn/sagas';
import helpOrder from './helpOrder/sagas';

export default function* rootSaga() {
  return yield all([checkIn, helpOrder]);
}
