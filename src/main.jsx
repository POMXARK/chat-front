// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import ChatBox from "./components/ChatBox.jsx";
//
// const rootUrl = "http://127.0.0.1:8000";
//
//
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/*<App />*/}
//       <ChatBox rootUrl={rootUrl} />
//   </React.StrictMode>,
// )

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './laravel-breeze.css';
import Login from "./components/Login.jsx";
import App from "./components/App.jsx";


// import reportWebVitals from "../laravel-breeze-react/src/reportWebVitals.js";

const root = createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// reportWebVitals();