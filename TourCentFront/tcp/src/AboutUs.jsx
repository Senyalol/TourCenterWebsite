// src/components/About.js
import React from 'react';

const AboutUs = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>О нашем туристическом агентстве "Туристические грезы"</h1>
      <p style={descriptionStyle}>
        Добро пожаловать в агентство "Туристические грезы"! Мы — ваша путеводная звезда в мире путешествий. 
        Наша команда профессионалов предлагает широкий спектр туристических услуг, включая организацию 
        уникальных путешествий, бронирование отелей, билетов и экскурсии по самым интересным местам 
        нашей планеты. Мы стремимся сделать каждую поездку не только комфортной, но и незабываемой!
      </p>
      <h2 style={subHeaderStyle}>Почему выбирают нас?</h2>
      <ul style={listStyle}>
        <li>Индивидуальный подход к каждому клиенту</li>
        <li>Конкурентные цены на туры и услуги</li>
        <li>Опытные гиды и профессиональные консультанты</li>
        <li>Поддержка 24/7 во время вашего путешествия</li>
      </ul>
      <h2 style={subHeaderStyle}>Контактная информация</h2>
      <p style={contactStyle}>
        Телефон: <a href="https://vitravel.by/?ysclid=m3dgb011xd381331289">+1 (234) 567-890</a><br />
        Email: <a href="https://www.psu.by/ru/kontakty">HotTour@mail.com</a><br />
        Адрес: ул. Блохина, 29, 211446, г.
      </p>
    </div>
  );
};

// Стили
const containerStyle = {
  maxWidth: '800px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const descriptionStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
};

const subHeaderStyle = {
  marginTop: '20px',
  marginBottom: '10px',
};

const listStyle = {
  listStyleType: 'disc',
  marginLeft: '20px',
};

const contactStyle = {
  marginTop: '20px',
};

export default AboutUs;