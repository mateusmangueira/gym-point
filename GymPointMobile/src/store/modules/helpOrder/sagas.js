import { Alert } from 'react-native';
import { takeLatest, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { loadHelpordersSuccess, loadHelpordersFailure } from './actions';

export function* loadHelporders({ payload }) {
  try {
    const { id } = payload;

    const response = yield api.get(`/students/${id}/help-orders`);

    if (response) {
      yield put(loadHelpordersSuccess(response.data));
    }
  } catch (error) {
    Alert.alert(
      'Falha ao carregar os pedidos de auxílio',
      'Não foi possível carregar os pedidos de auxílio.',
    );
    yield put(loadHelpordersFailure());
  }
}

export default all([
  takeLatest('@helpOrder/LOAD_HELP_ORDERS_REQUEST', loadHelporders),
]);
