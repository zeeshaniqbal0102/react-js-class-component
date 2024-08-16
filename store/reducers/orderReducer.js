import { GET_INSTRUCTION } from "../actions/types";

const initialState = "";

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTRUCTION:
      return action.payload;
    default:
      return state;
  }
};
