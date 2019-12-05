export function createEnrollmentRequest(student_id, plan_id, start_date) {
  return {
    type: '@enrollment/CREATE_ENROLLMENT_REQUEST',
    payload: { student_id, plan_id, start_date },
  };
}

export function createEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/CREATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function createEnrollmentFailure() {
  return {
    type: '@enrollment/CREATE_ENROLLMENT_FAILURE',
  };
}

export function updateEnrollmentRequest(student_id, plan_id, start_date, id) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_REQUEST',
    payload: { student_id, plan_id, start_date, id },
  };
}

export function updateEnrollmentSuccess(enrollment) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function updateEnrollmentFailure() {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT_FAILURE',
  };
}

export function handleEnrollmentRequest(page) {
  return {
    type: '@enrollment/ALL_ENROLLMENTS_REQUEST',
    payload: { page },
  };
}

export function handleEnrollmentSuccess(enrollments) {
  return {
    type: '@enrollment/ALL_ENROLLMENTS_SUCCESS',
    payload: { enrollments },
  };
}

export function handleEnrollmentFailure() {
  return {
    type: '@enrollment/ALL_ENROLLMENTS_FAILURE',
  };
}

export function deleteEnrollmentRequest(id) {
  return {
    type: '@enrollment/DELETE_ENROLLMENT_REQUEST',
    payload: { id },
  };
}

export function deleteEnrollmentSuccess(id) {
  return {
    type: '@enrollment/DELETE_ENROLLMENT_SUCCESS',
    payload: { id },
  };
}

export function deleteEnrollmentFailure() {
  return {
    type: '@enrollment/DELETE_ENROLLMENT_FAILURE',
  };
}
