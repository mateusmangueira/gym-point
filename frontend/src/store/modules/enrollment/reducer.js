import produce from 'immer';

const INITIAL_STATE = {
  enrollment: null,
  enrollments: [],
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@enrollment/CREATE_ENROLLMENT_SUCCESS': {
        draftState.enrollment = action.payload.enrollment;
        break;
      }

      case '@enrollment/UPDATE_ENROLLMENT_SUCCESS': {
        draftState.enrollment = action.payload.enrollment;
        break;
      }

      case '@enrollment/ALL_ENROLLMENTS_SUCCESS': {
        draftState.enrollments = action.payload.enrollments;
        break;
      }

      case '@enrollment/DELETE_ENROLLMENT_SUCCESS': {
        draftState.enrollments = draftState.enrollments.filter(item => {
          return item.id !== action.payload.id;
        });
        break;
      }
      default:
    }
  });
}
