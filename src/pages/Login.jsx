// SignIn.jsx
import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [activeTab, setActiveTab] = useState('phone');

    return (
        <div className="signin-container">
            <h1>Sign In</h1>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'phone' ? 'active' : ''}`}
                    onClick={() => setActiveTab('phone')}
                >
                    Phone number
                </button>
                <button
                    className={`tab ${activeTab === 'email' ? 'active' : ''}`}
                    onClick={() => setActiveTab('email')}
                >
                    Mail/Username
                </button>
            </div>

            {activeTab === 'phone' && (
                <form className="signin-form">
                    <label htmlFor="phone">Phone number</label>
                    <input type="text" id="phone" name="phone" placeholder="PE +51"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password"/>
                    <Link to="/home" className="continue">Continue</Link>
                </form>
            )}

            {activeTab === 'email' && (
                <form className="signin-form">
                    <label htmlFor="email">Mail or Username</label>
                    <input type="text" id="email" name="email" placeholder="Mail or Username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password"/>
                    <Link to="/home" className="continue">Continue</Link>
                </form>
            )}

            <a href="/register" className="forgot-link">You don't have an account yet? Register</a>
        </div>
    );
};

export default SignIn;
