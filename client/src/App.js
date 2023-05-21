// App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./bricks/Navigation";
import {Outlet} from "react-router-dom";
import { Helmet } from 'react-helmet';

function App() {
    return (
        <div className="App">
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <Navigation />
            <Outlet />
        </div>
    );
}

export default App;
