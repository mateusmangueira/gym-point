import produce from 'immer';

const INITIAL_STATE = {
  helpOrder: null,
  allHelpOrders: null,
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@helpOrder/ANSWER_HELP_ORDER_SUCCESS': {
        draftState.helpOrder = action.payload.helpOrder;
        break;
      }

      case '@helpOrder/LOAD_ALL_HELP_ORDERS_SUCCESS': {
        draftState.allHelpOrders = action.payload.allHelpOrders;
        break;
      }

      case '@helpOrder/LOAD_ALL_NOT_ANSWERED_HELP_ORDERS_SUCCESS': {
        draftState.allHelpOrders = action.payload.allHelpOrders;
        break;
      }

      case '@helpOrder/LOAD_ONE_HELP_ORDER_SUCCESS': {
        draftState.helpOrder = action.payload.helpOrder;
        break;
      }
      default:
    }
  });
}
