import Icon from "@mdi/react";
import {Form, Modal, Button} from 'react-bootstrap';
import { mdiPlus } from "@mdi/js";
import React, { useState } from 'react'
import IngredientList from "./IngredientList";
import CategoryList from "./CategoryList";

function CreateRecipeForm() {
    const [isModalShown, setShow] = useState(false);
    const [categories, setCategories] = useState(['']);
    const [ingredients, setIngredients] = useState([
        { name: '', amount: '', unit: '' } // добавляем один ингредиент в массив по умолчанию
    ]);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    interface Ingredient {
        name: string;
        amount: number;
        unit: string;
    }

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    }

    const handleIngredientChange = (index, key, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][key] = value;
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
        setCategories([...categories, '']);
    };

    const handleRemoveCategory = (index) => {
        const newCategories = [...categories];
        newCategories.splice(index, 1);
        setCategories(newCategories);
    };

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe name</Form.Label>
                            <Form.Control type="text" style={{maxWidth: '70%'}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" size="sm"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingredients:</Form.Label>{" "}
                            {ingredients.map((ingredient: Ingredient, index) => (
                                <Form.Group key={index} className="mb-3">
                                    <div className="d-flex">
                                        <Form.Select
                                            value={ingredient.name}
                                            size="sm"
                                            style={{marginRight: '8px' }}
                                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        >
                                            <IngredientList/>
                                        </Form.Select>
                                        <Form.Control
                                            value={ingredient.amount}
                                            size="sm"
                                            type="number"
                                            placeholder="Amount"
                                            style={{ maxWidth: '100px', marginRight: '8px' }}
                                            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                        />
                                        <Form.Control
                                            value={ingredient.unit}
                                            size="sm"
                                            type="text"
                                            placeholder="Unit"
                                            style={{ maxWidth: '100px' }}
                                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                        />
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveIngredient(index)}>X</Button>
                                    </div>
                                </Form.Group>
                            ))}
                            <Button variant="secondary" size="sm" onClick={handleAddIngredient}>Add Ingredient</Button>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categories: </Form.Label>{" "}
                            <Form.Group key={0} className="mb-3">
                                <div className="d-flex">
                                    <Form.Select
                                        value={categories[0].name}
                                        size="sm"
                                        style={{ maxWidth: '250px' }}
                                        onChange={(e) => handleCategoryChange(0, e.target.value)}
                                    >
                                        <CategoryList/>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            {categories.slice(1).map((category, index) => (
                                <Form.Group key={index + 1} className="mb-3">
                                    <div className="d-flex">
                                        <Form.Select
                                            value={category.name}
                                            size="sm"
                                            style={{ maxWidth: '250px' }}
                                            onChange={(e) => handleCategoryChange(index + 1, e.target.value)}
                                        >
                                            <CategoryList/>
                                        </Form.Select>
                                        <Button variant="danger" size="sm" style={{ marginLeft: '8px' }} onClick={() => handleRemoveCategory(index + 1)}>Remove</Button>
                                    </div>
                                </Form.Group>
                            ))}
                            <Button variant="secondary" size="sm" onClick={handleAddCategory}>Add Category</Button>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>Create Recipe</Button>
                </Modal.Footer>
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