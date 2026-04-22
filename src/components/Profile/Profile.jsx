import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  onAddItemClick,
  clothingItems,
  handleCardClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        onAddItemClick={onAddItemClick}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}
