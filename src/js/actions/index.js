import {ADD_ARTICLE, DELETE_ARTICLE, SHOW_ARTICLE, UPDATE_ARTICLE} from "../constants/action-types";

export const addArticle = article => ({type: ADD_ARTICLE, payload: article});

export const showArticle = article => ({type: SHOW_ARTICLE, payload: article});

export const updateArticle = article => ({type: UPDATE_ARTICLE, payload: article});

export const deleteArticle = article => ({type: DELETE_ARTICLE, payload: article});