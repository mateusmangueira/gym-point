export function createStudentRequest(name, email, age, weight, height) {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { name, email, age, weight, height },
  };
}

export function createStudentSuccess(student) {
  return {
    type: '@student/CREATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function loadAllStudentsRequest(search) {
  return {
    type: '@student/LOAD_ALL_STUDENTS_REQUEST',
    payload: { search },
  };
}

export function loadAllStudentsSuccess(allStudents) {
  return {
    type: '@student/LOAD_ALL_STUDENTS_SUCCESS',
    payload: { allStudents },
  };
}

export function loadAllStudentsFailure() {
  return {
    type: '@student/LOAD_ALL_STUDENTS_FAILURE',
  };
}

export function createStudentFailure() {
  return {
    type: '@student/CREATE_STUDENT_FAILURE',
  };
}

export function updateStudentRequest(name, email, age, weight, height, id) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { name, email, age, weight, height, id },
  };
}

export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}

export function deleteStudentRequest(id) {
  return {
    type: '@student/DELETE_STUDENT_REQUEST',
    payload: { id },
  };
}

export function deleteStudentSuccess(id) {
  return {
    type: '@student/DELETE_STUDENT_SUCCESS',
    payload: { id },
  };
}

export function deleteStudentFailure() {
  return {
    type: '@student/DELETE_STUDENT_FAILURE',
  };
}
