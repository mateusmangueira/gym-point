export function createCheckinRequest(id) {
  return {
    type: '@checkIn/CREATE_CHECKIN_REQUEST',
    payload: { id },
  };
}

export function createCheckinSuccess(numberCheckins) {
  return {
    type: '@checkIn/CREATE_CHECKIN_SUCCESS',
    payload: { numberCheckins },
  };
}

export function createCheckinFailure() {
  return {
    type: '@checkIn/CREATE_CHECKIN_FAILURE',
  };
}


export function loadCheckingsRequest(id) {
  return {
    type: '@checkIn/LOAD_CHECKINS_REQUEST',
    payload: { id },
  };
}

export function loadCheckingsSuccess({ allCheckins, numberCheckins }) {
  return {
    type: '@checkIn/LOAD_CHECKINS_SUCCESS',
    payload: { allCheckins, numberCheckins },
  };
}

export function loadCheckingsFailure() {
  return {
    type: '@checkIn/LOAD_CHECKINS_FAILURE',
  };
}
