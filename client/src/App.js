// App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./bricks/Navigation";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Navigation />
            <Outlet />
        </div>
    );
}

export default App;
