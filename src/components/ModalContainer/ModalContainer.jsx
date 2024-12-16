import { useEffect } from "react";
import css from "./ModalContainer.module.css";

const ModalContainer = ({ onClose, children }) => {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "visible";
    };
  });

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      {children}
    </div>
  );
};

export default ModalContainer;
