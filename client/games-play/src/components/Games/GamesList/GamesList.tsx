import * as gameService from '../../../services/gameService';
import { useState, useEffect } from 'react';
import { Game } from '../../../models/interfaces';
import GamesListItem from '../GamesListItem/GamesListItem';

export default function GamesList() {
    const [games, setGames] = useState<Game[] | null>(null);

    useEffect(() => {
        gameService.getAll('?sortBy=_createdOn%20desc')
            .then(result => setGames(result));
    }, []);

    return (
        <>
            <section id="catalog-page">
                <h1>All Games</h1>
                {games && games.map(game =>
                    <GamesListItem key={game._id} game={game} />
                )}

                {!games && <h3 className="no-articles">No articles yet</h3>}
            </section>
        </>
    );
}