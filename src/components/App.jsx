import 'laravel-breeze-react-src/App.css';
import { Routes, Route } from 'react-router-dom';
import Register from 'pages/register';
import ForgotPassword from 'pages/forgot-password';
import PasswordReset from 'pages/password-reset';
import NotFoundPage from 'pages/404';
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
