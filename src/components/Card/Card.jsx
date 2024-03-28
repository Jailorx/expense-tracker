import React, { useState } from "react";
import styles from "./Card.module.css";
import Modal from "../Modal/Modal";

const Card = ({ title, color, btnText }) => {
  const linearGradient = `linear-gradient(90deg, ${color.join(", ")})`;
  const modalTitle = title.split(" ");
  const inputFields =
    btnText === "Expense"
      ? {
          Title: "text",
          Price: "number",
          "Select Category": "select",
          "dd/mm/yyyy": "date",
        }
      : {
          "Income Amount": "number",
        };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.card_title}>
          {title}:
          <span className={styles.card_amount} style={{ color: color[1] }}>
            &#8377;5000
          </span>
        </h2>
        <button
          className={styles.card_btn}
          style={{ background: linearGradient }}
          onClick={handleModalOpen}
        >
          + Add {btnText}
        </button>
      </div>
      {isModalVisible && (
        <Modal
          title={`Add ${modalTitle[modalTitle.length - 1]}`}
          inputFields={inputFields}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Card;
