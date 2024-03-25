import React from "react";
import Card from "../Card/Card";

const ExpenseCalculator = () => {
  return (
    <>
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
    </>
  );
};

export default ExpenseCalculator;
