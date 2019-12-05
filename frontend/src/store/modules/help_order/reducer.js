import produce from 'immer';

const INITIAL_STATE = {
  helpOrder: null,
  helpOrders: null,
};

export default function helporder(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@help_order/ANSWER_HELP_ORDER_SUCCESS': {
        draftState.helporder = action.payload.helporder;
        break;
      }

      case '@help_order/HELP_ORDERS_SUCCESS': {
        draftState.helpOrders = action.payload.helpOrders;
        break;
      }

      case '@help_order/NOT_ANSWERED_HELP_ORDERS_SUCCESS': {
        draftState.helpOrders = action.payload.helpOrders;
        break;
      }

      case '@help_order/ONE_HELP_ORDER_SUCCESS': {
        draftState.helpOrder = action.payload.helpOrder;
        break;
      }
      default:
    }
  });
}
