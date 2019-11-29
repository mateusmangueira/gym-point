import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
	const { email, password } = payload;

	const response = yield call(api.post, 'sessions', {
		email,
		password,
	});

	const { token, user } = response.data;

	yield put(signInSuccess(token, user));

	history.push('/students');
}

export function setToken({ payload }) {
	if (!payload) return;

	const { token } = payload.auth;

	if (token) {
		api.defaults.headers.Authorization = `Bearer ${token}`;
	}
}

export default all([
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
