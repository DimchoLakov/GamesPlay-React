import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../services/AuthContext/useAuth";
import * as gameService from "../../../services/gameService";

const initialForm = {
    title: '',
    category: '',
    maxLevel: 0,
    imageUrl: '',
    summary: ''
};

export default function EditGame() {
    const [form, setForm] = useState(initialForm);
    const { gameId } = useParams();
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const currentGame = await gameService.getById(gameId!);

                setForm(state => ({
                    ...state, ...currentGame
                }))

                if (!isLoggedIn) {
                    const guestsCannotEditMessage = 'Guests cannot edit Games.';
                    alert(guestsCannotEditMessage);
                    console.error(guestsCannotEditMessage);
                    navigate(-1);
                }

                if (user?._id !== currentGame?._ownerId) {
                    const nonAuthorsCannotEditMessage = 'You are are not the author of this game, thus you cannot edit it.';
                    alert(nonAuthorsCannotEditMessage);
                    console.error(nonAuthorsCannotEditMessage);
                    navigate(-1);
                }

            } catch (err: unknown) {
                if (err instanceof Error) {
                    alert(err.message);
                    console.error(err.message);
                } else {
                    alert(err);
                    console.error(err);
                }
                navigate(-1);
            }
        };

        fetchGame();
    }, [gameId, isLoggedIn, navigate, user]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(state => {
            const targetValue = event.target.value;
            const value = event.target.name === 'maxLevel' ? Number(targetValue) : targetValue;
            return { ...state, [event.target.name]: value };
        })
    }

    const onSubmitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        if (Object.entries(formData).some(value => !value)) {
            const allFieldsMustBeFilledInMessage = 'Please fill in all fields.';
            alert(allFieldsMustBeFilledInMessage);
            console.error(allFieldsMustBeFilledInMessage);

            return;
        }

        console.log(Object.fromEntries(formData));
        gameService.edit(gameId!, Object.fromEntries(formData))
            .then(() => {
                navigate("/data/games");
                console.log('game modified');
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    };

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmitFormHandler}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={form?.title} onChange={onChangeHandler} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={form?.category} onChange={onChangeHandler} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value={form?.maxLevel} onChange={onChangeHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={form?.imageUrl} onChange={onChangeHandler} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={form?.summary} onChange={onChangeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
        </section>
    );
}