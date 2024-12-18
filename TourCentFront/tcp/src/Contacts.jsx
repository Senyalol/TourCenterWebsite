import React from 'react';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-container">
      <h1 className="contacts-title">Контакты</h1>
      <div className="contact-card">
        <div className="contact-info">
          <h3 className="contact-name">Кирпиченок Максим Русланович</h3>
          <p className="contact-position">CEO</p>
          <p className="contact-phone">+375-29-433-72-54</p>
        </div>
        <img
          src="https://static3.smi2.net/img/1200x630/9853170.jpeg"
          alt="Кирпиченок Максим Русланович"
          className="contact-image"
        />
      </div>
      <div className="contact-card">
        <div className="contact-info">
          <h3 className="contact-name">Науменко Семен Александрович</h3>
          <p className="contact-position">Старший менеджер</p>
          <p className="contact-phone">+375-29-780-93-78</p>
        </div>
        <img
          src="https://i.pinimg.com/originals/f0/ac/4f/f0ac4f5da613323010ca495f3cdbf448.jpg"
          alt="Науменко Семен Александрович"
          className="contact-image"
        />
      </div>
      <div className="contact-card">
        <div className="contact-info">
          <h3 className="contact-name">Халимов Мурад Калсынович</h3>
          <p className="contact-position">HR</p>
          <p className="contact-phone">+375-29-812-63-14</p>
        </div>
        <img
          src="https://ae04.alicdn.com/kf/H26c88b93e38f4023a01e672bddd86fb4H.jpg"
          alt="Халимов Мурад Калсынович"
          className="contact-image"
        />
      </div>
      <div className="contact-card">
        <div className="contact-info">
          <h3 className="contact-name">Щербо Никита Валерьевич</h3>
          <p className="contact-position">Функциональная поддержка</p>
          <p className="contact-phone">+375-29-532-32-86</p>
        </div>
        <img
          src="https://i.pinimg.com/736x/22/c7/bf/22c7bf63f4d4eea448ccc0d950dccf2f.jpg"
          alt="Щербо Никита Валерьевич"
          className="contact-image"
        />
      </div>
      <div className="contact-card">
        <div className="contact-info">
          <h3 className="contact-name">Купчин Даниил Юрьевич</h3>
          <p className="contact-position">Менеджер по продажам</p>
          <p className="contact-phone">+375-29-123-45-67</p>
        </div>
        <img
          src="https://www.nashe.ru/storage/62731/conversions/zGdBGpsXCq-social.jpg"
          alt="Купчин Дауниил Юрьевич"
          className="contact-image"
        />
      </div>
    </div>
  );
}

export default Contacts;