import React, { useState } from "react";
import axios from 'axios'

const MessageInput = ({ rootUrl }) => {
    const [message, setMessage] = useState("");
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    const messageRequest = async (text) => {
        try {
            console.log(text)
            await axios.post(`${rootUrl}/message`, {
                text: text,
            }, {headers}).catch(error => {
                console.log(error);
                console.log(error.response);
                console.log(error.response.data.message);
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        messageRequest(message);
        setMessage("");
    };

    return (
        <div className="input-group">
            <input onChange={(e) => setMessage(e.target.value)}
                   autoComplete="off"
                   type="text"
                   className="form-control"
                   placeholder="Message..."
                   value={message}
            />
            <div className="input-group-append">
                <button onClick={(e) => sendMessage(e)}
                        className="btn btn-primary"
                        type="button">Send</button>
            </div>
        </div>
    );
};

export default MessageInput;