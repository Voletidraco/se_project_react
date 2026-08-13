import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  onAddItemClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const ownItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__add-new-btn"
          onClick={onAddItemClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {ownItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              isLoggedIn={!!currentUser}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
