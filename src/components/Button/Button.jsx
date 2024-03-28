import React from "react";
import styles from "./Button.module.css";

const Button = ({ color, title, method }) => {
  const titleColor = title === "Cancel" ? "black" : "white";
  //   const fontWeight
  return (
    <button
      className={styles.container}
      style={{
        backgroundColor: color,
        fontFamily: "open-sans,sans-serif",
        color: title === "Cancel" ? "black" : "white",
        fontWeight: title === "Cancel" ? 400 : 700,
      }}
      onClick={method}
    >
      {title}
    </button>
  );
};

export default Button;
