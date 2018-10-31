import {ADD_ARTICLE, DELETE_ARTICLE, SHOW_ARTICLE, UPDATE_ARTICLE} from "../constants/action-types";
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

export const showArticle = article => ({type: SHOW_ARTICLE, payload: article});

export const updateArticle = article => ({type: UPDATE_ARTICLE, payload: article});

export const deleteArticle = article => ({type: DELETE_ARTICLE, payload: article});