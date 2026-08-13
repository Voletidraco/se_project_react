import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, isLoggedIn, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLoggedIn && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike item" : "Like item"}
        >
          &#9829;
        </button>
      )}
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
