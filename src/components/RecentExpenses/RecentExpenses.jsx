import { useData } from "../../context/ExpenseContext";
import styles from "./RecentExpenses.module.css";
import historyIcon from "../../assets/history-icon.svg";
import foodIcon from "../../assets/food-icon.svg";
import entertainmentIcon from "../../assets/entertainment-icon.svg";
import travelIcon from "../../assets/travel-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

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

  return (
    <div className={styles.container}>
      <h2>Recent Expenses</h2>
      <div className={styles.listContainer}>
        {expenseList.length > 0 ? (
          expenseList.map((expense, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.expenseDetails}>
                {getCategoryIcon(expense.Category)}
                <h3>{expense.Title}</h3>
              </div>
              <div className={styles.pricingDetails}>
                <p style={{ color: "#F4BB4A" }}>&#8377;{expense.Price}</p>
                <button className={styles.btn}>
                  <img src={deleteIcon} alt="delete_icon" />;
                </button>
              </div>
            </div>
          ))
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
