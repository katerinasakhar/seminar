import { useRef, useState } from "react";
import "./App.css"; 

function Modal({seminar, onSave}){
    const [formData, setFormData] = useState(seminar);
    const dialogRef = useRef(null); // Ссылка на элемент <dialog>
    const openModal = () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      };
      const handleChange = (e) => {
        if (e.target.name!=="date"){ // Т.к. в input type date дата представлена в формате YYYY-MM-DD то полученные данные преобразуем в нужный формат
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }
    else {
        setFormData({
            ...formData,
            [e.target.name]: formatDateToDDMMYYYY(e.target.value),
          });
    }
      };
    
      const closeModal = () => {
        if (dialogRef.current) {
          dialogRef.current.close(); // Встроенный метод для закрытия
        }
      };
      // Преобразования дат из разных форматов
      function formatDateToYYYYMMDD(dateString) {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    }
    function formatDateToDDMMYYYY(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    }
      return (
        <div >
             <button onClick={openModal} className="edit-button">
          Редактировать
        </button>
        <div className="modal">
          {/* Модальное окно */}
          <dialog ref={dialogRef} className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Редактирование семинара</h2>
                <button onClick={closeModal} className="close-button">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <label>
                    Название семинара:
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                  </label>
                  <label>
                    Дата проведения:
                    <input type="date" name="date" value={formatDateToYYYYMMDD(formData.date)} onChange={handleChange}/>
                  </label>
                  <label>
                    Время проведения:
                    <input type="time" name="time" value={formData.time} onChange={handleChange}/>
                  </label>
                  <label>
                    Описание:
                    <textarea name="description" rows={4} value={formData.description} onChange={handleChange}/>
                  </label>
                </form>
              </div>
              <div className="modal-footer">
                <button onClick={() => { onSave(formData); closeModal();} }>Сохранить</button>
                <button onClick={closeModal}>Закрыть</button>
              </div>
            </div>
          </dialog>
          </div>
        </div>
      );
    }
    
    export default Modal;

