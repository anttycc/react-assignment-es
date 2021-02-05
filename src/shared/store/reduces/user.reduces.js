import { GET_USERS, EDIT_USER, ADD_USER, DELETE_USER, UPDATE_PAGINATION, GET_USER } from "../action.type";


const initialState = {
    data: [],
    page: 1,
    per_page: 10,
    total: 12,
    total_pages: 2,
    selectedUser: {}

}
const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, { ...state, selectedUser: action.payload.data });
        case GET_USERS:
            return Object.assign({}, state, action.payload);
        case UPDATE_PAGINATION:
            return Object.assign({}, state, { ...action.payload, data: state.data });
        case EDIT_USER:
            return Object.assign({}, state, { data: state.data.map((user) => user.id === parseInt(action.payload.id) ? { ...action.payload } : user) })
        case ADD_USER:
            action.payload.id = ((state.data[state.data.length - 1] || {}).id || 0) + 1;
            return Object.assign({}, state, { data: [action.payload, ...state.data.slice(1, state.per_page-1)] })
        case DELETE_USER:
            return Object.assign({}, state, { data: state.data.filter((user) => user.id !== action.payload) })
        default:
            return state;
    }

}
export default userReducers;