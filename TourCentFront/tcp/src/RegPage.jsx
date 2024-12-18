import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams(); // Получаем id пользователя из URL

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }
  
    // Prepare data to send
    const userData = {
      username,
      email,
      password,
      administrator: false,
      imagep: "https://filkiniada-4sc.ucoz.org/80781_3.jpg"
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get the error response as text
        console.error('Error response:', errorText); // Log the error response
        throw new Error(`Ошибка: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json(); // Parse the response as JSON
      setSuccess('Регистрация прошла успешно!');
      console.log('Данные пользователя:', data);
  
      // Reset fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
   
      // Redirect to the Contacts page with the new user's id
      navigate(`/`);
    } catch (error) {
      setError(error.message);
      // Reset fields if desired
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate(`/`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Регистрация</h2>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>{success}</div>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Имя:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Электронная почта:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Пароль:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={inputStyle} 
          />
        </div>
        <div>
          <label style={labelStyle}>Подтверждение пароля:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            style={inputStyle} 
          />
        </div>
        <Link to="/">Войти в аккаунт</Link>
        
          <button type="submit" style={buttonStyle}>Зарегистрироваться</button>
        
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: '400px',
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

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  height: 'auto',
};

const labelStyle = {
  marginBottom: '5px',
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};

const errorStyle = {
  color: 'red',
  marginBottom: '15px',
  textAlign: 'center',
};

const successStyle = {
  color: 'green',
  marginBottom: '15px',
  textAlign: 'center',
};

export default Registration;