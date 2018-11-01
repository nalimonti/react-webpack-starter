import axios from 'axios';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from "../constants/ActionsTypes";

const apiUrl = 'http://localhost:3000';

export const login = formData => {
    console.log('in login');
    console.log(formData);
    return dispatch => {
        dispatch(loginRequest(formData));

        return new Promise((resolve, reject) => {
            axios.post(`${apiUrl}/users/login`, formData)
                .then(resp => {
                    console.log(resp);
                    const { data = {} } = resp;
                    const { user, token } = data;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', token);
                    resolve(dispatch(loginSuccess(user)))
                    // resolve(dispatch({type: SET_USER, payload: user}))
                })
                .catch(e => {
                    const { response = {} } = e;
                    const { data = {message: 'Could not log in'} } = response;
                    reject(dispatch(loginFailure(data.message)))
                })
        })
    };
};

export const loginRequest = creds => ({type: LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds});

export const loginSuccess = user => ({type: LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, token: user.token, user });

export const loginFailure = message => ({type: LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message });