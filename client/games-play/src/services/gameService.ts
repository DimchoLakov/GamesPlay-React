import { Game } from '../models/interfaces';
import * as request from './httpRequest';
import { GameBaseUrl } from './constants';

export async function getAll(filters?: string): Promise<Game[] | null> {
    const response = await request.get(GameBaseUrl + filters);
    if (response.code === 404) {
        return null;
    }
    const result = Object.values(response) as Game[];

    return result;
}

export async function getById(gameId: string): Promise<Game> {
    const response = await request.get(GameBaseUrl + `/${gameId}`);
    const result = response as Game;

    return result;
}

export async function create(data: object): Promise<Game> {
    const response = await request.post(GameBaseUrl, data);
    const result = response as Game;

    return result;
}

export async function edit(gameId: string, data: object): Promise<Game> {
    const response = await request.put(GameBaseUrl + `/${gameId}`, data);
    const result = response as Game;

    return result;
}

export async function del(gameId: string): Promise<Game> {
    const response = await request.del(GameBaseUrl + `/${gameId}`);
    const result = response as Game;

    return result;
}