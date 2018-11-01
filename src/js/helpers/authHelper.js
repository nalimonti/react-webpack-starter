export function authHeader() {
    const token = localStorage.getItem('token');

    if (token) {
        return {'Authorization': `Bearer ${token}`}
    }
    else return {}
}

export function isAuthenticated() {
    return localStorage.getItem('user') && localStorage.getItem('token');
}