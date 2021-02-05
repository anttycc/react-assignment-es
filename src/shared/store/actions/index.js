import { addUser, deleteUser, editUser, getUsers, register, updatePagination,getUser } from "./user.actions";
import { doLogin, doLogout } from "./login.actions";


export const actions = {
    addUser, deleteUser, editUser, getUsers, doLogin, doLogout, register, updatePagination,getUser
}
