import { User } from '../models/interfaces';
import * as request from './httpRequest';

const baseUrl = 'http://localhost:3030/users';
const authTokenName = 'authToken';
const emailName = 'email';
const userIdName = 'userId';

export async function login(data: object): Promise<User> {
    const response = await request.post(baseUrl + '/login', data);
    if (response.code === 403) {
        alert(response.message);
        throw new Error(response.message);
    }

    localStorage.setItem(emailName, response.email);
    localStorage.setItem(authTokenName, response.accessToken);
    localStorage.setItem(userIdName, response._id);

    return response;
}

export async function logout(): Promise<boolean> {
    try {
        await request.get(baseUrl + '/logout');

        return false;
    } catch {
        localStorage.removeItem(emailName);
        localStorage.removeItem(authTokenName);
        localStorage.removeItem(userIdName);

        return true;
    }
}

export async function register(data: object): Promise<object> {
    const response = await request.post(baseUrl + '/register', data);

    console.log(response);

    return response;
}

export function isLoggedIn(): boolean {
    const authToken = localStorage.getItem(authTokenName);

    return !!authToken
}