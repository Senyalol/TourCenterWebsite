import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookingDetails = () => {
  const { id, user_id } = useParams(); // Получаем tourId и userId из URL
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [numberOfPeople, setNumberOfPeople] = useState(1); // Состояние для количества людей
  const [hotelId, setHotelId] = useState(null); // Добавлено состояние для id отеля
  const [hotel, setHotel] = useState(null); // Добавлено состояние для информации об отеле
  const [showHotel, setShowHotel] = useState(false); // Новое состояние для отображения отеля

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tours/${id}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setBooking(data);

        // Получаем id отеля для данного тура
        const tourHotelsResponse = await axios.get(`http://localhost:8080/api/tour_hotels?tour_id=${id}`);
        console.log('Ответ от tour_hotels API:', tourHotelsResponse.data);

        // Фильтруем массив, чтобы найти правильный hotel_id
        const matchingHotel = tourHotelsResponse.data.find(hotel => hotel.tour_id === parseInt(id));
        setHotelId(matchingHotel ? matchingHotel.hotel_id : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleBooking = async () => {
    try {
      const bookingData = {
        id: null, // Сервер должен генерировать уникальный id
        userId: user_id, // Замените на реальный id пользователя
        tourId: booking.id,
        bookingDate: new Date().toISOString().slice(0, 10), // Текущая дата
        status: "Подтверждено",
        count: numberOfPeople,
      };
  
      const response = await axios.post("http://localhost:8080/api/bookings", bookingData);
      console.log("Бронирование успешно создано:", response.data);
      // После успешного бронирования можно перенаправить пользователя, например, на страницу "Мои бронирования"
      // window.location.href = "/my-bookings";
      alert("Вы успешно забронировали место в туре");
    } catch (error) {
      console.error("Ошибка при создании бронирования:", error);
      setError("Ошибка при создании бронирования. Попробуйте позже.");
    }
  };

  const fetchHotelData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/hotels/${hotelId}`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setHotel(data);
      setShowHotel(true); // Показываем информацию об отеле
    } catch (err) {
      setError(err.message);
    }
  };

  const handleHotelClick = () => {
    if (showHotel) {
      setShowHotel(false); // Скрываем информацию об отеле
    } else {
      fetchHotelData();
    }
  };

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>Ошибка: {error}</h2>;
  }

  if (!booking) {
    return <h2>Бронь не найдена</h2>;
  }

  return (
    <div style={containerStyle}>
      <h1>{booking.tourname}</h1>
      {booking.imagep && <img src={booking.imagep} alt={booking.tourname} style={imageStyle} />}
      <p><strong>Откуда:</strong> {booking.whereFrom}</p>
      <p><strong>Куда:</strong> {booking.destination}</p>
      <p><strong>Дата начала:</strong> {booking.startDate}</p>
      <p><strong>Дата окончания:</strong> {booking.endDate}</p>
      <p><strong>Описание:</strong> {booking.description}</p>
      <p><strong>Цена:</strong> ${booking.price * numberOfPeople}</p>

      <label>
        <strong>Количество людей:</strong>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          min="1"
          style={{ marginLeft: '10px', width: '50px' }}
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Link to={`/Contacts/${user_id}`} style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }} onClick={handleBooking}>
            Бронировать
          </button>
        </Link>
        <button style={{
          backgroundColor: '#6c757d',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }} onClick={handleHotelClick}>
          {showHotel ? 'Скрыть отель' : 'Отель'}
        </button>
        <Link to={`/BookingTick/${user_id}`}>
        <button style={{
            backgroundColor: '#cc3333', // Тёмно-красный цвет
            color: '#ffffff', // Белый текст
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px', 
          }}>Назад</button>
        </Link>

      </div>

      {showHotel && hotel && (
        <div>
          
          <h2>{hotel.name}</h2>
          {hotel.imagepath && <img src={hotel.imagepath} alt={hotel.name} style={imageStyle} />}
          <p><strong>Местоположение:</strong> {hotel.location}</p>
          <p><strong>Рейтинг:</strong> {hotel.rating}</p>
          <p><strong>Цена за ночь:</strong> {hotel.pricePerNight}$</p>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};

export default BookingDetails;