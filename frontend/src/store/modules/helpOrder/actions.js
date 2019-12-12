export function answerHelpOrderRequest(answer, id) {
  return {
    type: '@helpOrder/ANSWER_HELP_ORDER_REQUEST',
    payload: { answer, id },
  };
}

export function answerHelpOrderSuccess(helpOrder) {
  return {
    type: '@helpOrder/ANSWER_HELP_ORDER_SUCCESS',
    payload: { helpOrder },
  };
}

export function answerHelpOrderFailure() {
  return {
    type: '@helpOrder/ANSWER_HELP_ORDER_FAILURE',
  };
}

export function loadAllHelpOrdersRequest() {
  return {
    type: '@helpOrder/LOAD_ALL_HELP_ORDERS_REQUEST',
  };
}

export function loadAllHelpOrdersSuccess(allhelpOrders) {
  return {
    type: '@helpOrder/LOAD_ALL_HELP_ORDERS_SUCCESS',
    payload: { allhelpOrders },
  };
}

export function loadAllHelpOrdersFailure() {
  return {
    type: '@helpOrder/LOAD_ALL_HELP_ORDERS_FAILURE',
  };
}

export function loadOneHelpOrderRequest(id) {
  return {
    type: '@helpOrder/LOAD_ONE_HELP_ORDER_REQUEST',
    payload: { id },
  };
}

export function loadOneHelpOrderSuccess(helpOrder) {
  return {
    type: '@helpOrder/LOAD_ONE_HELP_ORDER_SUCCESS',
    payload: { helpOrder },
  };
}

export function loadOneHelpOrderFailure() {
  return {
    type: '@helpOrder/LOAD_ONE_HELP_ORDER_FAILURE',
  };
}

export function loadAllNotAnsweredHelpOrdersRequest() {
  return {
    type: '@helpOrder/LOAD_ALL_NOT_ANSWERED_HELP_ORDERS_REQUEST',
  };
}

export function loadAllNotAnsweredHelpOrdersSuccess(allhelpOrders) {
  return {
    type: '@helpOrder/LOAD_ALL_NOT_ANSWERED_HELP_ORDERS_SUCCESS',
    payload: { allhelpOrders },
  };
}

export function loadAllNotAnsweredHelpOrdersFailure() {
  return {
    type: '@helpOrder/LOAD_ALL_NOT_ANSWERED_HELP_ORDERS_FAILURE',
  };
}
