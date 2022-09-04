import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteContact = (props) => {
    const location = useLocation();
    const {contactId} = location.state;
    const { navigation } = props;
    const deleteHandler = (id) => {
        props.getContactId(id);
        navigation('/');
    };

    const backHandler = (props) => {
        navigation('/');
    };
    return (
        <div className="main" style={{marginTop: "70px"}}>
            <div className="ui centered cards">
                <div className="card">
                    <div className="content">
                        <div className="header">
                            Are you want to delete?
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button" onClick={() => deleteHandler(contactId)}>Yes</div>
                            <div className="ui basic red button" onClick={() => backHandler()}>No</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function(props) {
    const navigation = useNavigate();
    return <DeleteContact {...props} navigation={navigation} />;
}
