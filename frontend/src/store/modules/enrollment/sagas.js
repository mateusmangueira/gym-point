import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { isBefore, setHours, setMinutes } from 'date-fns';

import api from '../../../services/api';
import history from '../../../services/history';

import {
  createEnrollmentSuccess,
  createEnrollmentFailure,
  updateEnrollmentSuccess,
  updateEnrollmentFailure,
  handleEnrollmentSuccess,
  handleEnrollmentFailure,
  deleteEnrollmentSuccess,
  deleteEnrollmentFailure,
} from './actions';

export function* createEnrollment({ payload }) {
  try {
    const { start_date } = payload;

    if (isBefore(start_date, setMinutes(setHours(new Date(), 0), 0))) {
      toast.error('Data de matrícula precisa ser maior que a atual');
      return;
    }

    const response = yield call(api.post, '/enrolls', payload);

    toast.success('Matrícula efetuada com sucesso.');

    yield put(createEnrollmentSuccess(response.data));

    history.push('/enrollments');
  } catch (error) {
    toast.error('Houve um erro na matrícula, verifique os dados');
    yield put(createEnrollmentFailure());
  }
}

export function* updateEnrollment({ payload }) {
  try {
    const { student_id, plan_id, start_date, id } = payload;

    if (isBefore(start_date, setMinutes(setHours(new Date(), 0), 0))) {
      toast.error('Data de matrícula precisa ser maior que a atual');
      return;
    }

    const enrollment = {
      student_id,
      plan_id,
      start_date,
    };

    const response = yield call(api.put, `/enrolls/${id}`, enrollment);
    toast.success('Matrícula atualizada com sucesso.');

    yield put(updateEnrollmentSuccess(response.data));

    history.push('/enrollments');
  } catch (error) {
    toast.error(
      'Houve um erro na atualização da matrícula, verifique os dados'
    );
    yield put(updateEnrollmentFailure());
  }
}

export function* deleteEnrollment({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/enrolls/${id}`);

    yield put(deleteEnrollmentSuccess(id));
    toast.warn('Matrícula deletada com sucesso.');
    history.push('/enrollments');
  } catch (error) {
    toast.error('Houve um erro em deletar a matrícula');
    yield put(deleteEnrollmentFailure());
  }
}

export function* handleEnrollments({ payload }) {
  try {
    let response = [];
    const { page } = payload;

    if (page) {
      response = yield api.get('enrollments', {
        params: {
          page,
        },
      });
    } else {
      response = yield api.get('enrollments');
    }

    if (response) {
      yield put(handleEnrollmentSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Não existem matrículas cadastradas.');
    } else {
      toast.error('Houve um erro ao carregar as matrículas');
    }
    yield put(handleEnrollmentFailure());
  }
}

export default all([
  takeLatest('@enrollment/CREATE_ENROLLMENT_REQUEST', createEnrollment),
  takeLatest('@registration/UPDATE_ENROLLMENT_REQUEST', updateEnrollment),
  takeLatest('@registration/ALL_ENROLLMENTS_REQUEST', handleEnrollments),
  takeLatest('@registration/DELETE_ENROLLMENT_REQUEST', deleteEnrollment),
]);
