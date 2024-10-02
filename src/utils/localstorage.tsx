'use client';

export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem('token');
        if (!!token) return JSON.parse(token);
    }
    return false;
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = window.localStorage.getItem('user');
        if (!!user) return JSON.parse(user);
    }
    return false;
};

export const setUser = (user: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }
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
