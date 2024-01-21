import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../services/userService';
import { useAuth } from '../../services/AuthContext/useAuth';

const Header = () => {
    const { user, setUser } = useAuth();

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();
        userService.logout();
        setUser(null);
    };

    return (
        <header>
            <h1><Link className="home" to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/data/games">All games</Link>
                {user ?
                    <div id="user">
                        <Link to="/data/games/create">Create Game</Link>
                        <Link to="/users/logout" onClick={handleLogout}>Logout</Link>
                    </div> :
                    <div id="guest">
                        <Link to="/users/login">Login</Link>
                        <Link to="/users/register">Register</Link>
                    </div>
                }
            </nav>
        </header>
    );
}

export default Header;
