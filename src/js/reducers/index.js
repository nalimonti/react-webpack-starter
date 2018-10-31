import {ADD_ARTICLE, DELETE_ARTICLE, SHOW_ARTICLE, UPDATE_ARTICLE} from "../constants/action-types";

const initialState = {
    articles: []
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
        default:
            return state;
    }
};

export default rootReducer;