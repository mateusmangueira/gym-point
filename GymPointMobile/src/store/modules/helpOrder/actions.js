export function loadHelpordersRequest(id) {
  return {
    type: '@helpOrder/LOAD_HELP_ORDERS_REQUEST',
    payload: { id },
  };
}
export function loadHelpordersSuccess(allHelpOrders) {
  return {
    type: '@helpOrder/LOAD_HELP_ORDERS_SUCCESS',
    payload: { allHelpOrders },
  };
}
export function loadHelpordersFailure() {
  return {
    type: '@helpOrder/LOAD_HELP_ORDERS_FAILURE',
  };
}
