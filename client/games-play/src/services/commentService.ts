import { Comment } from '../models/interfaces';
import * as request from './httpRequest';
import { CommentsBaseUrl } from './constants';

export async function getByGameId(gameId: string): Promise<Comment[]> {
    const response = await request.get(CommentsBaseUrl + `?where=gameId%3D%22${gameId}%22`);
    const result = response as Comment[];

    return result;
}

export async function add(data: object): Promise<Comment> {
    const response = await request.post(CommentsBaseUrl, data);
    const result = response as Comment;

    return result;
}