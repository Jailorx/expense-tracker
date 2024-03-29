import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./PieChartContainer.module.css";
import { useData } from "../../context/ExpenseContext";
import historyIcon from "../../assets/history-icon.svg";

function PieChartContainer() {
  const { expenseList } = useData();

  function calculateCategoryPercentage(expenseList) {
    const totalExpense = expenseList.reduce(
      (total, expense) => total + expense.Price,
      0
    );

    const categoryPercentages = {};
    expenseList.forEach((expense) => {
      const { Category, Price } = expense;
      const percentage = (Price / totalExpense) * 100;
      if (Category in categoryPercentages) {
        categoryPercentages[Category] += percentage;
      } else {
        categoryPercentages[Category] = percentage;
      }
    });

    return categoryPercentages;
  }

  const categoryPercentages = calculateCategoryPercentage(expenseList);

  const data = Object.keys(categoryPercentages).map((item) => ({
    name: item,
    value: categoryPercentages[item] || 0,
  }));
  const COLORS = ["#FF9304", "#A000FF", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      {expenseList.length > 0 ? (
        <div className={styles.container}>
          <PieChart width={199} height={199}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div>
            {data.map((ele, index) => (
              <span
                className={styles.category}
                key={ele.name}
                style={{ color: COLORS[index] }}
              >
                <span
                  className={styles.categoryColor}
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                {ele.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyHistory}>
          <img src={historyIcon} alt="history_icon" />
          <h2>You have no history to show</h2>
        </div>
      )}
    </>
  );
}

export default PieChartContainer;
