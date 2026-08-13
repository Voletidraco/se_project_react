import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  onAddItemClick,
  clothingItems,
  handleCardClick,
  onCardLike,
  onEditProfileClick,
  onSignOut,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        onAddItemClick={onAddItemClick}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
      />
    </section>
  );
}
