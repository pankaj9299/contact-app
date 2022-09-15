import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);
    const nextPage = () => {
        if (props.currentPage !== props.nPages) props.setCurrentPage(props.currentPage + 1)
    }
    const prevPage = () => {
        if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1)
    }

    const inputE1 = useRef("");
    const inputE2 = useRef("");
    const deleteHandler = (id) => {
        props.getContactId(id);
    };

    const getSearchTerm = () => {
        props.searchKeyword(inputE1.current.value, inputE2.current.value);
    }

    const selectVal = () => {
        props.selectFilter(inputE2.current.value);
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

    const selectOptions = props.filterTerm.map((contact) => {
        return (
            <option key={contact.id} value={contact.email}>{contact.email}</option>
        );
    });
    return (
        <div className="main" style={{ marginTop: "50px" }}>
            <div className="ui grid">
                <div className="eight wide column">
                    <h3>Contact List</h3>
                </div>
                <div className="eight wide column">
                    <Link to="/add">
                        <button className="ui button blue right floated">Add Contact</button>
                    </Link>
                </div>
            </div>
            <div className="ui grid">
                <div className="three wide column">
                    <div className="ui form">
                        <div className="field">
                            <select className="ui dropdown" ref={inputE2} onChange={getSearchTerm}>
                                <option value="">Email</option>
                                {selectOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="thirteen wide column">
                    <div className="ui search">
                        <div className="ui icon input" style={{ marginTop: "10px", width: "100%" }}>
                            <input ref={inputE1} type="text" onChange={getSearchTerm} placeholder="Search here ..." className="" />
                            <i className="search icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList}
            </div>
            <div className="ui pagination menu">
                <a className="item" onClick={prevPage}>
                    Previous
                </a>
                {pageNumbers.map(pgNumber => (
                    <a key={pgNumber} className={`item ${props.currentPage == props.pgNumber ? 'active' : ''} `} onClick={() => props.setCurrentPage(pgNumber)}>
                        {pgNumber}
                    </a>
                ))}
                <a className="item" onClick={nextPage}>
                    Next
                </a>
            </div>
        </div>
    );
}

export default ContactList;