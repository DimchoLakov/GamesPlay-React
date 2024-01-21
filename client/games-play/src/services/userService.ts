import { User } from '../models/interfaces';
import * as request from './httpRequest';
import { UsersBaseUrl } from './constants';

const authTokenName = 'authToken';
const user = 'user';

export async function login(data: object): Promise<User> {
    const response = await request.post(UsersBaseUrl + '/login', data);
    if (response.code === 403) {
        alert(response.message);
        throw new Error(response.message);
    }

    localStorage.setItem(authTokenName, response.accessToken);
    localStorage.setItem(user, JSON.stringify(response));

    return response;
}

export async function logout(): Promise<boolean> {
    try {
        await request.get(UsersBaseUrl + '/logout');

        return false;
    } catch {
        localStorage.removeItem(authTokenName);
        localStorage.removeItem(user);

        return true;
    }
}

export async function register(data: object): Promise<object> {
    const response = await request.post(UsersBaseUrl + '/register', data);

    console.log(response);

    return response;
}

export function isLoggedIn(): boolean {
    const authToken = localStorage.getItem(authTokenName);

    return !!authToken
}