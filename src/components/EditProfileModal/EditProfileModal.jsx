import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

const EditProfileModal = ({ isOpen, onUpdateUser, closeActiveModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  const isValid = values.name.trim().length >= 2 && values.avatar.trim() !== "";

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeActiveModal={closeActiveModal}
      isValid={isValid}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="edit-avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
