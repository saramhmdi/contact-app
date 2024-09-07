import React from "react";
import ContactItem from "./ContactItem";

import styles from "./ContactsList.module.css";

function ContactsList({
  contacts,
  deleteHandler,
  editHandler,
  handleSelect,
  selectedContacts,
  isShowSelected,
}) {
  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>
      {contacts.length ? (
        <ul className={styles.contact}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              handleSelect={handleSelect}
              isSelected={selectedContacts.includes(contact.id)}
              isShowSelected={isShowSelected}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Cantacts Yet!</p>
      )}
    </div>
  );
}

export default ContactsList;
