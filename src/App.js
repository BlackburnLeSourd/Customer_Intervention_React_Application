import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom"
import './App.css';
import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/auth.service';
import Login from "./components/Login"
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import Profile from './components/Profile';
// import BoardAdmin from "./components/BoardAdmin"

App = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setCurrentUser(user);
        }
    }, []);
    const logOut = () => {
        AuthService.logout();
    };
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Rocket Elevator
                </Link>
                <div className="navbar-nav- mr-auto">
                    <li className="nav-item">
                        <link to={"/mod"} className="nav-link">
                            Home
                        </link>
                    </li>
                    {showAdminBoard && (
                        <li className="nav-link">
                            <link to={"/admin"} className=" nav-link">
                                Admin
                            </link>
                        </li>
                    )}
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <link to={"/profile"} className="nav-link">
                                {currentUser.email}
                            </link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<BoardUser />} />
                    <Route path="/admin" element={<BoardAdmin />} />
                </Routes>
            </div>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
