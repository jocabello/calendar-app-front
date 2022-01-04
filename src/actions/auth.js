import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventClean } from "./events";


export const startLogin = (email, password) => {
    return async(dispatch) => {

        const response = await fetchWithoutToken('auth', {email, password}, 'POST');

        const body = await response.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const response = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');

        const body = await response.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {

        const response = await fetchWithToken('auth/renew');

        const body = await response.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            dispatch(checkingFinish());
        }
    }
}

export const startLogout = () => {
    return (dispatch) =>{
        localStorage.clear();
        dispatch(logout());
        dispatch(eventClean());
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const logout = () => ({
    type: types.authLogout
})