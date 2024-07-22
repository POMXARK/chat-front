import AppLayout from "./Layouts/AppLayout.jsx";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Invite from "./Invite.jsx";

const Dashboard = () => {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

    const [chats, setChats] = useState([]);

    const getChats = async () => {
        try {
            const m = await axios.get(import.meta.env.VITE_APP_BACKEND_URL_API + '/chats', {headers})
                .catch(error => {
                console.log(error.response);
            });
            setChats(m.data.data);
            console.log('chats', m.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getChats();
    }, []);

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <br/>
            {/**/}
            <div className="row">
                    <Invite/>
                <div className="col-md-8">

                    <div className="card">
                        <div className="card-header">Chats Box</div>
                        <div className="card-body"
                             style={{height: "70vh", overflowY: "auto"}}>
                            {
                                chats?.map((chat) => {
                                    console.log('chat', chat)
                                    return (
                                        <div className="card-body"
                                             style={{overflowY: "auto"}}>
                                            <p><NavLink to={`/chats/${chat.id}`} key={chat.id}>Chat {chat.id}</NavLink>
                                            </p>
                                            <span ref={scroll}></span>
                                        </div>
                                    )
                                })
                            }
                            <span ref={scroll}></span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
