import { SET_AGE_VERIFICATION } from "../actions/types";

const initialState = {
  verified: false,
  eligible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AGE_VERIFICATION:
      return {
        ...state,
        verified: action.payload.verified,
        eligible: action.payload.eligible,
      };
    default:
      return state;
  }
};
