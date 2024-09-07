import React from "react";
import inputs from "../constants/inputs";

import styles from "./Form.module.css";
function Form({ contact, blurHandler, changeHandler, errors, addHandler }) {
  return (
    <div className={styles.form}>
      {inputs.map((input, index) => (
        <div className={styles.inputWrapper} key={index}>
          <input
            type={input.type}
            value={contact[input.name]}
            name={input.name}
            placeholder={input.placeholder}
            onBlur={blurHandler}
            onChange={changeHandler}
          />
          <p className={styles.error}>{errors[input.name]}</p>
        </div>
      ))}
      <button onClick={addHandler}>
        {contact.id ? "Edit Contact" : "Add Contact"}
      </button>
    </div>
  );
}

export default Form;
