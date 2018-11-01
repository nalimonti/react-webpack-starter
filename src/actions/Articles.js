import axios from 'axios';
import {
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
                const { data = {message: 'An error occurred'} } = response;
                reject(data)
            })
    })
}

export function updateArticle(article) {
    return dispatch => new Promise((resolve, reject) => {
        axios.put(`${apiUrl}/articles/${article.id}`, { article })
            .then(resp => {
                const { data = {} } = resp;
                const { message = 'Article updated!' } = data;
                resolve(dispatch({type: UPDATE_ARTICLE, payload: article, message }))
            })
            .catch(e => {
                console.error(e);
            })
    })
}

export function setArticlesLoaded() {
    return dispatch => dispatch({type: SET_ARTICLES_LOADED})
}