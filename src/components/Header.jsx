import React from "react";
import styles from "./Header.module.css";
function Header() {
  return (
    <div className={styles.container}>
      <h1>Contact App</h1>
      <p>An app to add and manage contacts with name and email</p>
    </div>
  );
}

export default Header;
