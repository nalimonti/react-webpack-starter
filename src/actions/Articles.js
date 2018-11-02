import axios from 'axios';
import {
    ADD_ARTICLE,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REPLACE_ARTICLES,
    SET_ARTICLES_LOADED, UPDATE_ARTICLE
} from "../constants/ActionsTypes";
import { authHeader } from '../helpers/authHelper';

// const apiUrl = 'http://localhost:3000';
const apiUrl = 'http://192.168.1.138:3000';

export function getArticles() {
    return dispatch => new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/articles`, {
            headers: authHeader()
        })
            .then(resp => {
                const { data = {} } = resp;
                const { articles = [] } = data;
                resolve(dispatch({type: REPLACE_ARTICLES, payload: articles}));
            })
            .catch(e => {
                const { response = {} } = e;
                const { data = {} } = response;
                const { message = 'An error occurred!' } = data;
                reject(message)
            })
    })
}

export function updateArticle(article) {
    console.log('updating article');
    return dispatch => new Promise((resolve, reject) => {
        axios.put(`${apiUrl}/articles/${article.id}`, { article })
            .then(resp => {
                const { data = {} } = resp;
                const { message = 'Article updated!' } = data;
                resolve(dispatch({type: UPDATE_ARTICLE, payload: article, message }))
            })
            .catch(e => {
                console.error(e);
                const { response = {} } = e;
                const { data = {message: 'An error occurred'} } = response;
                reject(data)
            })
    })
}

export function createArticle(article) {
    console.log('creating article');
    return dispatch => new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/articles`, { article }).then(resp => {
            const { data = {} } = resp;
            const { id: newId, message = 'Article created!' } = data;
            resolve(dispatch({type: ADD_ARTICLE, payload: Object.assign({}, article, {id: newId || article.id }), message}))
        }).catch(e => {
            const { response = {} } = e;
            const { data = {message: 'An error occurred'} } = response;
            reject(data)
        })
    })
}

export function setArticlesLoaded() {
    return dispatch => dispatch({type: SET_ARTICLES_LOADED})
}