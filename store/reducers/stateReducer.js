import { SET_STATE_ID } from "../actions/types";

const initialState = {
  stateId: 0,
  stateName: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE_ID:
      return action.payload;
    default:
      return state;
  }
};
