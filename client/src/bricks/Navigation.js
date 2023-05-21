import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Typeahead } from "react-bootstrap-typeahead";
import CreateRecipeForm from "./CreateRecipeForm";

function Navigation() {
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [searchStarted, setSearchStarted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (searchStarted) {
            fetch("http://localhost:3000/recipe/list").then(async (response) => {
                const responseJson = await response.json();
                if (response.status >= 400) {
                    console.error(responseJson);
                } else {
                    setRecipes(responseJson);
                }
            });
        }
    }, [searchStarted]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchValue) {
            const selectedRecipe = searchValue[0];
            navigate(`/recipe/${selectedRecipe.id}`);
        } else {
            console.error(`Recipe with name "${searchValue}" not found`);
        }
    };

    const handleSearchInputChange = (input) => {
        setSearchStarted(true);
        setSearchValue(input);
    };

    useEffect(() => {
        fetch('http://localhost:3000/category/list')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Navbar.Brand as={Link} to="/" className="ml-auto mr-3" style={{ marginLeft: '7px' }}>Smoothie Station</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" exact>Home</Nav.Link>
                    <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Categories" id="nav-dropdown">
                        {categories.map(category => (
                            <NavDropdown.Item key={category.id} as={Link} to={`/category/${category.id}`}>
                                {category.name}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Nav>
                <CreateRecipeForm/>
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                    <Typeahead
                        id="recipe-search"
                        labelKey="name"
                        options={recipes}
                        placeholder="Search recipe"
                        onChange={setSearchValue}
                        searchText={searchValue}
                        onInputChange={handleSearchInputChange}
                    />
                    <Button
                        type="submit"
                        variant="outline-success"
                        className="ms-lg-1"
                        disabled={!searchValue || searchValue.length === 0}
                    >
                        Search
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
