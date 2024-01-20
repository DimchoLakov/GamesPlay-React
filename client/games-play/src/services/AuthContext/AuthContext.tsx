import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../models/interfaces';

export interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { }
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const value = { isLoggedIn, setIsLoggedIn, user, setUser };

    useEffect(() => {
        const userAsJson = localStorage.getItem('user');
        if (userAsJson) {
            const user = JSON.parse(userAsJson);
            setUser(user);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
