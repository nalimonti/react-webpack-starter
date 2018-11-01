import configureStore from '../store';

export function authHeader() {
    const { store } = configureStore();
    const { token } = store.getState();

    if (token) {
        return {'Authorization': `Bearer ${token}`}
    }
    else return {}
}