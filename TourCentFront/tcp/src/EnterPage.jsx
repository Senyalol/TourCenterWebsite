// src/EnterPage.js (или ваш компонент Login)
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Home.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Получаем функцию login из контекста

    const authenticateUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const user = data.find(user => user.username === username && user.password === password);
            return user ? user.id : null;
        } catch (error) {
            console.error('Ошибка при аутентификации:', error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        const id = await authenticateUser(username, password);
        if (id) {
            alert('Вы успешно вошли в аккаунт');
            login(id); // Устанавливаем пользователя как аутентифицированного
            navigate(`/UserProfile/${id}`);
        } else {
            setError('Неверный логин или пароль.');
        }

        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', margin: 15 }}>Вход</h2>
            {error && <div style={errorStyle}>{error}</div>}
            <form onSubmit={handleLogin} style={formStyle}>
                <div>
                    <label style={labelStyle}>Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='InputLog'
                    />
                </div>
                <div>
                    <label style={labelStyle}>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='InputPass'
                    />
                </div>
                <button type="submit" style={buttonStyle}>Войти</button>
                <Link to='/RegPage' style={{ textAlign: 'center' }}>
                    Зарегистрироваться
                </Link>
            </form>
        </div>
    );
};

// Стили
const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    marginBottom: '5px',
};

const buttonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginTop: '15px',
};

const errorStyle = {
    color: 'red',
    marginBottom: '15px',
};

export default Login;