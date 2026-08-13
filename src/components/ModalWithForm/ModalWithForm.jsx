import "./ModalWithForm.css";
import closeIcon from "../../assets/close_button.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
  isValid = true,
  switchLinkText,
  onSwitchClick,
  className = "",
}) {
  const isAuthModal = className === "modal_auth";

  return (
    <div className={`modal ${className} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <form
          onSubmit={onSubmit}
          className="modal__form"
          noValidate={isAuthModal}
        >
          {children}
          {isAuthModal ? (
            <div className="modal__footer">
              <button
                type="submit"
                className={`modal__submit ${
                  isValid ? "" : "modal__submit_disabled"
                }`}
                disabled={!isValid}
              >
                {buttonText}
              </button>
              {switchLinkText && (
                <button
                  type="button"
                  className="modal__switch-link"
                  onClick={onSwitchClick}
                >
                  {switchLinkText}
                </button>
              )}
            </div>
          ) : (
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
