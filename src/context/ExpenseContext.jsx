import React, { createContext, useState, useContext, useEffect } from "react";

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState(
    loadFromLocalStorage("expenseList") || []
  );

  useEffect(() => {
    saveToLocalStorage("expenseList", expenseList);
  }, [expenseList]);

  return (
    <ExpenseContext.Provider value={{ expenseList, setExpenseList }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useData = () => useContext(ExpenseContext);
