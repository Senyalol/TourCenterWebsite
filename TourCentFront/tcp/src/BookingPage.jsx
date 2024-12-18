import React, { useEffect, useState } from 'react';
import './BookingPage.css'; // Импортируем CSS для стилей
import { Link } from 'react-router-dom'; // Импортируем Link
import { useParams } from 'react-router-dom';

function GetTours() {
  const { id } = useParams(); // Получаем tourId и userId из UR
  const [tours, setTours] = useState([]); // Состояние для хранения списка туров
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState(''); // Состояние для хранения ошибок

  // Функция для получения данных туров
  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tours', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // Преобразуем ответ в JSON
      setTours(data); // Сохраняем полученные данные в состоянии
    } catch (error) {
      setError(error.message); // Сохраняем сообщение об ошибке
    } finally {
      setLoading(false); // Устанавливаем загрузку в false после завершения
    }
  };

  // Используем useEffect для вызова функции получения данных при монтировании компонента
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return <h2>Загрузка...</h2>; // Отображаем сообщение о загрузке
  }

  if (error) {
    return <h2>Ошибка: {error}</h2>; // Отображаем сообщение об ошибке
  }

  return (
    <div className="container">
      <h1>Список туров</h1>
      <ul>
        {tours.map((tour, index) => (
          <li key={index} className="tour-card">
            <Link to = {`/BookDetails/${tour.id}/${id}`}> 
              <h2 className="tour-name">{tour.tourname}</h2>
            </Link>

            <p><strong>Откуда:</strong> {tour.where_from}</p>
            <p><strong>Куда:</strong> {tour.destination}</p>
            <p><strong>Дата начала:</strong> {tour.start_date}</p>
            <p><strong>Дата окончания:</strong> {tour.end_date}</p>
            <p className="tour-description">{tour.description}</p>
            <p className="tour-price">Цена: ${tour.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetTours;