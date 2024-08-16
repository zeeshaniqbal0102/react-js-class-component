import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import ageReducer from "./ageReducer";
import stateReducer from "./stateReducer";
import redirectToReducer from "./redirectToReducer";
import settingReducer from "./settingReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cart: cartReducer,
  instruction: orderReducer,
  age: ageReducer,
  redirectTo: redirectToReducer,
  usState: stateReducer,
  setting: settingReducer,
});
