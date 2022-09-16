import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import api from '../api/contacts';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';
import ContactEdit from './ContactEdit';

function App() {
  //const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [selectTerm, setSelectTerm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
  const [recordsPerPage] = useState(1); // No of Records to be displayed on each page  
  //const indexOfLastRecord = currentPage * recordsPerPage;
  //const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; 
  //const currentRecords = contacts.slice(indexOfFirstRecord, indexOfLastRecord); // Records to be displayed on the current page
  //const nPages = Math.ceil(contacts.length / recordsPerPage);
  
  const [initRecords, setInitRecords] = useState([]);
  const [initnPages, setInitnPages] = useState(0);
  
  // Pagination handler
  const setCurrentPageHandler = (values, searchTerm, filterTerm) => {
    searchTerm = typeof searchTerm === 'undefined' ? "" : searchTerm;
    filterTerm = typeof filterTerm === 'undefined' ? "" : filterTerm;
    filterHandler(values, searchTerm, filterTerm);
    setCurrentPage(values);
  };
  
  // Retrive Contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts", request);
    //setContacts([...contacts, { id: uuidv4(), ...contact }]);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  // remove contact handler
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);

  }

  // Function to handle the filter
  const filterHandler = (currentPage, searchTerm, filterTerm) => {
    console.log(searchTerm, filterTerm);
    setSearchTerm(searchTerm);
    if(searchTerm !== '' && filterTerm !== '') {
      const searchResults = contacts.filter( (contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      const newSearchResults = searchResults.filter( (contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(filterTerm);
      });
      
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; 
      const currentRecords = newSearchResults.slice(indexOfFirstRecord, indexOfLastRecord);
      setInitRecords(currentRecords);

      const nPages = Math.ceil(newSearchResults.length / 1);
      setInitnPages(nPages);
    } else if(searchTerm !== '') {
      const newSearchResults = contacts.filter( (contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; 
      const currentRecords = newSearchResults.slice(indexOfFirstRecord, indexOfLastRecord);
      setInitRecords(currentRecords);

      const nPages = Math.ceil(newSearchResults.length / 1);
      setInitnPages(nPages);
    } else if(filterTerm !== '') {
      const newSearchResults = contacts.filter( (contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(filterTerm);
      });
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; 
      const currentRecords = newSearchResults.slice(indexOfFirstRecord, indexOfLastRecord);
      setInitRecords(currentRecords);

      const nPages = Math.ceil(newSearchResults.length / 1);
      setInitnPages(nPages);
    } else {
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; 
      const currentRecords = contacts.slice(indexOfFirstRecord, indexOfLastRecord);
      setInitRecords(currentRecords);

      const nPages = Math.ceil(contacts.length / 1);
      setInitnPages(nPages);
    }
  };

  const searchHandler = (searchTerm, filterTerm) => {
    filterHandler(currentPage, searchTerm, filterTerm);
  }

  // retrive the contacts
  useEffect(() => {
    // const retriveContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContact) {
    //   setContacts(retriveContact);
    // }
    const getAllContacts = async () => {
      const getContacts = await retriveContacts();
      if (getContacts) {
        setContacts(getContacts);
        setSelectTerm(getContacts);

        const indexOfLastRecord = 1 * 1;
        const indexOfFirstRecord = indexOfLastRecord - 1;
        setInitRecords(getContacts.slice(indexOfFirstRecord, indexOfLastRecord));

        const nPages = Math.ceil(getContacts.length / 1);
        setInitnPages(nPages);
      }
    };

    getAllContacts();
  }, []);

  // store the contacts
  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className='ui container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
            path='/' 
            element={
              <ContactList 
                contacts={initRecords.length < 1 ? initRecords : initRecords} 
                getContactId={removeContactHandler} 
                term={searchTerm}
                searchKeyword={searchHandler}
                filterTerm={selectTerm}
                nPages = { initnPages }
                currentPage = { currentPage } 
                setCurrentPage = { setCurrentPageHandler }
              />
            } 
          />
          <Route path='add' element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path='contact/:id' element={<ContactDetail />} />
          <Route path='delete/:id' element={<DeleteContact getContactId={removeContactHandler} />} />
          {/* <Route path='edit' element={<ContactEdit {...props} updateContactHandler={updateContactHandler} />} /> */}
          <Route
            path="edit"
            element={
              <ContactEdit
                updateContactHandler={updateContactHandler}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
