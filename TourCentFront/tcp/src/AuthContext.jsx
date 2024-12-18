// src/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); // Добавляем состояние для userId

    const login = (id) => {
        setIsAuthenticated(true);
        setUserId(id); // Сохраняем id пользователя
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};