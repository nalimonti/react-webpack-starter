import {
    ADD_ARTICLE, SET_ALERT, DELETE_ARTICLE, REPLACE_ARTICLES, SHOW_ARTICLE,
    UPDATE_ARTICLE, REMOVE_ALERT, SET_ARTICLES_LOADED
} from "../constants/action-types";

const initialState = {
    articles: [],
    alert: null,
    articlesLoaded: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return {...state, articles: [...state.articles, action.payload]};
        case SHOW_ARTICLE:
            return state;
        case UPDATE_ARTICLE:
            const { id, title, content } = action.payload;
            return {...state, articles: state.articles.map(a => a.id === id ? {...a, title, content } : a)};
        case DELETE_ARTICLE:
            return {...state, articles: state.articles.filter(a => a.id !== action.payload.id)};
        case REPLACE_ARTICLES:
            return {...state, articles: action.payload};
        case SET_ALERT:
            return {...state, alert: action.payload};
        case REMOVE_ALERT:
            return {...state, alert: null};
        case SET_ARTICLES_LOADED:
            return {...state, articlesLoaded: true};
        default:
            return state;
    }
};

export default rootReducer;