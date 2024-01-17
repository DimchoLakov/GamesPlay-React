import { Link } from "react-router-dom";
import { Game } from "../../../models/interfaces";

interface IProps {
    game: Game
}

export default function GamesListItem({ game }: IProps) {
    return (
        <>
            <div key={game._id} className="allGames">
                <div className="allGames-info">
                    <img src={game.imageUrl} />
                    <h6>{game.category}</h6>
                    <h2>{game.title}</h2>
                    <Link to={`/data/games/${game._id}`} className="details-button">Details</Link>
                </div>
            </div>
        </>
    );
}