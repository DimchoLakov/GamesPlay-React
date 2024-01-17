import { Game } from '../models/interfaces';
import * as request from './httpRequest';

const baseUrl = 'http://localhost:3030/data/games';

export async function getAll(): Promise<Game[]> {
    const response = await request.get(baseUrl);
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