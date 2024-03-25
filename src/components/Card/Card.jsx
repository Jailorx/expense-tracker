import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, color, btnText }) => {
  const linearGradient = `linear-gradient(90deg, ${color.join(", ")})`;
  return (
    <div className={styles.card}>
      <h2 className={styles.card_title}>
        {title}:
        <span className={styles.card_amount} style={{ color: color[1] }}>
          &#8377;5000
        </span>
      </h2>
      <button
        className={styles.card_btn}
        style={{ background: linearGradient }}
      >
        + Add {btnText}
      </button>
    </div>
  );
};

export default Card;
