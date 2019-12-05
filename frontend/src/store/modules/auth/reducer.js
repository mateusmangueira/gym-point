import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  name: '',
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draftState.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draftState.token = action.payload.token;
        draftState.name = action.payload.user.name;
        draftState.signed = true;
        draftState.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draftState.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draftState.token = null;
        draftState.signed = false;
        draftState.name = 'Deslogado';
        break;
      }
      default:
    }
  });
}
