import { Game } from '../models/interfaces';
import * as request from './httpRequest';

const baseUrl = 'http://localhost:3030/data/games';

export async function getAll(filters?: string): Promise<Game[] | null> {
    const response = await request.get(baseUrl + filters);
    if (response.code === 404) {
        return null;
    }
    const result = Object.values(response) as Game[];

    return result;
}

export async function getById(gameId: string): Promise<Game> {
    const response = await request.get(baseUrl + `/${gameId}`);
    const result = response as Game;

    return result;
}

export async function create(data: object): Promise<Game> {
    const response = await request.post(baseUrl, data);
    const result = response as Game;

    return result;
}

export async function edit(gameId: string, data: object): Promise<Game> {
    const response = await request.put(baseUrl + `/${gameId}`, data);
    const result = response as Game;

    return result;
}

export async function del(gameId: string): Promise<Game> {
    const response = await request.del(baseUrl + `/${gameId}`);
    const result = response as Game;

    return result;
}