async function request(url: string, options: RequestInit) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error((error as Error).message || 'An error occurred during the request.');
    }
}

function getOptions(method: string, data?: object) {
    const options: RequestInit = {
        method: method,
        headers: {}
    };

    const authToken = localStorage.getItem('authToken');
    if (authToken !== null) {
        options.headers = {
            ...options.headers,
            'X-Authorization': authToken
        };
    }

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json'
        }
    }

    return options;
}

export async function get(url: string) {
    return await request(url, getOptions('GET'));
}

export async function post(url: string, data?: object) {
    return await request(url, getOptions('POST', data));
}

export async function put(url: string, data?: object) {
    return await request(url, getOptions('PUT', data));
}

export async function del(url: string, data?: object) {
    return await request(url, getOptions('DELETE', data));
}
