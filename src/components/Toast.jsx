import React from "react";
import styles from "./Toast.module.css";
function Toast({ message, onClose }) {
  return (
    <div className={styles.toast}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
    </div>
  );
}

export default Toast;
