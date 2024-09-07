import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

import styles from "./SearchDeleteBox.module.css";
function SearchDeleteBox({
  searchContact,
  setSearchContact,
  dleteSelectedHandler,
  isShowSelected,
  showSelectItem,
}) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="ُ🔍Search"
        value={searchContact}
        onChange={(e) => setSearchContact(e.target.value)}
      />
      <button onClick={isShowSelected ? dleteSelectedHandler : showSelectItem}>
        <MdOutlineDeleteOutline />
      </button>
    </div>
  );
}

export default SearchDeleteBox;
