import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import SeminarCard from './SeminarCard';
import './App.css';

function App() {
  const [seminars, setSeminars] = useState({});

  useEffect(() => {
      axios
        .get("http://localhost:3001/seminars") 
        .then((response) => {
          // Преобразуем массив в объект
          const seminarsData = response.data || [];
          const seminarsMap = {};
          seminarsData.forEach(seminar => {
              seminarsMap[seminar.id] = seminar;
          });
          setSeminars(seminarsMap); // Сохраняем объект в состояние
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
        });
  }, []);
  const handleDeleteSeminar = (id) => {
    setSeminars((prevSeminars) => {
        const newSeminars = { ...prevSeminars }; // Копируем объект
        delete newSeminars[id]; // Удаляем семинар по id
        return newSeminars; // Возвращаем новый объект
    });
};


  const handleConfirmDelete = async (id) => {
    
    if (id) {
      try {
        axios.delete(`http://localhost:3001/seminars/${id}`).then((response) => {
          if (response.status===200){
            handleDeleteSeminar(id)
          }
          else{
            console.log("Ошибка при удалении")
          }
        })
      } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Ошибка при удалении семинара");
      }
   
    }
  };

  const handleUpdate = async (updateData) => {
      try {
        axios.put(`http://localhost:3001/seminars/${updateData.id}`, updateData).then((response) => {
          console.log(response)
          if (response.status===200){
            console.log("Данные с сервера:", response.data);
            handleUpdateSeminar(updateData)
          }
          else{
            console.log("Ошибка при удалении")
          }
        })
      } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Ошибка при удалении семинара");
      }
    
  };
  
  const handleUpdateSeminar = (updatedData) => { setSeminars(prevSeminars => ({
    ...prevSeminars, // Копируем старые данные
    [updatedData.id]: updatedData // Обновляем конкретный семинар
}));
  };
  const seminarsArray = Object.values(seminars);
  return (
    <div className='seminar-container'>
      <h1>Расписание семинаров</h1>
      {seminarsArray.map(seminar => (
        <div className='seminar-card'>
        <SeminarCard key={seminar.id} seminar={seminar}  />
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          id={seminar.id}
        />
        <Modal seminar={seminar} onSave={handleUpdate}/>
        </div>
      ))}
     
    </div>
  );
}

export default App;