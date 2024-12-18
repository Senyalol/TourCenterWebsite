import React, {useState} from 'react';
import './Home.css'


const Home = () => {

  const images = ["https://www.state.gov/wp-content/uploads/2022/01/shutterstock_248799484-scaled.jpg",
                  "https://vitvesti.by/images/2021/05/28/polotsk-1.jpg",
                  "https://edem-v-gosti.ru/upload/iblock/675/809783734683405897634694056.jpg",
                  "http://www.ilva.by/images/stories/Vitebsk/Noch/23.jpg",
                  "https://avatars.mds.yandex.net/i?id=29e69f734daa11796e1c3ed54b2a32a8_l-4987522-images-thumbs&n=13",
                  "https://avatars.mds.yandex.net/i?id=d569211d5060fb69ac480820c7988088_l-5234329-images-thumbs&n=13"

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };


  
  return (
    <div style={homeStyle}>
      <h2>Добро пожаловать в наше туристическое агентство!</h2>
      <p>Мы предлагаем лучшие туры по всему миру.</p>
      <p>Свяжитесь с нами для получения дополнительной информации.</p>
        
      
      <img src={images[currentIndex]} alt={`Фото ${currentIndex + 1}`} className='photos'/>

      <div>
        <button onClick={prevImage} className="button">Назад</button>
        <button onClick={nextImage} className="button">далее</button>
      </div>

    </div>
  );
};



const homeStyle = {
  padding: '20px',
  textAlign: 'center',
};

export default Home;