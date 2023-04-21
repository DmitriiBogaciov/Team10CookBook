import Icon from "@mdi/react";
import {Form, Modal, Button} from 'react-bootstrap';
import { mdiPlus } from "@mdi/js";
import React, { useState, useEffect, useMemo } from 'react'


function CreateRecipeForm() {
    const [isModalShown, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([
        { id: '', amount: '', unit: '' }
    ]);
    const [ingredientList, setIngredientList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    useEffect(() => {
        fetch("/ingredient/list")
            .then((response) => response.json())
            .then((ingredients) => setIngredientList(ingredients))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch("/category/list")
            .then((response) => response.json())
            .then((categories) => setCategoryList(categories))
            .catch((error) => console.error(error));
    }, []);

    const ingredientOptions = useMemo(() => {
        return ingredientList.map((ingredient) => ingredient);
    }, [ingredientList]);

    const categoryOptions = useMemo(() => {
        return categoryList.map((category) => category);
    }, [categoryList]);

    interface Ingredient {
        id: string;
        amount: number;
        unit: string;
    }

    const handleRecipeNameChange = (e) => {
        setRecipeName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { id: '', amount: '', unit: '' }]);
    }

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const newIngredients = [...ingredients];
        newIngredients[index][name] = name === 'amount' ? Number(value) : value;
        setIngredients(newIngredients);
    }

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

    const handleCategoryChange = (index, value) => {
        const newCategories = [...categories];
        newCategories[index] = value;
        setCategories(newCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, { id: '' }]);
    };

    const handleRemoveCategory = (index) => {
        const newCategories = [...categories];
        newCategories.splice(index, 1);
        setCategories(newCategories);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Создание объекта с данными формы
        const data = {
            name: recipeName,
            description: description,
            imageId: image.name,
            ingredientList: ingredients,
            categoryIdList: categories
        };

        fetch('/recipe/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) // Преобразование объекта в JSON-строку
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Form onSubmit={handleSubmit}
                      style={{ maxWidth: "600px" }}
                      className="mx-auto">
                <Modal.Header closeButton>
                    <Modal.Title>Create recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe name</Form.Label>
                            <Form.Control
                                type="text"
                                style={{ maxWidth: '70%' }}
                                value={recipeName}
                                onChange={handleRecipeNameChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                size="sm"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingredients:</Form.Label>{" "}
                            {ingredients.map((ingredient: Ingredient, index) => (
                                <Form.Group key={index} className="mb-3">
                                    <div className="d-flex">
                                        <Form.Select
                                            name="id"
                                            value={ingredient.id}
                                            size="sm"
                                            style={{ marginRight: '8px' }}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        >
                                            <option>Choose..</option>
                                            {ingredientOptions.map((ingredient) => (
                                                <option key={ingredient.id} value={ingredient.id}>
                                                    {ingredient.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control
                                            name="amount"
                                            value={Number(ingredient.amount)}
                                            size="sm"
                                            type="number"
                                            placeholder="Amount"
                                            style={{ maxWidth: '100px', marginRight: '8px' }}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        />
                                        <Form.Control
                                            name="unit"
                                            value={ingredient.unit}
                                            size="sm"
                                            type="text"
                                            placeholder="Unit"
                                            style={{ maxWidth: '100px' }}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                        />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemoveIngredient(index)}
                                        >
                                            X
                                        </Button>
                                    </div>
                                </Form.Group>
                            ))}
                            <Button variant="secondary" size="sm" onClick={handleAddIngredient}>Add Ingredient</Button>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categories: </Form.Label>{" "}
                            {categories.map((category, index) => (
                                <Form.Group key={index} className="mb-3">
                                    <div className="d-flex">
                                        <Form.Select
                                            value={category.id}
                                            size="sm"
                                            style={{ maxWidth: '250px' }}
                                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                                        >
                                            <option>Choose..</option>
                                            {categoryOptions.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            style={{ marginLeft: '8px' }}
                                            onClick={() => handleRemoveCategory(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </Form.Group>
                            ))}
                            <Button variant="secondary" size="sm" onClick={handleAddCategory}>Add Category</Button>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Create Recipe</Button>
                </Modal.Footer>
                </Form>
            </Modal>
            <Icon
                path={mdiPlus}
                style={{ color: "black", cursor: "pointer", alignSelf: 'center', marginRight: '8px'}}
                size={1.3}
                onClick={handleShowModal}
            />
        </>
    )
}

export default CreateRecipeForm;