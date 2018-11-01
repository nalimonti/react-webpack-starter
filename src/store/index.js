/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from '../js/reducers/index';

// Redux Persist config
const config = {
    key: 'root',
    storage,
    blacklist: [],
};

const logger = store => next => action => {
    console.log(`dispatchingd`, action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

const reducer = persistReducer(config, reducers);

const middleware = [thunk, logger];

const configureStore = () => {
    const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(applyMiddleware(...middleware)),
    );

    const persistor = persistStore(
        store,
        null,
        () => { store.getState(); },
    );

    return { persistor, store };
};

export default configureStore;
