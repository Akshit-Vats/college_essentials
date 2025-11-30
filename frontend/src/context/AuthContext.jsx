import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            console.log('Checking user session...');
            const response = await api.get('/auth/me');
            console.log('User session found:', response.data);
            setUser(response.data);
        } catch (error) {
            console.log('No user session or error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        setUser(response.data);
        return response.data;
    };

    const signup = async (data) => {
        const response = await api.post('/auth/signup', data);
        setUser(response.data);
        return response.data;
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
