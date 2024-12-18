import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/hotels/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных отеля');
        }
        const data = await response.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHotel();
  }, [id]);

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!hotel) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>{hotel.name}</h2>
      <img src={hotel.imagepath} alt={hotel.name} style={imageStyle} /> {/* Добавили изображение */}
      <p><strong>Местоположение:</strong> {hotel.location}</p>
      <p><strong>Рейтинг:</strong> {hotel.rating}</p>
      <p><strong>Цена за ночь:</strong> {hotel.pricePerNight} $</p>
    </div>
  );
};

// Стили
const containerStyle = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '20px',
};

export default HotelPage;

