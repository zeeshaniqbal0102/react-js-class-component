import { SET_SETTING } from "../actions/types";

const initialState = {
  showCart: false,
  showLogin: false,
  footerText: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTING:
      return {
        ...state,
        showCart: action.payload.showCart,
        showLogin: action.payload.showLogin,
        footerText: action.payload.footerText,
      };
    default:
      return state;
  }
};
