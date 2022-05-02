import { Routes, Route, Link, } from "react-router-dom"
import './App.css';
import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/auth.service';
import Login from "./components/Login"
// import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import Profile from './components/Profile';


const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
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
                    ROCKET ELEVATOR
                </Link>
                {/* <div className="navbar-nav- mr-auto">
                    <li className="nav-item">
                        <Link to={"/mod"} className="nav-link">
                            Home
                        </Link>
                    </li>
                </div> */}
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.email}
                            </Link>
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
                    {/* <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<BoardUser />} />
                </Routes>
            </div>
        </div>
    );
};


export default App;
