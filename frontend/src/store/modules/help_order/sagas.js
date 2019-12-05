import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  answerHelpOrderSuccess,
  answerHelpOrderFailure,
  helpOrdersSuccess,
  helpOrdersFailure,
  oneHelpOrderSuccess,
  oneHelpOrderFailure,
} from './actions';

export function* answerOrder({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `/help-orders/${id}/answer`, {
      id,
      answer_at: new Date(),
    });

    if (response) {
      toast.success('Pedido de auxílio respondido com sucesso.');
      yield put(answerHelpOrderSuccess(response.data));
    }
  } catch (error) {
    toast.error('Houve um erro no resposta do pedido.');
    yield put(answerHelpOrderFailure());
  }
}

export function* handleHelpOrders() {
  try {
    const response = yield api.get('help-orders');
    if (response) {
      yield put(helpOrdersSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Não existem pedidos de auxílio');
    } else {
      toast.error(
        'Houve um erro no carregamento dos pedidos de auxílio, tente novamente mais'
      );
    }
    yield put(helpOrdersFailure());
  }
}

export function* handleOneHelpOrder({ payload }) {
  try {
    const { id } = payload;
    const response = yield api.get(`help-orders/${id}`);
    if (response) {
      yield put(oneHelpOrderSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Não existe pedido de auxílio');
    } else {
      toast.error('Houve um erro no pedido de auxílio');
    }
    yield put(oneHelpOrderFailure());
  }
}

export default all([
  takeLatest('@help_order/ANSWER_HELP_ORDER_REQUEST', answerOrder),
  takeLatest('@help_order/HELP_ORDERS_REQUEST', handleHelpOrders),
  takeLatest('@help_order/ONE_HELPORDER_REQUEST', handleOneHelpOrder),
]);
