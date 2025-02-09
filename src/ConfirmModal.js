import { useRef, useEffect} from "react";
import "./App.css";

function ConfirmModal({onConfirm, id}){
    const dialogRef = useRef(null);

    const openModal = () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      };
      const closeModal = () => {
        if (dialogRef.current) {
          dialogRef.current.close(); // Встроенный метод для закрытия
        }
      };
  return (
  <div>
    <button onClick={openModal} className="delete-button">
          Удалить
        </button>
        <div className="modal">
<dialog ref={dialogRef} className="modal">
<div className="modal-content">
<p>Вы уверены, что хотите удалить семинар?</p>
<div className="confirmation-footer">
<button onClick={()=>{onConfirm(id); closeModal()}}>Да</button>
<button onClick={closeModal}>Нет</button>
</div>
</div>
</dialog>
</div>
  </div>)
}

export default ConfirmModal