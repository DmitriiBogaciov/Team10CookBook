import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

function Navigation() {
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        // Выполните запрос к серверу для получения списка категорий
        fetch('http://localhost:3000/category/list')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    function handleSearchSubmit(event) {
        event.preventDefault();
        // Обработка поиска
        console.log('Search:', searchValue);
        setSearchValue("");
    }

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
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        value={searchValue}
                        onChange={event => setSearchValue(event.target.value)}
                    />
                    <Button variant="outline-light" type="submit">
                        <Icon size={1} path={mdiMagnify} />
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
