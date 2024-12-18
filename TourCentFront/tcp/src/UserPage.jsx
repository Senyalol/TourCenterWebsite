import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // Получаем id из параметров URL
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Состояние для выбранного файла
  const [isFileUpdated, setIsFileUpdated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [id]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`http://localhost:8080/api/users/${id}/photo`, {
          method: 'PUT',
          body: formData,
        });
        if (response.ok) {
          const updatedUserData = await response.json();
          setUserData(updatedUserData);
          setIsFileUpdated(true);
        } else {
          throw new Error(`Ошибка: ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div style={containerStyle}>
      <img src={selectedFile || userData.imagep} alt="Профиль" style={imageStyle} />
      <h1 style={headerStyle}>Профиль пользователя</h1>
      <h2 style={sectionHeaderStyle}>Личные данные</h2>
      <h3>Login:</h3>
      <h4>{userData.username}</h4>
      <h3>Email:</h3>
      <h4>{userData.email}</h4>

     

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }} // Скрываем input
        accept="image/*" // Ограничиваем выбор только изображениями
        onChange={handleFileChange}
      />
    </div>
  );
};

// Стили
const containerStyle = {
  maxWidth: '600px',
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

const sectionHeaderStyle = {
  marginTop: '20px',
  marginBottom: '10px',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
};

// Стиль для изображения
const imageStyle = {
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  objectFit: 'cover',
  display: 'block',
  margin: '0 auto 20px auto',
};

// Стиль для кнопки
const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'block',
  margin: '0 auto',
};

export default UserProfile;