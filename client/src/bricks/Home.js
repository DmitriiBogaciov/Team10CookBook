import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'

function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <img className="home-bg-image" src={`http://localhost:8000/storage/Images/MainImage.png`} alt="Main Image"/>
                <div className="home-text">
                    <h1 className="home-title">Welcome to Smoothie Station</h1>
                    <h3 className="home-subtitle">We offer delicious and healthy smoothies made from 100% organic ingredients. Try one of our recipes today!</h3>
                </div>
            </div>
            <h3>Popular Recipes</h3>
            <ul>
                <li><Link to="/recipe/1">Strawberry Banana Smoothie</Link></li>
                <li><Link to="/recipe/2">Blueberry Blast Smoothie</Link></li>
                <li><Link to="/recipe/3">Green Detox Smoothie</Link></li>
            </ul>
        </div>
    );
}

export default Home;