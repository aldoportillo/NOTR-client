import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  console.log("decoded", decoded)
  const currentTime = Date.now() / 1000; 
  return decoded.exp < currentTime;  
};

interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  height: number;
  weight: number;
  dob: string;
  sex: string;
  friends: string[];
  friendRequests: string[];
  photoUrl?: string;
  admin: boolean;
}

interface AuthContextType {
  auth: { token: string | null; user: User | null };
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{ token: string | null; user: User | null }>(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && !isTokenExpired(token)) {
        return {
            token: token,
            user: userData ? JSON.parse(userData) : null
        };
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('🫗 Session expired. Please login again! 🫗');
        return { token: null, user: null };
    }
});


  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    toast.success('🥃 Logout successful! Goodbye! 🧊');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
