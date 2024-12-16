import ModalContainer from "../ModalContainer/ModalContainer.jsx";
import css from "./SettingsModal.module.css";
import SettingForm from "../SettingForm/SettingForm.jsx";
import UserPhoto from "../UserPhoto/UserPhoto";
import sprite from "../../icons/sprite.svg";

export default function SettingsModal({ isOpen = true, onClose }) {
  return (
    <>
      {isOpen && (
        <ModalContainer onClose={onClose}>
          <div className={css.modal}>
            <div className={css.wrap}>
              <h2 className={css.title}>Setting</h2>
              <button
                type="button"
                className={css.close}
                aria-label="Close"
                onClick={onClose}
              >
                <svg width={24} height={24} className={css.icon}>
                  <use href={`${sprite}#icon-close`} />
                </svg>
              </button>
            </div>
            <UserPhoto />
            <SettingForm onClose={onClose} />
          </div>
        </ModalContainer>
      )}
    </>
  );
}
