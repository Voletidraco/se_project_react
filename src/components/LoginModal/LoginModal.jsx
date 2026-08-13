import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "../AuthModal.css";

const defaultValues = { email: "", password: "" };

const LoginModal = ({
  isOpen,
  onLogin,
  closeActiveModal,
  onRegisterClick,
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
    onLogin(values);
  }

  const isValid = values.email.trim() !== "" && values.password.trim() !== "";

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      className="modal_auth"
      buttonText="Log In"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeActiveModal={closeActiveModal}
      isValid={isValid}
      switchLinkText="or Sign Up"
      onSwitchClick={onRegisterClick}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      {authError && <p className="modal__error">{authError}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
