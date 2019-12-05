import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
  allPlans: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draftState => {
    switch (action.type) {
      case '@plan/CREATE_PLAN_SUCCESS': {
        draftState.plan = action.payload.plan;
        break;
      }

      case '@plan/UPDATE_PLAN_SUCCESS': {
        draftState.plan = action.payload.plan;
        break;
      }

      case '@plan/DELETE_PLAN_SUCCESS': {
        draftState.allPlans = draftState.allPlans.filter(item => {
          return item.id !== action.payload.id;
        });
        break;
      }
      default:
    }
  });
}
