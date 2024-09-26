import { config } from './config';
import { getToken } from './localstorage';

const getRequest = async (path: string) => {
    try {
        const params = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
        };
        const res = await fetch(config.baseURL + path, params);
        const data = await res.json();
        return { statusCode: res.status, data };
    } catch (e) {
        console.error(`error in get Request (${path}) :- `, e);
        return { statusCode: 400, data: [] };
    }
};

const postRequest = async (path: string, body: any) => {
    try {
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: !!getToken() ? 'Bearer ' + getToken() : '',
            },
            body: JSON.stringify(body),
        };

        const res = await fetch(config.baseURL + path, params);

        const data = await res.json();
        return { statusCode: res.status, data };
    } catch (e) {
        console.log(`error in post Request (${path}) :- `, e);
    }
};

const deleteRequest = async (path: string) => {
    try {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getToken(),
            },
        };

        const res = await fetch(config.baseURL + path, params);

        const data = await res.json();
        return { statusCode: res.status, data };
    } catch (e) {
        console.log(`error in Delete Request (${path}) :- `, e);
    }
};

const putRequest = async (path: string, body: any) => {
    try {
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getToken(),
            },
            body: JSON.stringify(body),
        };

        const res = await fetch(config.baseURL + path, params);

        const data = await res.json();
        return { statusCode: res.status, data };
    } catch (e) {
        console.log(`error in PUT Request (${path}) :- `, e);
    }
};

const uploadFileRequest = async (path: string, body: any) => {
    try {
        const params = {
            method: 'POST',
            headers: {
                Authorization: !!getToken() ? 'Bearer ' + getToken() : '',
            },
            body: body,
        };

        const res = await fetch(config.baseURL + path, params);

        const data = await res.json();
        return { statusCode: res.status, data };
    } catch (e) {
        console.log(`error in post Request (${path}) :- `, e);
    }
};

export default {
    getRequest,
    postRequest,
    deleteRequest,
    putRequest,
    uploadFileRequest,
};
