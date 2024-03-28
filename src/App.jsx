import styles from "./App.module.css";
import ExpenseCalculator from "./components/ExpenseCalculator/ExpenseCalculator";
import RecentExpenses from "./components/RecentExpenses/RecentExpenses";
import TopExpenses from "./components/TopExpenses/TopExpenses";

function App() {
  return (
    <>
      <h1>Expense tracker</h1>
      <ExpenseCalculator />
      <div className={styles.expensesView}>
        <RecentExpenses />
        <TopExpenses />
      </div>
    </>
  );
}

export default App;
