import { ADD_ARTICLE, SHOW_ARTICLE } from "../constants/action-types";

export const addArticle = article => ({type: ADD_ARTICLE, payload: article});

export const showArticle = article => ({type: SHOW_ARTICLE, payload: article});