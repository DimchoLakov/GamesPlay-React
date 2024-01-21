import { Game, Comment } from '../../../models/interfaces';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as gameService from '../../../services/gameService';
import * as commentService from '../../../services/commentService';
import { useAuth } from '../../../services/AuthContext/useAuth';

const intialCommentForm = {
    comment: ''
};

export default function GameDetails() {
    const [game, setGame] = useState({} as Game);
    const [commentsForm, setCommentsForm] = useState(intialCommentForm);
    const [comments, setComments] = useState<Comment[]>([]);
    const { gameId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchComments = (gameId: string) => {
        commentService.getByGameId(gameId)
            .then(response => setComments(response))
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        gameService.getById(gameId!)
            .then(response => setGame(response))
            .catch((error) => {
                console.error(error);
            });

        fetchComments(gameId!);
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

    const onCommentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentsForm(state => (
            { ...state, [event.target.name]: event.target.value }
        ));
    };

    const onAddCommentFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        formData.append('gameId', gameId!);
        const data = Object.fromEntries(formData);

        commentService.add(data)
            .then(async () => {
                await fetchComments(gameId!);
                setCommentsForm(intialCommentForm);
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
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
                    {comments?.length > 0 &&
                        <ul>
                            {/* <!-- list all comments for current game (If any) --> */}
                            {comments.map((c, index) =>
                                <li key={index.toString() + c.comment} className="comment">
                                    <p>{c.comment}</p>
                                </li>)
                            }
                        </ul>
                    }

                    {/* <!-- Display paragraph: If there are no comments in the database --> */}
                    {comments?.length === 0 &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {user && user?._id === game._ownerId &&
                    <div className="buttons">
                        <Link to={`/data/games/edit/${game._id}`} className="button">Edit</Link>
                        <Link to={`/data/games/edit/${game._id}`} className="button" onClick={onDeleteClickHandler} >Delete</Link>
                    </div>
                }
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            {user && user?._id !== game._ownerId &&
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onAddCommentFormSubmitHandler}>
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            value={commentsForm.comment}
                            onChange={onCommentChangeHandler}
                        >
                        </textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            }

        </section>
    );
}