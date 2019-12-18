import produce from 'immer';

const INITIAL_STATE = {
  enrollment: null,
  allEnrollments: null,
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

      case '@enrollment/LOAD_ALL_ENROLLMENTS_SUCCESS': {
        draftState.allEnrollments = action.payload.allEnrollments;
        break;
      }

      case '@enrollment/DELETE_ENROLLMENT_SUCCESS': {
        draftState.allEnrollments = draftState.allEnrollments.filter(item => {
          return item.id !== action.payload.id;
        });
        break;
      }
      default:
    }
  });
}
