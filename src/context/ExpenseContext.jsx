import React, { createContext, useState, useContext } from "react";

const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState([]);

  return (
    <ExpenseContext.Provider value={{ expenseList, setExpenseList }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useData = () => useContext(ExpenseContext);
