import React from "react";
import SimpleDateTime  from 'react-simple-timestamp-to-date';

const Message = ({ userId, message }) => {
    console.log('userId', userId)
    console.log('message', message)
    return (
        <div className={`row ${
            userId === message.userId ? "justify-content-end" : ""
        }`}>
            <div className="col-md-6">
                <small className="text-muted">
                    <strong>{message.user.firstName + ' ' + message.user.lastName} | </strong>
                </small>
                <small className="text-muted float-right">
                    <SimpleDateTime dateFormat="DMY" dateSeparator="."  timeSeparator=":">{message.timestamp}</SimpleDateTime>
                </small>
                <div className={`alert alert-${
                    userId === message.userId ? "primary" : "secondary"
                }`} role="alert">
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Message;