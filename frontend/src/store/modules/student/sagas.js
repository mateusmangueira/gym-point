import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  createStudentSuccess,
  createStudentFailure,
  loadAllStudentsSuccess,
  loadAllStudentsFailure,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './actions';

export function* createStudent({ payload }) {
  try {
    const response = yield call(api.post, '/students', payload);

    toast.success('Aluno criado com sucesso.');

    yield put(createStudentSuccess(response.data));

    history.push('/students');
  } catch (error) {
    toast.error('Houve algum problema ao criar aluno');
    yield put(createStudentFailure());
  }
}

export function* loadStudents({ payload }) {
  try {
    const { search } = payload;
    let response = null;

    if (search) {
      response = yield api.get(`students?q=${payload.search}`);
    } else {
      response = yield api.get('students');
    }

    if (response) {
      yield put(loadAllStudentsSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Você não possui alunos');
    } else {
      toast.error(
        'Houve erro no carregamento dos alunos, tente novamente mais tarde'
      );
    }
    yield put(loadAllStudentsFailure());
  }
}

export function* updateStudent({ payload }) {
  try {
    const { name, email, age, weight, height, id } = payload;

    const data = {
      name,
      email,
      age,
      weight,
      height,
    };

    const response = yield call(api.put, `/students/${id}`, data);
    toast.success('Aluno atualizado com sucesso.');

    yield put(updateStudentSuccess(response.data));

    history.push('/students');
  } catch (error) {
    toast.error('Houve algum erro ao atualizar aluno, verifique seus dados.');
    yield put(updateStudentFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.delete, `/students/${id}`);

    if (response) {
      toast.warn('Aluno deletado com sucesso.');
    } else {
      toast.error('Houve algum problema ao deletar o aluno');
    }

    yield put(deleteStudentSuccess(response.data));

    history.push('/students');
  } catch (error) {
    yield put(deleteStudentFailure());
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/LOAD_ALL_STUDENTS_REQUEST', loadStudents),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);
