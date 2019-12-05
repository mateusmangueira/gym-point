import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import {
  createStudentSuccess,
  createStudentFailure,
  updateStudentSuccess,
  updateStudentFailure,
  handleStudentsSuccess,
  handleStudentsFailure,
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

export function* handleStudents({ payload }) {
  try {
    const { search, page } = payload;
    let response = null;

    if (page) {
      response = yield api.get('students', {
        params: {
          page,
        },
      });
    } else if (search) {
      response = yield api.get(`students?q=${payload.search}`);
    } else {
      response = yield api.get('students');
    }

    if (response) {
      yield put(handleStudentsSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.warn('Você possui nenhum aluno');
    } else {
      toast.error('Houve algum erro ao carregar os alunos');
    }
    yield put(handleStudentsFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/students`, {
      headers: { id },
    });

    yield put(deleteStudentSuccess(id));
    toast.warn('Aluno deletado.');
    history.push('/students');
  } catch (error) {
    toast.error('Houve algum erro ao deleta o aluno');
    yield put(deleteStudentFailure());
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/LOAD_ALL_STUDENTS_REQUEST', handleStudents),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);
