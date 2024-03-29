import React, { useState } from "react";
import styles from "./Card.module.css";
import Modal from "../Modal/Modal";
import { useData } from "../../context/ExpenseContext";

const Card = ({ title, color, btnText }) => {
  const linearGradient = `linear-gradient(90deg, ${color.join(", ")})`;
  const modalTitle = title.split(" ");
  const inputFields =
    btnText === "Expense"
      ? {
          Title: "text",
          Price: "number",
          Category: "text",
          "dd/mm/yyyy": "date",
        }
      : {
          "Income Amount": "number",
        };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { expenseList, setExpenseList } = useData();
  const [walletBalance, setWalletBalance] = useState(5000);

  const handleFormData = (data) => {
    if (data.hasOwnProperty("Income Amount")) {
      if (data["Income Amount"] > 0) {
        setWalletBalance((prev) => prev + parseInt(data["Income Amount"]));
      }
    } else setExpenseList([data, ...expenseList]);
  };

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
            &#8377;{walletBalance}
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
          onSubmit={handleFormData}
        />
      )}
    </>
  );
};

export default Card;
