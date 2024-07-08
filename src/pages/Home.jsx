import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Stoklogo from './stoklogo.png';
import profilelogo from './profilelogo.png';

const Home = () => {
    return (
        <div>
            <header>
                <nav>
                    <img src={Stoklogo} alt="stoklogo" className="decoration-line"/>
                    <ul className="nav-links">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>
                    <Link to="/profile/edit" className="profile-link">
                        <img src={profilelogo} alt="Profile" className="profile-logo"/>
                    </Link>
                </nav>
            </header>
            <div className="button-container">
                <Link to="/dashboard" className="nav-button">Dashboard</Link>
                <Link to="/products" className="nav-button">Products</Link>
                <Link to="/sales" className="nav-button">Sales</Link>
            </div>
        </div>
    );
}

export default Home;
