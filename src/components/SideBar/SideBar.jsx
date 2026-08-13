import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return null;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <p className="sidebar__avatar sidebar__avatar_placeholder">
            {currentUser.name ? currentUser.name[0].toUpperCase() : "?"}
          </p>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__signout-btn"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
