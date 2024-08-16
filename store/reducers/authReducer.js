import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../../functions/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  exp: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:
          !isEmpty(action.payload) && !isEmpty(action.payload.user),
        user: !isEmpty(action.payload) ? action.payload.user : {},
        exp: !isEmpty(action.payload) ? action.payload.exp : 0,
      };
    default:
      return state;
  }
};
