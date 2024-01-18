export interface Game {
    _id: string,
    _ownerId: string,
    createdOn: number,
    title: string,
    category: string,
    maxLevel: number,
    imageUrl: string,
    summary: string,
}

export interface User {
    _id: string,
    email: string,
    accessToken: string,
    username: string,
}