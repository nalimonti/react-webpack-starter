import {ADD_ARTICLE, SHOW_ARTICLE} from "../constants/action-types";

const initialState = {
    articles: []
};

const rootReducer = (state = initialState, action) => {
    console.log('in rootReducer');
    console.log(action);
    switch (action.type) {
        case ADD_ARTICLE:
            return {...state, articles: [...state.articles, action.payload]};
        case SHOW_ARTICLE:
            console.log('show article');
            console.log(action);
            return state;
        default:
            return state;
    }
};

export default rootReducer;