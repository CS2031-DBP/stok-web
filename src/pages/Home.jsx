import React from 'react'
import './Home.css';
import Stoklogo from './stoklogo.png';

const Home = () => {

    return (
        <div>
            <header>
                <nav>
                    <img src={Stoklogo} alt="stoklogo" className="decoration-line"/>
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>
                </nav>

            </header>
        </div>
    )
}

export default Home;