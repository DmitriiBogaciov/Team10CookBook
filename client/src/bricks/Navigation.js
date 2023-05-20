import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function Navigation() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Выполните запрос к серверу для получения списка категорий
        fetch('http://localhost:3000/category/list')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="md">
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
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;

