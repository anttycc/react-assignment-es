
import { DOLOGIN, LOGIN_FAILED } from "../action.type";

const initialState = {

  auth: {
    user: {},
    error: {},
    isAuthenticated: false
  }

}
 const loginReducers=(state = initialState, action) => {
  switch (action.type) {
    case DOLOGIN:
      return Object.assign({}, state, { auth: { user: action.payload, isAuthenticated: true } });
    case LOGIN_FAILED:
      return Object.assign({}, state, { auth: { error: action.payload, isAuthenticated: false } });
    default:
      return state;
  }
}
export default loginReducers;