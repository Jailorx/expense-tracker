import styles from "./App.module.css";
import ExpenseCalculator from "./components/ExpenseCalculator/ExpenseCalculator";
import { ExpenseContextProvider } from "./context/ExpenseContext";
import RecentExpenses from "./components/RecentExpenses/RecentExpenses";
import TopExpenses from "./components/TopExpenses/TopExpenses";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <h1>Expense tracker</h1>
      <SnackbarProvider>
        <ExpenseContextProvider>
          <ExpenseCalculator />
          <div className={styles.expensesView}>
            <RecentExpenses />
            {/* <TopExpenses /> */}
          </div>
        </ExpenseContextProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
