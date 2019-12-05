export function answerHelpOrderRequest(answer, id) {
  return {
    type: '@help_order/ANSWER_HELP_ORDER_REQUEST',
    payload: { answer, id },
  };
}

export function answerHelpOrderSuccess(helpOrder) {
  return {
    type: '@help_order/ANSWER_HELP_ORDER_SUCCESS',
    payload: { helpOrder },
  };
}

export function answerHelpOrderFailure() {
  return {
    type: '@help_order/ANSWER_HELP_ORDER_FAILURE',
  };
}

export function helpOrdersRequest() {
  return {
    type: '@help_order/HELP_ORDERS_REQUEST',
  };
}

export function helpOrdersSuccess(helpOrders) {
  return {
    type: '@help_order/HELP_ORDERS_SUCCESS',
    payload: { helpOrders },
  };
}

export function helpOrdersFailure() {
  return {
    type: '@help_order/HELP_ORDERS_FAILURE',
  };
}

export function oneHelpOrderRequest(id) {
  return {
    type: '@help_order/ONE_HELP_ORDER_REQUEST',
    payload: { id },
  };
}

export function oneHelpOrderSuccess(helpOrder) {
  return {
    type: '@help_order/ONE_HELP_ORDER_SUCCESS',
    payload: { helpOrder },
  };
}

export function oneHelpOrderFailure() {
  return {
    type: '@help_order/ONE_HELP_ORDER_FAILURE',
  };
}

export function loadAllNotAnsweredHelpordersRequest() {
  return {
    type: '@help_order/NOT_ANSWERED_HELP_ORDERS_REQUEST',
  };
}

export function notAnsweredHelpOrdersSuccess(allHelpOrders) {
  return {
    type: '@help_order/NOT_ANSWERED_HELP_ORDERS_SUCCESS',
    payload: { allHelpOrders },
  };
}

export function notAnsweredHelpOrdersFailure() {
  return {
    type: '@help_order/NOT_ANSWERED_HELP_ORDERS_FAILURE',
  };
}
