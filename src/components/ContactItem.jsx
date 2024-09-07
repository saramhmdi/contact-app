import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, email, phone },
  deleteHandler,
  editHandler,
  handleSelect,
  isSelected,
  isShowSelected,
}) {
  return (
    <li className={styles.item}>
      <p>{name}</p>
      <p>
        <span>
          <MdAlternateEmail />
        </span>
        {email}
      </p>
      <p>
        <span>
          <FaPhoneAlt />
        </span>
        {phone}
      </p>
      <div>
        <button onClick={() => editHandler(id)}>
          <GrEdit />
        </button>
        <button onClick={() => deleteHandler(id)}>
          <RiDeleteBinLine />
        </button>
        {isShowSelected && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleSelect(id)}
          />
        )}
      </div>
    </li>
  );
}

export default ContactItem;
