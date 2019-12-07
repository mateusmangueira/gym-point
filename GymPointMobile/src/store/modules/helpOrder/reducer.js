import produce from 'immer';

const INITIAL_STATE = {
  allHelpOrders: [],
  loading: false,
  error: '',
};
export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case '@helpOrder/LOAD_HELP_ORDERS_REQUEST': {
        draftState.loading = true;
        break;
      }

      case '@helpOrder/LOAD_HELP_ORDERS_SUCCESS': {
        draftState.allHelpOrders = action.payload.allHelpOrders;
        draftState.loading = false;

        break;
      }

      case '@helpOrder/LOAD_HELP_ORDERS_FAILURE': {
        draftState.loading = false;
        break;
      }

      default:
    }
  });
}
