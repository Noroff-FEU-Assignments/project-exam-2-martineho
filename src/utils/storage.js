const tokenKey = "token";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}

export function saveUsername(name) {
    saveToStorage('user_name', name);
}

export function getUsername() {
    const name = getFromStorage('user_name');

    if (name) {
        return name;
    }
    return null;
}

export function saveUserEmail(email) {
    saveToStorage('user_email', email)
}

export function getUserEmail() {
    const email = getFromStorage('user_email');

    if (email) {
        return email;
    }
    return null;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return [];
    }

    return JSON.parse(value);
}

export function clearStorage() {
    localStorage.clear();
}