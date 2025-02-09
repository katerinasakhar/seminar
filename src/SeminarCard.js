import React from 'react';

import './App.css'

const SeminarCard = ({ seminar}) => {
  // Отображение карточки семинара 
  return (
    <div >
      <img src={`/pics/${seminar.id}.jpg`} alt={seminar.title} className="seminar-image" /> 
        <h2>{seminar.title}</h2>
        <div className='date-time'>
            <div>
                <svg width="24" height="24">   
                <use xlinkHref="/icons/sprite.svg#icon-calendar"></use>
                </svg>
                {seminar.date}
                </div>
            <div><svg width="24" height="24">   
                <use xlinkHref="/icons/sprite.svg#icon-clock"></use>
                </svg> {seminar.time}</div>
        
      
        <p>{seminar.description}</p>
        
       
      </div>
    </div>
  );
};

export default SeminarCard;