import { SET_REDIRECT_TO } from "../actions/types";

const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REDIRECT_TO:
      return action.payload;
    default:
      return state;
  }
};
