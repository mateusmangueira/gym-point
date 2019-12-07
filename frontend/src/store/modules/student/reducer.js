import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  allStudents: [],
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@student/CREATE_STUDENT_SUCCESS': {
        draftState.student = action.payload.student;
        break;
      }

      case '@student/UPDATE_STUDENT_SUCCESS': {
        draftState.student = action.payload.student;
        break;
      }

      case '@student/LOAD_ALL_STUDENTS_SUCCESS': {
        draftState.allStudents = action.payload.allStudents;
        break;
      }

      case '@student/DELETE_STUDENT_SUCCESS': {
        draftState.allStudents = draftState.allStudents.filter(item => {
          return item.id !== action.payload.id;
        });
        break;
      }
      default:
    }
  });
}
