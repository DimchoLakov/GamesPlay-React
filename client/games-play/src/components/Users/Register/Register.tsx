import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../../services/userService";

const initialForm = {
    email: '',
    password: '',
    confirmPassword: ''
};


export default function Register() {
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const propertyName = event.target.name;
        const newValue = event.target.value;

        setForm(state => {
            return { ...state, [propertyName]: newValue };
        });
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        if (!email || !password || !confirmPassword) {
            console.error('email, password and confirmPassword fields must not be empty.');
            alert('email, password and confirmPassword fields must not be empty.');

            return;
        }

        if (password !== confirmPassword) {
            console.error('password and confirmPassword must match.');
            alert('password and confirmPassword must match.');

            return;
        }

        userService.register(Object.fromEntries(formData))
            .then(() => {
                navigate('/users/login');
            })
            .catch((error) => console.error(error));
    };

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={handleFormSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={form.email}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={onChangeHandler}
                        autoComplete="password"
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={onChangeHandler}
                        autoComplete="confirmPassword"
                    />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/users/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}