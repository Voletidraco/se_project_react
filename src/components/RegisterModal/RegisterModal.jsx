import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "../AuthModal.css";

const defaultValues = { name: "", avatar: "", email: "", password: "" };

const RegisterModal = ({
  isOpen,
  onRegister,
  closeActiveModal,
  onLoginClick,
  authError,
}) => {
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  const isValid =
    values.name.trim().length >= 2 &&
    values.avatar.trim() !== "" &&
    values.email.trim() !== "" &&
    values.password.trim() !== "";

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      className="modal_auth"
      buttonText="Sign Up"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeActiveModal={closeActiveModal}
      isValid={isValid}
      switchLinkText="or Log In"
      onSwitchClick={onLoginClick}
    >
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {authError && <p className="modal__error">{authError}</p>}
    </ModalWithForm>
  );
};

export default RegisterModal;
