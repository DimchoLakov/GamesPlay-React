import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../../services/userService";
import { useAuth } from '../../../services/AuthContext/useAuth';

const initialForm = {
    email: '',
    password: ''
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();
    const { setIsLoggedIn, setUser } = useAuth();

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
        userService.login(Object.fromEntries(formData))
            .then((response) => {
                console.log(response);
                setUser(response);
                setIsLoggedIn(true);
                navigate('/');
            })
            .catch((error) => console.error(error));
    };

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={handleFormSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                        value={form.email}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={form.password}
                        onChange={onChangeHandler}
                        autoComplete="password"
                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/users/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}