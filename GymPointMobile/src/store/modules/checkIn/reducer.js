import produce from 'immer';

const INITIAL_STATE = {
  allCheckins: [],
  numberCheckins: null,
  loading: false,
  error: '',
};
export default function checkIn(state = INITIAL_STATE, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case '@checkIn/CREATE_CHECKIN_SUCCESS': {
        draftState.numberCheckins = action.payload.numberCheckins;
        break;
      }
      case '@checkIn/LOAD_CHECKINS_REQUEST': {
        draftState.loading = true;
        break;
      }
      case '@checkIn/LOAD_CHECKINS_SUCCESS': {
        draftState.allCheckins = action.payload.allCheckins;
        draftState.numberCheckins = action.payload.numberCheckins;
        draftState.loading = false;
        break;
      }
      case '@checkIn/LOAD_CHECKINS_FAILURE': {
        draftState.loading = false;
        break;
      }
      default:
    }
  });
}
