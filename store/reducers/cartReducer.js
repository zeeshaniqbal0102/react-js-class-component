// import {ADD_TO_STATE_CART}  from "../actions/types";

const initialState = {
  products: [],
  order: [],
  cart: [],
  // cart: {},
  product: {},
};

const user_shop = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_STATE_CART":
      return {
        ...state,
        // cart: action.payload
        cart: [action.payload, ...state.cart],
      };
    default:
      return state;
  }
};

export default user_shop;
