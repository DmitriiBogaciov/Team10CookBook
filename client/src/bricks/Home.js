import React, {useEffect, useState} from 'react';
import '../css/home.css'
import RecipeGridList from "./RecipeGridList";

function Home() {
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: 'pending',
    });

    useEffect(() => {
        fetch('/recipe/list', {
            method: 'GET',
        })
            .then(async (response) => {
                const responseJson = await response.json();
                if (response.status >= 400) {
                    setRecipeLoadCall({ state: 'error', error: responseJson });
                } else {
                    setRecipeLoadCall({ state: 'success', data: responseJson });
                }
            })
            .catch((error) => {
                setRecipeLoadCall({ state: 'error', error: error.message });
            });
    }, []);
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
                {recipeLoadCall.state === 'success' && <RecipeGridList recipeList={recipeLoadCall.data} />}
            </ul>
        </div>
    );
}

export default Home;