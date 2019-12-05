import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  students: null,
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

      case '@student/ALL_STUDENTS_SUCCESS': {
        draftState.students = action.payload.students;
        break;
      }

      case '@student/DELETE_STUDENT_SUCCESS': {
        draftState.students = draftState.students.filter(item => {
          return item.id !== action.payload.id;
        });
        break;
      }
      default:
    }
  });
}
