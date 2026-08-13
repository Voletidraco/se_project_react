import { useContext } from "react";
import "./ItemModal.css";
import closeIconWhite from "../../assets/close_button_white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({ isOpen, selectedCard, closeActiveModal, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    currentUser && selectedCard.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;

  const handleDeleteClick = () => {
    onDeleteItem(selectedCard._id);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close_preview"
        >
          <img src={closeIconWhite} alt="Close" />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__caption">{selectedCard.name}</h2>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>
          <button
            onClick={handleDeleteClick}
            type="button"
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
