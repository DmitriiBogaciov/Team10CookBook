import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Home from "./bricks/Home";
import Recipes from "./bricks/Recipes";
import CategoryRecipes from "./bricks/CategoryRecipes";
import RecipePage from "./bricks/RecipePage";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/category/:categoryId" element={<CategoryRecipes />} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

