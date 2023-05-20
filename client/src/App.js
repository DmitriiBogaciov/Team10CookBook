// App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from './bricks/Home';
import Recipes from './bricks/Recipes';
import CategoryRecipes from "./bricks/CategoryRecipes";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/category/:categoryId" element={<CategoryRecipes />} />
                </Routes>
            </div>
        </Router>

    );
}

export default App;
