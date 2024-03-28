import { useData } from "../../context/ExpenseContext";
import styles from "./RecentExpenses.module.css";
import historyIcon from "../../assets/history-icon.svg";

const RecentExpenses = () => {
  const { expenseList, setExpenseList } = useData();
  return (
    <div className={styles.container}>
      <h2>Recent Expenses</h2>
      <div className={styles.listContainer}>
        {expenseList.length > 0 ? (
          <>
            <h1>hello</h1>
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
