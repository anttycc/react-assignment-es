import { combineReducers } from "redux";
import userReducer from "./user.reduces";
import loginReduces from "./login.reducer";
import { reducer as formReducer } from 'redux-form';
import { LOGOUT } from "../action.type";
const appReducer = combineReducers({ user: userReducer, login: loginReduces, form: formReducer });
const createRootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {}
  }
  return appReducer(state, action);
};

export default createRootReducer;

