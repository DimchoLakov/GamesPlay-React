import * as request from './httpRequest';

const baseUrl = 'http://localhost:3030/users';
const authTokenName = 'authToken';
const emailName = 'email';
const userIdName = 'userId';

export async function login(data: object): Promise<object> {
    const response = await request.post(baseUrl + '/login', data);
    localStorage.setItem(emailName, response.email);
    localStorage.setItem(authTokenName, response.accessToken);
    localStorage.setItem(userIdName, response._id);

    console.log(response);

    return response;
}

export function logout(): void {
    localStorage.removeItem(emailName);
    localStorage.removeItem(authTokenName);
    localStorage.removeItem(userIdName);
}

export async function register(): Promise<object> {
    const response = await request.post(baseUrl + '/register');
    console.log(response);

    return {};
}

export function isLoggedIn(): boolean {
    const authToken = localStorage.getItem(authTokenName);

    return !!authToken
}