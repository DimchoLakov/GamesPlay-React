import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from "../../../services/gameService";

const initialForm = {
    title: '',
    category: '',
    maxLevel: 0,
    imageUrl: '',
    summary: ''
};

export default function CreateGame() {
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(state => {
            const targetValue = event.target.value;
            const value = event.target.name === 'maxLevel' ? Number(targetValue) : targetValue;
            return { ...state, [event.target.name]: value };
        })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        gameService.create(Object.fromEntries(formData))
            .then(() => {
                navigate("/data/games");
                console.log('game created');
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            });
    }

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        value={form.title}
                        onChange={onChangeHandler} />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        value={form.category}
                        onChange={onChangeHandler} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        placeholder="1"
                        value={form.maxLevel}
                        onChange={onChangeHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        value={form.imageUrl}
                        onChange={onChangeHandler} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={form.summary}
                        onChange={onChangeHandler}
                    >
                    </textarea>
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    );
}