import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  }

  // remove contact handler
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  // retrive the contacts
  useEffect(() => {
    const retriveContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContact) {
      // console.log(retriveContact);
      setContacts(retriveContact);
    }
  }, []);

  // store the contacts
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className='ui container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
          <Route path='add' element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path='contact/:id' element={<ContactDetail />} />
          <Route path='delete/:id' element={<DeleteContact getContactId={removeContactHandler} />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
