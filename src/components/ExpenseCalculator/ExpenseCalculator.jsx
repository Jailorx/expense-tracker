import React from "react";
import Card from "../Card/Card";
import styles from "./ExpenseCalculator.module.css";
import PieChartContainer from "../PieChart/PieChartContainer";

const ExpenseCalculator = () => {
  return (
    <div className={styles.container}>
      <Card
        title="Wallet Balance"
        color={["#B5DC52", "#89E148"]}
        btnText="Income"
      />
      <Card
        title="Expenses"
        color={["#FF9595", "#FF4747", "#FF3838"]}
        btnText="Expense"
      />
      <PieChartContainer />
    </div>
  );
};

export default ExpenseCalculator;
