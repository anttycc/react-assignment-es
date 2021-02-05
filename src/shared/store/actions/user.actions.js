
import { GET_USERS, ADD_USER, EDIT_USER, DELETE_USER, LOGIN_FAILED, UPDATE_PAGINATION, GET_USER } from "../action.type";
import { httpService } from "../../../helpers/http-service";
import { history } from "../store";

export const addUser = (payload) => {
    return (dispatch) => {
        return httpService.postRequest('users', payload)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return dispatch({ type: ADD_USER, payload: response });
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

export const getUsers = (payload) => {

    return (dispatch, getState) => {
        const { user } = getState();
        if (!payload) {
            payload = user;
        }

        let url = `users?page=${(payload.page || 1)}&per_page=${payload.per_page || 10}`;
        if (payload.sort_name) {
            url = `${url}&sort_name=${payload.sort_name}`;
        }
        if (payload.sort_order) {
            url = `${url}&sort_order=${payload.sort_order}`;
        }
        if (payload.search_text) {
            url = `${url}&search_text=${payload.search_text}`;
        }
        return httpService.getRequest(url)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                dispatch({ type: GET_USER, payload: { data: null } });
                return dispatch({ type: GET_USERS, payload: response });
            })

            .catch(error => {
                dispatch({ type: LOGIN_FAILED, payload: { message: error.message } });
                alert(error.message);

            })
    }
}
export const getUser = (payload) => {

    return (dispatch) => {

        let url = `users/${payload}`;

        return httpService.getRequest(url)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return dispatch({ type: GET_USER, payload: response });
            })
            .then(() => {

            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILED, payload: { message: error.message } });
                alert(error.message);

            })
    }
}

export const editUser = (payload) => {

    return (dispatch) => {
        return httpService.putRequest(`users/${payload.id}`, payload)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return dispatch({ type: EDIT_USER, payload: response });
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

export const deleteUser = (payload) => {
    return (dispatch) => {
        return httpService.deleteRequest(`users/${payload}`)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return dispatch({ type: DELETE_USER, payload: payload });
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

export const register = (payload) => {
    return (dispatch) => {
        return httpService.postRequest('register', payload)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return response;
            })
            .then(() => {
                history.push('/login');

            })
            .catch(error => {
                dispatch({ type: LOGIN_FAILED, payload: { message: error.message } });
                alert(error.message);

            })
    }
}
export const updatePagination = (payload) => {
    return (dispatch) => {

        dispatch(getUsers(payload))
        dispatch({
            type: UPDATE_PAGINATION, payload
        })
    }
}