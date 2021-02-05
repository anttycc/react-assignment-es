import { DOLOGIN, LOGIN_FAILED, LOGOUT } from "../action.type";
import { httpService } from '../../../helpers/http-service';
import { history } from "../store";


export const doLogin = (payload) => {
    return (dispatch) => {
        return httpService.postRequest('login', payload)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return dispatch({ type: DOLOGIN, payload: response });
            })
            .then(() => {
                history.push('/users-list');
            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILED, payload: { message: error.message } });
                alert(error.message);

            })
    }
}
export const doLogout = () => {
    history.push('/login');
    return ({
        type: LOGOUT,
    });
}

