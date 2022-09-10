import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContactEdit = (props) => {
    const location = useLocation();
    const history = useNavigate();
    const { id, name, email } = location.state.contact;
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);

    const update = (e) => {
        e.preventDefault();
        if(newName === '' || newEmail === '') {
            alert('All fields are mandatory');
            return;
        }

        props.updateContactHandler({
            id,
            name: newName,
            email: newEmail
        });
        setNewName("");
        setNewEmail("");
        history('/');
    }
    return (
        <div className="ui main" style={{ marginTop: "70px" }}>
            <h2>Edit Component 1</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
}

export default ContactEdit;