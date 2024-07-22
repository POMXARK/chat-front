import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import axios from 'axios'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import 'bootstrap/dist/css/bootstrap.min.css';

window.Pusher = Pusher;

const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    authEndpoint: import.meta.env.VITE_APP_BACKEND_URL + '/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    },
    enabledTransports: ['ws', 'wss'],
});

const ChatBox = ({ rootUrl, chatId }) => {

    const webSocketChannel = `notification.${chatId}`;

    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', async (e) => {
                // e.message
                await getMessages();
            });
    }

    const getMessages = async () => {
        try {
            const m = await axios.get(`${rootUrl}/messages/${chatId}`, {headers}).catch(error => {
                console.log(error.response);
            });
            setMessages(m.data.data);
            setTimeout(scrollToBottom, 0);
            console.log('messages', m.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getMessages();
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    return (
        <div>
            <div className="col-md-8 offset-md-2">
                <div className="card">
                    <div className="card-header">Chat Box</div>
                    <div className="card-body"
                         style={{height: "70vh", overflowY: "auto"}}>
                        {
                            messages?.map((message) => {
                                console.log('message', message)
                                return (
                                    <Message key={message.messageId}
                                             userId={parseInt(localStorage.getItem('userId'))}
                                             message={message}
                                    />
                                    )
                            })
                        }
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput rootUrl={rootUrl} chatId={chatId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;