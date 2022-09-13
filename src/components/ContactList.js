import React, {useRef} from "react";
import { Link } from 'react-router-dom';
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const inputE1 = useRef("");
    const deleteHandler = (id) => {
        props.getContactId(id);
     };

     const getSearchTerm = () => {
        props.searchKeyword(inputE1.current.value);
     }

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
                <div className="ui search">
                    <div className="ui icon input" style={{marginTop: "10px", width: "100%"}}>
                        <input ref={inputE1} type="text" value={props.term} onChange={ getSearchTerm } placeholder="Search here ..." className="prompt" />
                        <i className="search icon"></i>
                    </div>
                </div>
            </h3>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    );
}

export default ContactList;