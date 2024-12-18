// src/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Импортируем контекст
import './Header.css';

function HeaderMain() {
  const { userId } = useContext(AuthContext); // Получаем userId из контекста

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Туристическое Агентство</h1>
      <h2 style={subtitleStyle}>Туристические Грезы</h2>
      <nav style={navStyle}>
        <div style={buttonContainerStyle}>
          <Link to={`/HomePage/${userId}`}>
            <button style={buttonStyle}>Главная</button>
          </Link>
          <Link to={`/BookingTick/${userId}`}>
            <button style={buttonStyle}>Забронировать</button>
          </Link>
          <Link to={`/AboutUs/${userId}`}>
            <button style={buttonStyle}>О нас</button>
          </Link>
          <Link to={`/Contacts/${userId}`}>
            <button style={buttonStyle}>Контакты</button>
          </Link>
          <Link to={`/HotelPage/${userId}`}>
            <button style={buttonStyle}>Отели</button>
          </Link>
          <Link to={`/UserProfile/${userId}`}>
            <button style={buttonStyle}>Мой профиль</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Header() {
  return <HeaderMain />;
}

// Стили для компонента
const headerStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const titleStyle = {
  margin: '0',
  fontSize: '2.5em',
};

const subtitleStyle = {
  margin: '0',
  fontSize: '1.5em',
  fontStyle: 'italic',
};

const navStyle = {
  marginTop: '10px',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  color: 'white',
  backgroundColor: '#333',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.2s',
};

export default Header;