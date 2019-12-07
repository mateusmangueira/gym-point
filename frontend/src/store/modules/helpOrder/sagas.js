import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  answerHelpOrderSuccess,
  answerHelpOrderFailure,
  loadAllHelpOrdersSuccess,
  loadAllHelpOrdersFailure,
  loadOneHelpOrderSuccess,
  loadOneHelpOrderFailure,
} from './actions';

export function* answerOrder({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `/help-orders/${id}/answer`, payload);

    toast.success('Resposta criada com sucesso.');

    yield put(answerHelpOrderSuccess(response.data));
  } catch (error) {
    toast.error('Houve um erro ao criar resposta, tente novamente mais tarde.');
    yield put(answerHelpOrderFailure());
  }
}

export function* loadHelpOrders() {
  try {
    const response = yield api.get('help-orders');
    if (response) {
      yield put(loadAllHelpOrdersSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Não existem pedidos de auxílio criados');
    } else {
      toast.error(
        `Erro na requisição de pedidos de auxílio: ${error.response.data.error}`
      );
    }
    yield put(loadAllHelpOrdersFailure());
  }
}

export function* loadOneHelpOrder({ payload }) {
  try {
    const { id } = payload;
    const response = yield api.get(`help-orders/${id}`);
    if (response) {
      yield put(loadOneHelpOrderSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Não existe pedido de auxílio');
    } else {
      toast.error(
        `Erro na requisição do pedido de auxílio: ${error.response.data.error}`
      );
    }
    yield put(loadOneHelpOrderFailure());
  }
}

export default all([
  takeLatest('@helpOrder/ANSWER_HELP_ORDER_REQUEST', answerOrder),
  takeLatest('@helpOrder/LOAD_ALL_HELP_ORDERS_REQUEST', loadHelpOrders),
  takeLatest('@helpOrder/ONE_HELP_ORDER_REQUEST', loadOneHelpOrder),
]);
