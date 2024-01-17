import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './AuthContext';

export const useAuth = (): AuthContextProps => useContext(AuthContext);
