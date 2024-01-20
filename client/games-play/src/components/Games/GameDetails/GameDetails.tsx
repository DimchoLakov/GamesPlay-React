import { Game } from '../../../models/interfaces';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as gameService from '../../../services/gameService';
import { useAuth } from '../../../services/AuthContext/useAuth';

export default function GameDetails() {
    const [game, setGame] = useState({} as Game);
    const { gameId } = useParams();
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getById(gameId!)
            .then(response => setGame(response))
            .catch((error) => {
                console.error(error);
            });
    }, [gameId]);

    const onDeleteClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (confirm(`Are you sure you want to delete ${game.title}`)) {
            gameService.del(gameId!)
                .then(() => navigate('/'))
                .catch((err) => console.error(err));

            return;
        }

        return;
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* <!-- list all comments for current game (If any) --> */}
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    {/* <!-- Display paragraph: If there are no comments in the database --> */}
                    <p className="no-comment">No comments.</p>
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isLoggedIn && user?._id === game._ownerId &&
                    <div className="buttons">
                        <Link to={`/data/games/edit/${game._id}`} className="button">Edit</Link>
                        <Link to={`/data/games/edit/${game._id}`} className="button" onClick={onDeleteClickHandler} >Delete</Link>
                    </div>
                }
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
}