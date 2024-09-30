'use client';

export const getToken = () => {
    const token = window.localStorage.getItem('token');
    if (!!token) return JSON.parse(token);
    return false;
};

export const getUser = () => {
    const user = window.localStorage.getItem('user');
    if (!!user) return JSON.parse(user);
    return false;
};

export const setUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const isLogin = () => {
    if (!!getToken()) {
        return true;
    }
    return false;
};

export const logout = () => {
    window.localStorage.clear();
    window.location.pathname = '/auth/login';
};
