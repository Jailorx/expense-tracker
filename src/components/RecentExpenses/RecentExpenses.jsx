import { useData } from "../../context/ExpenseContext";
import styles from "./RecentExpenses.module.css";
import historyIcon from "../../assets/history-icon.svg";
import foodIcon from "../../assets/food-icon.svg";
import entertainmentIcon from "../../assets/entertainment-icon.svg";
import travelIcon from "../../assets/travel-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import { useState } from "react";

const getCategoryIcon = (category) => {
  const lowercaseCategory = category.toLowerCase();
  switch (lowercaseCategory) {
    case "entertainment":
      return <img src={entertainmentIcon} alt="entertainment_icon" />;
    case "food":
      return <img src={foodIcon} alt="food_icon" />;
    case "travel":
      return <img src={travelIcon} alt="travel_icon" />;
    default:
      return null;
  }
};

const RecentExpenses = () => {
  const { expenseList, setExpenseList } = useData();

  const handleDelete = (event) => {
    console.log(event.target);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const historyPerPage = 3;

  const lastItem = currentPage * historyPerPage;
  const firstItem = lastItem - historyPerPage;
  const currentItemList = expenseList.slice(firstItem, lastItem);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.container}>
      <h2>Recent Expenses</h2>
      <div className={styles.listContainer}>
        {currentItemList.length > 0 ? (
          <>
            {currentItemList.map((expense, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.expenseDetails}>
                  {getCategoryIcon(expense.Category)}
                  <h3>{expense.Title}</h3>
                </div>
                <div className={styles.pricingDetails}>
                  <p style={{ color: "#F4BB4A" }}>&#8377;{expense.Price}</p>
                  <button className={styles.btn} onClick={handleDelete}>
                    <img src={deleteIcon} alt="delete_icon" />
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.pagination}>
              <button
                className={styles.btns}
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                &#8592;
              </button>
              <span className={styles.currentPage}>{currentPage}</span>
              <button
                className={styles.btns}
                onClick={nextPage}
                disabled={
                  Math.ceil(expenseList.length / historyPerPage) <= currentPage
                }
              >
                &#8594;
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyHistory}>
            <img src={historyIcon} alt="history_icon" />
            <h2>You have no history to show</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
