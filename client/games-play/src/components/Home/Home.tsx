import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../models/interfaces';
import * as gameService from '../../services/gameService';

const Home = () => {
    const [games, setGames] = useState<Game[] | null>(null);

    useEffect(() => {
        gameService.getAll('?sortBy=_createdOn%20desc&distinct=category')
            .then((response) => {
                setGames(response);
            })
            .catch((err) => console.error(err.message));
    }, []);

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>
                {games && games.map(game =>
                    <div key={game._id} className="game">
                        <div className="image-wrap">
                            <img src={game.imageUrl} />
                        </div>
                        <h3>{game.title}</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <Link to={`/data/games/${game._id}`} className="btn details-btn">Details</Link>
                        </div>
                    </div>
                )}
                {games?.length === 0 && <p className="no-articles">No games yet</p>}
            </div>
        </section>
    );
}

export default Home;