import React, { useState } from "react";
import { v4 } from "uuid";

import ContactsList from "./ContactsList";
import SearchDeleteBox from "./SearchDeleteBox";
import Toast from "./Toast";
import DeletionModal from "./DeletionModal";
import Form from "./Form";

import { validateField } from "../constants/utils";

import styles from "./Contacts.module.css";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isShowSelected, setisShowSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    job: "",
    email: "",
    phone: "",
  });

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const blurHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const addHandler = () => {
    if (!contact.name || !contact.email || !contact.phone) {
      setAlert("please enter valid data!");
      return;
    }
    if (Object.values(errors).some((error) => error)) {
      setAlert("Please correct the errors before submitting.");
      return;
    }
    setAlert("");
    if (contact.id) {
      setContacts((contacts) =>
        contacts.map((c) => (c.id === contact.id ? contact : c))
      );
      setContact({
        name: "",
        job: "",
        email: "",
        phone: "",
      });
      showToastMessage("Contact updated successfully!");
    } else {
      const newContact = { ...contact, id: v4() };
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setContact({
        name: "",
        job: "",
        email: "",
        phone: "",
      });
      showToastMessage("Contact added successfully!");
    }
  };

  const deleteContacts = (ids) => {
    const newContacts = contacts.filter((contact) => !ids.includes(contact.id));
    setContacts(newContacts);
    setSelectedContacts([]);
    setisShowSelected(false);
    showToastMessage("Contact(s) deleted successfully!");
  };

  const handleDelete = (ids) => {
    setSelectedContacts(ids);
    setIsModalOpen(true);
  };

  const confirmDeleteHandler = () => {
    deleteContacts(selectedContacts);
    setIsModalOpen(false);
  };

  const editHandler = (id) => {
    const editContact = contacts.find((contact) => contact.id === id);
    setContact(editContact);
  };

  const filteredContacts = contacts.filter(({ name, job, email, phone }) =>
    [name, job, email, phone].some((field) =>
      field.toLowerCase().includes(searchContact.toLowerCase())
    )
  );

  const handleSelect = (id) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className={styles.container}>
      <Form
        contact={contact}
        blurHandler={blurHandler}
        changeHandler={changeHandler}
        errors={errors}
        addHandler={addHandler}
      />
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <SearchDeleteBox
        searchContact={searchContact}
        setSearchContact={setSearchContact}
        isShowSelected={isShowSelected}
        showSelectItem={() => setisShowSelected(true)}
        dleteSelectedHandler={() => handleDelete(selectedContacts)}
      />
      <ContactsList
        contacts={filteredContacts}
        deleteHandler={(id) => handleDelete([id])}
        editHandler={editHandler}
        selectedContacts={selectedContacts}
        handleSelect={handleSelect}
        isShowSelected={isShowSelected}
      />
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
      {isModalOpen && (
        <DeletionModal
          message="Are you sure you want to delete the selected contact(s)?"
          onConfirm={confirmDeleteHandler}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
