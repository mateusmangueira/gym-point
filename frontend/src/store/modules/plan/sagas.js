import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  createPlanSuccess,
  createPlanFailure,
  updatePlanSuccess,
  updatePlanFailure,
  deletePlanSuccess,
  deletePlanFailure,
} from './actions';

export function* createPlan({ payload }) {
  try {
    const response = yield call(api.post, '/plans', payload);

    toast.success(`Plano ${payload.title} criado com sucesso.`);

    yield put(createPlanSuccess(response.data));

    history.push('/plans');
  } catch (error) {
    toast.error('Houve um erro ao cadastrar o plano, verifique os dados');
    yield put(createPlanFailure());
  }
}

export function* updatePlan({ payload }) {
  try {
    const { title, duration, price, id } = payload;

    const data = {
      title,
      duration,
      price,
    };

    const response = yield call(api.put, `/plans/${id}`, data);
    toast.success('Plano atualizado com sucesso.');

    yield put(updatePlanSuccess(response.data));

    history.push('/plans');
  } catch (error) {
    toast.error('Houve um erro ao atualizar o plano, verifique os dados.');
    yield put(updatePlanFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/plans/${id}`);
    yield put(deletePlanSuccess(id));

    toast.warn('Plano deletado com sucesso.');
    history.push('/plans');
  } catch (error) {
    toast.error('Houve um erro ao deletar o plano, tente novamente.');
    yield put(deletePlanFailure());
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deletePlan),
]);
