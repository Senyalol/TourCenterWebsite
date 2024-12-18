import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import './Hotellist.css';

function GetHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/hotels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setHotels(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>Ошибка: {error}</h2>;
  }

  return (
    <div className="container">
      <h1>Список отелей</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id} className="hotel-card">
            <Link to={`/hotels/${hotel.id}`} className="hotel-title"> {/* Ссылка на страницу отеля */}
              {hotel.name}
            </Link>
            <p className="hotel-description">{hotel.description}</p>
            <p className="hotel-price">Цена: ${hotel.price_per_night}</p>
            <p className="hotel-rating">Рейтинг: {hotel.rating} ⭐</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetHotels;