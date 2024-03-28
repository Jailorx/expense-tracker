import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./PieChartContainer.module.css";

function PieChartContainer() {
  const data = [
    { name: "Entertainment", value: 600 },
    { name: "Food", value: 300 },
    { name: "Travel", value: 100 },
  ];
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
    // <ResponsiveContainer width="100%" height="100%">
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div>
        {data.map((ele, index) => (
          <span className={styles.category} key={ele.name}>
            <span
              className={styles.categoryColor}
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            {ele.name}
          </span>
        ))}
      </div>
    </div>
    // </ResponsiveContainer>
  );
}

export default PieChartContainer;
