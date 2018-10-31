import {
    ADD_ARTICLE, DELETE_ARTICLE, REPLACE_ARTICLES, SHOW_ARTICLE, UPDATE_ARTICLE, SET_ALERT, REMOVE_ALERT,
    SET_ARTICLES_LOADED
} from "../constants/action-types";
import axios from 'axios';

const apiUrl = 'http://localhost:3000';

export const addArticle = (dispatch, article) => {
    return new Promise((resolve, reject) => {
      axios.post(`${apiUrl}/articles`, { article }).then(resp => {
          const { data = {} } = resp;
          const { id: newId } = data;
          resolve(dispatch({type: ADD_ARTICLE, payload: Object.assign({}, article, {id: newId || article.id })}))
      }).catch(e => {
          console.error(e);
      })
    })
};

export const getArticles = (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.get(`${apiUrl}/articles`)
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
};

export const setAlert = alert => ({type: SET_ALERT, payload: alert});

export const removeAlert = () => ({type: REMOVE_ALERT});

export const showArticle = article => ({type: SHOW_ARTICLE, payload: article});

// export const updateArticle = article => ({type: UPDATE_ARTICLE, payload: article});
export const updateArticle = (dispatch, article) => {
    return new Promise((resolve, reject) => {
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
};

export const deleteArticle = (dispatch, article) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${apiUrl}/articles/${article.id}`)
            .then(() => {
                resolve(dispatch(({type: DELETE_ARTICLE, payload: article})))
            })
            .catch(e => {
                const { response = {} } = e;
                const { data = {message: 'An error occurred'} } = response;
                reject(data)
            })
    })
};

export const setArticlesLoaded = () => ({type: SET_ARTICLES_LOADED});