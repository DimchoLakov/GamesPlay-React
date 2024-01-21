import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../models/interfaces';

export interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => { }
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const value = { user, setUser };

    useEffect(() => {
        const userAsJson = localStorage.getItem('user');
        if (userAsJson) {
            const user = JSON.parse(userAsJson);
            setUser(user);
        }
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
