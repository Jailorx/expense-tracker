import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const Modal = ({ title, inputFields, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleInputChange = (event) => {
    // console.log(event.target.placeholder);
    const { placeholder, value } = event.target;
    setFormData({ ...formData, [placeholder]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.content}>
          <h3>{title}</h3>
          <div className={styles.flex}>
            {Object.keys(inputFields).map((inputField) => (
              <input
                key={inputField}
                type={inputFields[inputField]}
                placeholder={inputField}
                onChange={handleInputChange}
              />
            ))}
            <Button color="#F4BB4A" title={title} method={handleSubmit} />
            <Button color="#D9D9D9" title="Cancel" method={onClose} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
