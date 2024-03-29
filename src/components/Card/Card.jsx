import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import Modal from "../Modal/Modal";
import { useData } from "../../context/ExpenseContext";
import { useSnackbar } from "notistack";

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

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { expenseList, setExpenseList } = useData();

  const [walletBalance, setWalletBalance] = useState(() => {
    return parseInt(localStorage.getItem("walletBalance")) || 5000;
  });

  const [totalExpenses, setTotalExpenses] = useState(() => {
    return parseInt(localStorage.getItem("totalExpenses")) || 0;
  });

  useEffect(() => {
    const sum = expenseList.reduce(
      (acc, curr) => acc + parseInt(curr.Price),
      0
    );
    setTotalExpenses(sum);
    localStorage.setItem("totalExpenses", sum);
  }, [expenseList]);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
  }, [walletBalance]);

  const validate = (data) => {
    const { Title, Price, Category } = data;

    if (!Title || !Title.trim()) {
      setIsModalVisible(false);
      enqueueSnackbar("Please provide a title", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }

    if (!Price || isNaN(Price) || Price <= 0) {
      enqueueSnackbar("Please provide a valid positive price", {
        variant: "error",
      });
      return false;
    }

    if (!Price || Price > walletBalance) {
      enqueueSnackbar("Expense amount exceeds wallet balance", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }

    if (!Category || !Category.trim()) {
      enqueueSnackbar("Please provide a category", { variant: "error" });
      return false;
    }

    const validCategories = ["entertainment", "food", "travel"];
    if (!validCategories.includes(Category.toLowerCase())) {
      enqueueSnackbar("Category must be entertainment, food, or travel", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }

    return true;
  };

  const handleFormData = (data) => {
    if (data.hasOwnProperty("Income Amount")) {
      if (data["Income Amount"] > 0) {
        if (data["Income Amount"] > 10000) {
          enqueueSnackbar(
            "Cannot add wallet balance more than ten thousand at a time",
            { variant: "warning", autoHideDuration: 2000 }
          );
        } else {
          setWalletBalance((prev) => prev + parseInt(data["Income Amount"]));
        }
      }
    } else {
      // Handle expense
      if (validate(data)) {
        const expenseAmount = parseInt(data.Price);

        if (expenseAmount > walletBalance) {
          // Expense amount exceeds wallet balance
          enqueueSnackbar("Expense amount exceeds wallet balance", {
            variant: "error",
          });
        } else {
          setWalletBalance((prev) => prev - expenseAmount);
          setExpenseList([data, ...expenseList]);
        }
      }
    }
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
            &#8377;{title === "Wallet Balance" ? walletBalance : totalExpenses}
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
