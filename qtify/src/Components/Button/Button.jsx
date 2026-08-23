import React from "react";
import styles from "./Button.module.css";

function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default Button;
