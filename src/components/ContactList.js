import React from "react";
import { Link } from 'react-router-dom';
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    // console.log('contact');
    const deleteHandler = (id) => {
        props.getContactId(id);
     };

    const renderContactList = props.contacts.map((contact) => {
       
        return (
            <ContactCard 
                contact={contact} 
                clickHandler={deleteHandler}
                key={contact.id}
            /> 
        );
    });
    return (
        <div className="main" style={{marginTop: "50px"}}>
            <h3>Contact List
                <Link to="/add">
                    <button className="ui button blue right floated">Add Contact</button>
                </Link>
            </h3>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    );
}

export default ContactList;