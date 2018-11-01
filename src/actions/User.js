import axios from 'axios';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from "../constants/ActionsTypes";
import storeConfig from '../store';

// const apiUrl = 'http://localhost:3000';
const apiUrl = 'http://192.168.1.138:3000';
const { persistor } = storeConfig();

export const login = formData => {
    console.log('in login');
    console.log(formData);

    return dispatch => new Promise((resolve, reject) => {
        dispatch(loginRequest(formData));

        axios.post(`${apiUrl}/users/login`, formData)
            .then(resp => {
                console.log(resp);
                const { data = {} } = resp;
                const { user, token } = data;
                //TODO: need to persist
                // localStorage.setItem('user', JSON.stringify(user));
                // localStorage.setItem('token', token);
                resolve(dispatch(loginSuccess({ user, token })))
                // resolve(dispatch({type: SET_USER, payload: user}))
            })
            .catch(e => {
                console.log(e.response);
                const { response = {} } = e;
                const { data = {message: 'Could not log in'} } = response;
                dispatch(loginFailure(data.message));
                reject(data.message)
            })
    });
};

export function logout() {
    console.log('logging user out');
    return dispatch => new Promise((resolve, reject) => {
        persistor.purge().then(() => {
            resolve(dispatch({type: LOGOUT}))
        });
    })
}

export const loginRequest = creds => ({type: LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds});

export const loginSuccess = data => ({type: LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, token: data.token, user: data.user });

export const loginFailure = message => ({type: LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message });